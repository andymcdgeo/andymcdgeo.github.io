---
title: "Adding Inset Axes to Matplotlib Figures"
date: 2023-11-03
tags: ["visualisation", "qc", "well logs"]
heroImage: "adding-inset-images.jpg"
heroImageAlt: "Portrait of Andy McDonald"
description: "A quick visual QC workflow using crossplots to surface tool issues and depth shifts."
slug: "adding-inset-axes-to-matplotlib-figures"
---
When creating figures in matplotlib, there may be occasions where you want to add a smaller figure or axes inside of your main figure. This could be for a number of reasons, but most commonly, it is used to highlight an area of interest and enlarge it or to include additional information that is related to the main figure.

Matplotlib makes this process very simple by allowing us to add inset axes within the main figure. This can then be further tweaked to get the information we want displayed how we want.

In this short tutorial, we will see how to create a simple well location map, like the one below, using grid coordinates. We will then add inset axes to highlight and enlarge a smaller area of the main map.

![The final matplotlib figure containing the inset_axes highlights a smaller selection of wells. Image by the author.](./images/1_blGXzEnAiekmYlQ2XL2aKQ.webp "The final matplotlib figure containing the inset_axes highlights a smaller selection of wells. Image by the author.")<br/>*The final matplotlib figure containing the inset\_axes highlights a smaller selection of wells. Image by the author.*

## Importing Libraries and Loading Data

The first step in our tutorial is to import the libraries we are going to be using.

The first two import statements should be familiar: importing **[pandas](https://pandas.pydata.org/)** and **[matplotib](https://matplotlib.org/stable/)**. The third import from [`mpl.toolkits.axes_grid1.inset_locator`](https://matplotlib.org/stable/api/_as_gen/mpl_toolkits.axes_grid1.inset_locator.html) allows us to plot our inset figure within the bounds of our main figure.

```python
import pandas as pd
import matplotlib.pyplot as plt
from mpl_toolkits.axes_grid1.inset_locator import inset_axes, mark_inset
```

Once the libraries have been imported, we can import the data. The data used here is from the Force 2020 Xeek Machine Learning competition and contains around 100 wells worth of well logging measurements.

As this file is delimited by a semi-colon ( `;` ) we need to include an extra parameter to tell the `pd.read_csv()` function that is what the separator is between the values.

```python
df = pd.read_csv('../data/Xeek Force 2020/train.csv', sep=';')
```

## Creating a Well Location Map Using X and Y Co-ordinates in Matplotlib

Now that the data has been loaded, we can create our first figure.

This figure will contain the X and Y location information from the CSV file and will show us the positions of the wells that are included within the dataset.

These locations are grid coordinates rather than latitude and longitude.

First, we create the figure and set the size to 12 x 12.

```python
fig, ax = plt.subplots(figsize=(12, 12))
```

Then, we create the scatter plot and pass it in the `X_LOC` and `Y_LOC` columns. To make the data points sit in front of the grid, we need to set the `zorder` to 1

```python
ax.scatter(df['X_LOC'], df['Y_LOC'], c='deepskyblue', 
                     edgecolors='black', zorder=1, s=100, marker='o')
```

Next, we set the x and y axes by defining the labels and limits.

```python
ax.set_xlabel('X-Location (m)', fontsize=22, labelpad=20)
ax.set_ylabel('Y-Location (m)', fontsize=22, labelpad=20)

ax.set_xlim(420000, 570000)
ax.set_ylim(6400000, 6900000)
```

In cases where we have very large numbers, matplotlib will switch to scientific notation. If we want to avoid this, we can use the following line:

```python
ax.ticklabel_format(style='plain')
```

Finally, we will make the grid appear and then set the `zorder` to 0, which will then place the grid at the lowest layer.

```python
ax.grid(zorder=0)
```

Our final code should look similar to the following:

```python
fig, ax = plt.subplots(figsize=(12, 12))

ax.scatter(df['X_LOC'], df['Y_LOC'], c='deepskyblue', 
                     edgecolors='black', zorder=1, s=100, marker='o')

ax.ticklabel_format(style='plain')

ax.set_xlabel('X-Location (m)', fontsize=22, labelpad=20)
ax.set_ylabel('Y-Location (m)', fontsize=22, labelpad=20)

ax.set_xlim(420000, 570000)
ax.set_ylim(6400000, 6900000)

ax.grid(zorder=0)

plt.show()
```

When we call upon `plt.show()`, we get back the following plot.

![Main matplotlib scatter plot showing the locations of wells on the Norwegian Continental Shelf. Image by the author.](./images/1_938KVQJ3_AkGGc1ZbciJ3g.webp "Main matplotlib scatter plot showing the locations of wells on the Norwegian Continental Shelf. Image by the author.")<br/>*Main matplotlib scatter plot showing the locations of wells on the Norwegian Continental Shelf. Image by the author.*

## Adding an Inset Figure to Matplotlib

Once we have the main figure set up, we need to set up the inset figure. This code essentially follows from the previous section.

First, we declare a new variable called `ax_inset` and assign it to the `inset_axes` method we imported earlier. This will allow us to create a new inset axes in the lower right corner of the existing axes `ax`.

The inset axes will be set to 30% of the width and height of `ax`. The `loc` parameter controls the position of the inset axes and places it in the lower right edge of the parent axes.

Finally, the calls to `bbox_transform` and `bbox_to_anchor` will specify the coordinate reference system for the bounding box (`bbox`) to anchor to.

```python
ax_inset = inset_axes(ax, width="30%", height="30%", loc='lower right',
                      bbox_to_anchor=(0, 0.05, 0.95, 1),
                      bbox_transform=ax.transAxes)
```

Once the inset axes have been defined, we can set parameters like a normal axes object in matplotlib. Here we set it to display the same data as the main figure, but as we are zooming in to a smaller section of it, we need to adjust the `xlim` and `ylim` parameters.

```python
ax_inset.scatter(df['X_LOC'], df['Y_LOC'], c='deepskyblue', 
                     edgecolors='black', zorder=2, s=50, marker='o')

ax_inset.set_xlim(472000, 480000)
ax_inset.set_ylim(6508000, 6528000)
```

To avoid any issues with scientific notation on the axes, we can set the tick label style to plain.

```python
ax_inset.ticklabel_format(style='plain')
```

![Matplotlib figure after adding an inset axes. Image by the author.](./images/1_LqOup4L7nJYFnkQCmXCa7Q.webp "Matplotlib figure after adding an inset axes. Image by the author.")<br/>*Matplotlib figure after adding an inset axes. Image by the author.*

### Reducing X and Y Axis Label Spacing of Inset Axes

If we leave the inset axes as is, we could end up with a large number of tick labels on our plot. To resolve this, we can use the following code to divide the figure up into three evenly spaced intervals and then place the tick mark and label.

```scss
ax_inset.xaxis.set_major_locator(plt.MaxNLocator(nbins=3))
ax_inset.yaxis.set_major_locator(plt.MaxNLocator(nbins=3))

ax_inset.grid()
```

![Matplotlib figure after adding an inset axes and fixing the labels to three on each axes. Image by the author.](./images/1_Uj7UgOJVb8micHRJlxhYJQ.webp "Matplotlib figure after adding an inset axes and fixing the labels to three on each axes. Image by the author.")<br/>*Matplotlib figure after adding an inset axes and fixing the labels to three on each axes. Image by the author.*

### Marking the Inset Axes and Tying it Back to the Main Axes

Finally, to highlight how our inset figure relates to the main figure, we can call upon `mark_inset` and pass in the two axes objects, first the parent axes object( `ax` ) followed by the inset axes object (`ax_inset` ).

We then need to specify the locations of the connecting lines that mark the inset. In this case, we are using locations 2 (upper left corner) and 3 (lower left corner). The colour ( `ec`) of the connecting lines can also be set here if needed.

If we want, we can add some colour to the main axes object to fill in the area that the inset covers. In this example, I have set it to fill the area in red.

```python
mark_inset(ax, ax_inset, loc1=2, loc2=3, fc='red', ec='0.5')
```

When we display our map, we should have something similar to the image below.

![The final matplotlib figure containing the inset_axes highlights a smaller selection of wells. Image by the author.](./images/1_blGXzEnAiekmYlQ2XL2aKQ.webp "The final matplotlib figure containing the inset_axes highlights a smaller selection of wells. Image by the author.")<br/>*The final matplotlib figure containing the inset\_axes highlights a smaller selection of wells. Image by the author.*

Here is the final code to generate the above figure.

```python
fig, ax = plt.subplots(figsize=(12, 12))

# Main Scatter Plot
ax.scatter(df['X_LOC'], df['Y_LOC'], c='deepskyblue', 
                     edgecolors='black', zorder=2, s=100, marker='o')

ax.ticklabel_format(style='plain')

ax.set_xlabel('X-Location (m)', fontsize=22, labelpad=20)
ax.set_ylabel('Y-Location (m)', fontsize=22, labelpad=20)

ax.set_xlim(420000, 570000)
ax.set_ylim(6400000, 6900000)

ax.grid(zorder=0)

ax_inset = inset_axes(ax, width="30%", height="30%", loc='lower right',
                      bbox_to_anchor=(0, 0.05, 0.95, 1),
                      bbox_transform=ax.transAxes)

ax_inset.scatter(df['X_LOC'], df['Y_LOC'], c='deepskyblue', 
                     edgecolors='black', zorder=2, s=50, marker='o')

ax_inset.set_xlim(472000, 480000)
ax_inset.set_ylim(6508000, 6528000)

ax_inset.ticklabel_format(style='plain')
ax_inset.xaxis.set_major_locator(plt.MaxNLocator(nbins=3))
ax_inset.yaxis.set_major_locator(plt.MaxNLocator(nbins=3))

ax_inset.grid()

mark_inset(ax, ax_inset, loc1=2, loc2=3, fc='red', ec='0.5')

plt.show()
```

## Summary

Within this short tutorial, we have seen how we can easily add inset axes to our main matplotlib figure to highlight a smaller area of a well location map. This not only highlights important areas to the reader, but it can also make the plot more aesthetically pleasing to look at.

## Dataset Used Within this Tutorial

Training dataset used as part of a Machine Learning competition run by Xeek and FORCE 2020 _(Bormann et al., 2020)_. This dataset is licensed under Creative Commons Attribution 4.0 International.

The full dataset can be accessed at the following link: [https://doi.org/10.5281/zenodo.4351155](https://doi.org/10.5281/zenodo.4351155).
