---
title: "How to Open DLIS Files in Python with DLISIO"
date: 2025-10-02
tags: ["dlis", "well logs"]
heroImage: "./dlisio-python-image.jpg"
heroImageAlt: "DLIS log preview"
description: "Introduction to Exploring DLIS Files With Python"
slug: "dlis-python-dlisio"
---

Well log and petrophysical data come in several data formats. In many of my articles I have shared, we have mainly worked with CSV and LAS files. These formats are simple and easy to work with due to their flat structure. However, these files work well for simple logs, but not for array data. In LAS and CSV files, arrays get split into multiple columns rather than stored as a single block. DLIS files were designed to handle this complexity.

## What is DLIS?

The Digital Log Interchange Standard (DLIS) is a structured binary format for storing well information and log data. It was developed by Schlumberger in the late 1980s and later published by the American Petroleum Institute in 1991 to provide a standardised format.

Working with DLIS can be awkward. The standard is decades old, and different vendors often add their own twists with extra data structures or object types.

A DLIS file typically holds large amounts of well metadata along with the actual log data. The data itself lives inside Frames, these are table-like objects representing passes, runs, or processing stages (e.g. Raw or Interpreted). Each frame has columns called channels, which are the individual logging curves. Channels can be single- or multi-dimensional, depending on the tool and measurement.

## Installing DLISIO

DLISIO is a python library that has been developed by Equinor ASA to read DLIS files and Log Information Standard79 (LIS79) files. Details of the library can be found [here](https://dlisio.readthedocs.io/en/stable/index.html).

The library can be installed by using the following command:

```typescript
pip install dlisio
```

## Opening a DLIS File

Like most binary formats, you can't just open a DLIS file in a text editor and scroll through the contents like we can with las and csv files. DLISIO handles the decoding of the binary file for you.

The first step when working with DLISIO is to load the file and check what's inside.

```javascript
from dlisio import dlis
with dlis.load("NLOG_LIS_LAS_7857_FMS_DSI_MAIN_LOG.DLIS") as (logical_files, *tail):
    print(logical_files)
    print(logical_files.describe())
```

A DLIS file can very often contain one or more logical files. So it is always good practice to check to see what is within them.

## Exploring frames

Each logical file is organised into frames. You can think of a frame as a table that stores log data from a particular pass, run, or processing stage. For example, you might have one frame for the raw field data and another for an interpreted or processed version of the same run.

Let's take the first logical file and look at its frames:

```python
with dlis.load("NLOG_LIS_LAS_7857_FMS_DSI_MAIN_LOG.DLIS") as (logical_files, *tail):
    for frame in logical_files.frames:
        print(frame.describe())
```

This will list all the frames available. A file might only have one frame, but it's common to see several like in the example below. Understanding which frame you need is an important first step before pulling out data.

By using the _describe()_ method on the frame we are able to see all of the contents like below.

```markdown
-----
Frame
-----
name   : 60B
origin : 41
copy   : 0
Channel indexing
--
Indexed by       : BOREHOLE-DEPTH
Index units      : 0.1 in
Index min        : 0 [0.1 in]
Index max        : 0 [0.1 in]
Direction        : DECREASING
Constant spacing : -60 [0.1 in]
Index channel    : Channel(TDEP)
Channels
--
TDEP      BS        CS        TENS      ETIM      DEVI      P1AZ_MEST ANOR
FINC      HAZI      P1AZ      RB        SDEV      GAT       GMT       ECGR
ITT       SPHI      DCI2      DCI4      SOBS      DTCO      DTSM      PR
VPVS      CHR2      DT2R      DTRP      CHRP      DTRS      CHRS      DTTP
CHTP      DTTS      CHTS      DT2       DT4P      DT4S      SPCF      DPTR
DPAZ      QUAF      DDIP      DDA       FCD       HDAR      RGR       TIME
CVEL      MSW1      MSW2      FNOR      SAS2      SAS4      PWF2      PWN2
PWF4      PWN4      SVEL      SSVE      SPR2      SPR4      SPT4      DF
CDF       CLOS      ED        ND        TVDE      VSEC      CWEL      AREA
AFCD      ABS       IHV       ICV       GR
-----
Frame
-----
name   : 10B
origin : 41
copy   : 0
Channel indexing
--
Indexed by       : BOREHOLE-DEPTH
Index units      : 0.1 in
Index min        : 0 [0.1 in]
Index max        : 0 [0.1 in]
Direction        : DECREASING
Constant spacing : -10 [0.1 in]
Index channel    : Channel(TDEP)
Channels
--
TDEP IDWD TIME SCD
-----
Frame
-----
name   : 1B
origin : 41
copy   : 0
Channel indexing
--
Indexed by       : BOREHOLE-DEPTH
Index units      : 0.1 in
Index min        : 0 [0.1 in]
Index max        : 0 [0.1 in]
Direction        : DECREASING
Constant spacing : -1 [0.1 in]
Index channel    : Channel(TDEP)
Channels
--
TDEP  TIME  EV    BA28  BA17  BB17  BC13  BD13  BB28  BA13  BB13  BC17  BD17
BA22  BA23  BA24  BC28  BA25  BA26  BA27  BA11  BA12  BA14  BA15  BA16  BA18
BA21  BC11  BC12  BC14  BC15  BC16  BC18  BC21  BC22  BC23  BC24  BC25  BC26
BC27  BB22  BB23  BB24  BD28  BB25  BB26  BB27  BB11  BB12  BB14  BB15  BB16
BB18  BB21  BD11  BD12  BD14  BD15  BD16  BD18  BD21  BD22  BD23  BD24  BD25
BD26  BD27  SB1   DB1   DB2   DB3A  DB4A  SB2   DB1A  DB2A  DB3   DB4   FCAX
FCAY  FCAZ  FTIM  AZSNG AZS1G AZS2G
-----
Frame
-----
name   : 15B
origin : 41
copy   : 0
Channel indexing
--
Indexed by       : BOREHOLE-DEPTH
Index units      : 0.1 in
Index min        : 0 [0.1 in]
Index max        : 0 [0.1 in]
Direction        : DECREASING
Constant spacing : -15 [0.1 in]
Index channel    : Channel(TDEP)
Channels
--
TDEP   TIME   C1     C2     U-MBAV AX     AY     AZ     EI     FX     FY     FZ
```

## Inspecting channels

Within each frame you'll find the actual channels — the individual logging curves such as GR, RHOB, NPHI, and so on. Each channel is stored as a column in the frame's table, with values indexed by depth or time.

Here's how to list them:

```scss
with dlis.load("NLOG_LIS_LAS_7857_FMS_DSI_MAIN_LOG.DLIS") as (logical_files, *tail):
    for frame in logical_files.frames:
        for channel in frame.channels:
            print(channel.describe())
```

This will give you the names of the channels and their measurement units. Just seeing this list is useful: it tells you what curves are available before you start extracting values. It's also a quick way to check if the file contains the curves you expect.

The output from the above can be quite lengthy, especially if you have several frames. The example below is an overview of what cam ne obtained using the above:

```markdown
-------
Channel
-------
name   : BC12
origin : 41
copy   : 0
Description : CALIBRATED DATA BUTTON C12
Sample dimensions         : 1
Maximum sample dimensions : 1
Property indicators       : 440-CUSTOMER
Source                    : Tool(MESTB)

-------
Channel
-------
name   : BC14
origin : 41
copy   : 0
Description : CALIBRATED DATA BUTTON C14
Sample dimensions         : 1
Maximum sample dimensions : 1
Property indicators       : 440-CUSTOMER
Source                    : Tool(MESTB)
```

## Summary

In this article we have opened a DLIS file and looked inside to check for logical files, explored the frames, and listed the channels contained in those frames.

In summary:

-   **Logical files:** the top-level containers.
-   **Frames:** table-like objects, often one per run or processing stage.
-   **Channels:** the individual log curves inside each frame.

In the next article we'll go a step further and load the actual channel data into a pandas DataFrame, with units and metadata carried along. That's where the DLIS format really pays off, giving you tidy arrays ready for analysis or plotting.
