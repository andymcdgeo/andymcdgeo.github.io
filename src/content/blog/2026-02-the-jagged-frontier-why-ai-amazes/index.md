---
title: "The Jagged Frontier: Why AI Amazes and Frustrates in Equal Measure"
date: 2026-02-12
tags: ["AI", "generative AI", "machine learning"]
description: "Understanding where AI excels and where it falls apart is the skill that actually matters"
slug: "the-jagged-frontier-why-ai-amazes"
---

*This article was originally published on [Substack](https://andymcdonaldgeo.substack.com/p/the-jagged-frontier-why-ai-amazes).*

If you've spent any real time working with Generative AI, you'll know the feeling. One moment you're genuinely impressed by its ability to analyse a complex dataset, drawn connections you hadn't considered, or drafted something that would have taken you an hour in about ten seconds. The next moment, you ask it something seemingly simple and it falls apart completely.

I've experienced this firsthand where I've watched an LLM analyse a drilling report and perfectly summarise the operations, capturing nuances in tone that even keyword searches would miss.

But the next moment, I've asked it to compare the depths of two wells based on their tops, and it falls apart. It might confidently tell you that 'Well A encountered the reservoir deeper than Well B,' while citing numbers that show the exact opposite. The paragraph it generates is grammatically perfect and sounds like an expert geologist wrote it, but the simple arithmetic logic underlying it is completely hallucinated.

This isn't a bug. It's a feature of how these systems are built. And understanding it's the difference between getting real value from AI and dismissing it as overhyped.

## The Jagged Frontier

Ethan Mollick, a professor at Wharton, coined the term "**the jagged frontier**" to describe this unevenness. The idea is straightforward: AI's capabilities don't advance in a smooth, predictable line. Instead, they're jagged. They are spectacularly capable in some areas, surprisingly weak in others.

Advanced LLMs can pass medical licensing exams, write functioning code, and reason through multi-step legal arguments. But ask one how many r's are in "strawberry" and there's a decent chance it gets it wrong.

This feels like a contradiction, but it makes sense once you understand what LLMs actually are.

They are, at their core, connection machines. They work by predicting the most likely next token in a sequence, drawing on patterns learned from vast amounts of text. They are extraordinarily good at recognising relationships, drawing analogies, synthesising information, and generating fluent language. These are tasks that lean on the kind of pattern recognition and contextual understanding that LLMs are architecturally designed for.

But counting? That's a fundamentally different kind of operation. When you count the letters in "strawberry," you're not pattern-matching, you're running a sequential, rule-based process. You're iterating through each character, checking a condition, and incrementing a counter. That's what a simple script does. It's not what a language model does.

The same applies to chess. We've had machines that can beat grandmasters since the late 1990s, but those systems work through brute-force search and evaluation where they explore millions of possible board states. An LLM trying to play chess is doing something entirely different: trying to predict what moves would appear next in text about chess games. Sometimes that produces reasonable play. Often it doesn't.

The point is this: LLMs weren't built to solve every type of problem. They were built to solve a particular kind of problem, and they solve it remarkably well. We already have perfectly good solutions for counting, searching databases, and playing chess. The mistake is expecting a connection machine to behave like a calculator or a database engine.

## The Bottlenecks That Shape What AI Can Actually Do

Understanding the jagged frontier tells you where AI is strong and where it's weak right now. But, there is a second layer to this: even in areas where AI is capable, real-world deployment often hits bottlenecks that limit what it can actually deliver.

These bottlenecks generally fall into three categories.

**Capability bottlenecks** are the most obvious. The model simply can't do the task well enough yet. Early image generation is a good example where we saw hands with extra fingers, text that looked like it was written by someone having a stroke. The AI could generate images, but not at a quality level that was useful for most professional applications. These bottlenecks tend to get solved through sheer engineering effort. Image generation has improved dramatically, and what was laughably bad two years ago is now good enough to displace stock photography for many use cases.

Another great example is the viral AI video of Will Smith eating spaghetti. Two years ago, it was a flickering, distinctively nightmarish distortion that no professional could use. Today, the latest models generate video so physically consistent and realistic that it is becoming difficult to distinguish from actual footage.

**Process bottlenecks** are more subtle. These occur when AI can perform a task in isolation, but the surrounding workflow isn't designed to accommodate it. In subsurface work, I've seen this play out with AI-generated well log interpretations. The model might produce a reasonable interpretation, but if the existing workflow requires that interpretation to be loaded into a specific software format, reviewed against offset wells, and signed off through a particular approval chain, the AI output has to slot into a process that was designed for human-generated work. The AI capability exists, but the process around it creates friction that limits the value.

**Verification bottlenecks** are, in my view, the most important and the least discussed. These occur when AI can produce an output, but humans can't efficiently verify whether that output is correct.

For example in the context of automation complacency. When AI generates a facies prediction or identifies shale intervals from log data, someone needs to check that work. In theory, that's a human expert reviewing the AI's output. In practice, what often happens is that review degrades over time. The AI is right often enough that people start rubber-stamping its outputs. The review shifts from meaningful verification "Is this correct?", to superficial approval "This looks about right."

Automation fatigue can lead to superficial approval when models are believed to always be correct.

The distinction matters enormously because it determines whether you have genuine human oversight or just the appearance of it. And this is where the jagged frontier becomes genuinely risky. If the AI is operating in an area where it's strong, the rubber-stamping might be fine, the AI rarely makes mistakes, so the lack of deep review doesn't hurt you. But remember, the frontier is jagged. The AI might be excellent at identifying clean sandstone intervals and consistently poor at recognising thin interbedded sequences. If the human reviewer has become complacent, they're unlikely to catch the failures that cluster on the weak side of the frontier.

## What Happens When Bottlenecks Break

The interesting thing about bottlenecks is that they don't persist forever. When a bottleneck becomes visible enough or commercially important enough, resources flow toward solving it.

Mollick uses image generation as a case study. The capability bottleneck of image quality has largely been solved. The process bottlenecks are being addressed through better integration with design tools and workflows. And the verification bottleneck is relatively low for images because humans are naturally good at looking at a picture and saying "that looks right" or "that looks wrong."

But not all domains are like image generation. In technical and scientific fields, verification is hard. Checking whether an AI-generated geological interpretation is correct requires domain expertise and often access to additional data. You can't just glance at it. This means that even as capability bottlenecks fall away, the verification bottleneck may become the binding constraint, the thing that determines how far and how fast AI can be deployed in these domains.

This has real implications for how we build AI products. There's a **significant difference between AI that suggests and AI that acts**. A system that presents a draft interpretation for an expert to review is operating in a fundamentally different risk category than a system that automatically updates a geological model. Both might use the same underlying AI capability. The difference is entirely in how the output is handled, and that's a design decision, not a technology decision.

## What This Means For You

If you're using AI in your work, and increasingly, most of us are, the jagged frontier framework gives you a practical way to think about where to deploy it and where to be cautious.

Start by asking: is this task one that plays to the strengths of a connection machine? If you're synthesising information, drafting text, identifying patterns in unstructured data, or exploring possibilities, you're likely on the strong side of the frontier. If you're counting, doing precise calculations, or need guaranteed accuracy on a well-defined rule-based task, you're probably on the weak side, and you'd be better off using a conventional tool or at the very least verifying the output carefully.

Then ask: even if the AI can do this, can I verify the result? If you can't tell whether the output is right, you're exposed, regardless of how capable the AI is on average.

The jagged frontier isn't a reason to avoid AI. It's a reason to use it with your eyes open, understanding where it excels, where it struggles, and where the bottlenecks in your own work actually are.

The people who will get the most from AI aren't the ones who adopt it uncritically or the ones who dismiss it. They're the ones who learn to read the frontier.

---

*This piece was inspired by Ethan Mollick's excellent article on jaggedness and bottlenecks.*
