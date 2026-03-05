---
title: "AI in Petrophysics: When Did Everything Become Artificial Intelligence?"
date: 2026-01-21
tags: ["AI", "petrophysics", "machine learning"]
description: "I've been thinking a lot about how casually we use the word AI at the moment."
slug: "ai-in-petrophysics-when-did-everything"
---

*This article was originally published on [Substack](https://andymcdonaldgeo.substack.com/p/ai-in-petrophysics-when-did-everything).*

I've been thinking a lot about how casually we use the word **AI** at the moment.

In petrophysics it can mean anything from a straightforward regression to a large language model helping write code. None of that is wrong, but when everything gets labelled AI, it becomes harder to talk clearly about what's actually happening under the bonnet.

Open any conference programme today and you would think petrophysics has been taken over by sentient algorithms. Every workflow is "AI-powered", every crossplot "intelligent", every spreadsheet apparently a step toward the singularity.

But most of what we actually do hasn't changed that much. We QC and clean curves, create new features, train and fit models, and sanity-check out results against real world geology. Ten years ago we called it machine learning. Twenty years ago we might have called it multivariate statistics with ambition.

So what do we really mean by AI in our world?

## The AI naming muddle

In recent years there has been a large hype in AI as computing power and algorithms have improved. This has resulted in a large number of things being classified as AI that were previously statistical algorithms.

In practice, a lot of "AI in petrophysics" is:

- regression to predict a missing curve
- classification to estimate facies
- clustering to group similar wells
- optimisation to tune cut-offs

Useful, valuable, but not mystical. These are machine-learning techniques, which are brilliant tools, yet still dependent on the same fundamentals: data quality, representative training sets, and geological common sense.

Calling everything AI isn't wrong in itself, but it can blur what the method is actually doing. A regression model doesn't become smarter because we rename it.

## A simple set of definitions

Before the labels run away with us, here's a practical way to separate them:

**Artificial Intelligence (AI):** the broad umbrella for systems that are capable of carrying out tasks that require human-level intelligence. This includes recognising patterns in data, understanding language, decision-making etc. In petrophysics that might cover anything from a rule-based QC check on logging data to applying Generative Adversarial Network to make predictions of missing or generating synthetic well logs.

**Machine Learning (ML):** the part we mostly use day to day: models that learn relationships from data rather than us writing explicit equations. Instead of creating the rules like we do in programming, we are now relying on the algorithms to create those rules for us to apply on new datasets. Machine learning can in Petrophysics includes curve prediction, facies classification, and clustering all live here.

**Generative AI:** a newer branch that creates language, images, or code rather than just predicting numbers. Helpful for writing reports or scripts, but should not be considered a replacement for subsurface understanding or workflows.

Most of our work (e.g. predictions, regressions, facies classification) sits in the ML layer, guided by geology and measurement physics.

## Then along came generative AI

What is genuinely new is generative AI. Unlike traditional models that map numbers to numbers, these systems generate language, images, even code. They can summarise reports, suggest workflows, and help write the Python code snippets you never quite remember.

Even though the term AI has been around for decades, the first real step to Generative AI came about in 2014 when Generative Adversarial Networks appeared. These models showed that computers could generate new and realistic examples based on data distribution rather than outputting a single prediction. Then in 2017, the transformer architecture arrived, which forms the backbone of today's Large Language Models (LLMs).

However, Generative AI tools don't understand your reservoir. They remix patterns learned from the internet, or from any supplied documentation that is used to fine tune these models. Treat them like a clever graduate, not an oracle.

## AI-assisted, not AI-in-charge

There's a useful middle ground that often gets lost in the noise. Many modern workflows are better described as AI-assisted:

- the model proposes, the petrophysicist disposes
- generative tools help with code and reporting
- humans still decide what makes geological sense

Framed this way, AI becomes an amplifier rather than a replacement. That's a much healthier promise to make to colleagues and customers alike.

## Why the distinction matters

If we blur everything into "AI", we stop asking the right questions:

- Is this model learning geology or just memorising noise?
- Do we understand the features driving the prediction?
- Would a simpler method work just as well?

Petrophysics has always been a balance between physics, experience, and pragmatism. No algorithm, however well branded can change that.

## Summary

AI in petrophysics isn't a single thing. It's a collection of tools, some old, some new, all sitting on top of the same foundations we've relied on for years.

Machine learning can help us see patterns we'd struggle to spot by eye. Generative AI can help us work faster and communicate better. Neither removes the need for good data or good judgement.

Call it AI if you like, but keep an eye on what the model is actually doing, and keep the petrophysicist/geoscientist in the loop!

I'm curious how others explain this to non-specialists. Do you lean into the AI label, or stick with ML and statistics?

Feel free to reply or comment I'm always interested in how this conversation is playing out in different teams.
