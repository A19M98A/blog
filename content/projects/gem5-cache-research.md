+++
title = "gem5 cache research"
date = "2023-08-09"
lastmod = "2025-08-29"
summary = "My research fork of the gem5 simulator: experimental cache architectures, from split L2 partitions to temperature-aware replacement."
repo = "https://github.com/A19M98A/gem5"
language = "C++"
status = "research"
stack = ["C++", "gem5", "Python configs", "SPEC CPU 2006"]
tags = ["computer-architecture", "gem5", "cache", "research", "c++"]
featured = true
weight = 2
+++

Most of my graduate research happens inside **[gem5](https://www.gem5.org/)**, the open-source computer-system simulator used across academia to model CPUs, caches and memory. My [fork](https://github.com/A19M98A/gem5) keeps each idea on its own branch, so every experiment can be built, run and compared on its own against the stock simulator.

This page is the map. My [blog series](/tags/exploring-innovation/) tells the longer story.

## Why a simulator?

You can't tape out a new chip to test a hunch about caches. In gem5 you can change how a cache picks its victim, how it indexes sets or how it tracks blocks, then run real benchmarks like SPEC CPU 2006 and measure hit rates, latency and traffic. Nearly all of my changes live in `src/mem/cache/` (the cache, its tags and blocks) plus the Python config files that expose new options on the command line.

## The branches

### FatAndThin (2023–2024)

The biggest change set. The shared L2 is split into **four partitions** (`l2A`–`l2D`), each with its own size and associativity set from the command line. Blocks carry extra state: which half of the block was touched last, separate dirty bits for the left and right halves, and an access history that follows a block as it **migrates** between partitions. This needed careful handling of eviction when a new request overlaps blocks that are already cached, and of restoring a block's original address on write-back to main memory. That's what most of the commits on this branch fix.

### Col_Way (2024)

An experiment in letting sets **share ways**. When one set is under pressure and another is idle, a block can be placed in a "merged" set. The branch tracks which sets were merged and occupied by whom, regenerates the real address of a borrowed block, and adds statistics for merged vs. unmerged set accesses. Replacement policies were extended so they can see the packet when choosing a victim.

### WiSE and TA-LRW (2025)

Both model **block temperature**. Every write heats a block, and a cooling table brings it back towards an 85 °C baseline over time, including the effect of hot *neighbouring* blocks. WiSE implements that model inside the cache, with statistics for the extra delay it introduces. TA-LRW builds a temperature-aware *least-recently-written* replacement policy on top, including swapping and its own eviction handling. Ideas like this matter for emerging memory technologies, where heat affects write reliability and energy.

### ReBECA (2024–2025)

Explores caches with **different block sizes** per level. New options set the block size and turn the mode on separately for L1I, L1D and L2. Each block records the start address and size of the data it really holds, so lookups use both the block address and the original request address, and sub-block offsets are tracked.

### CPS-LAB-stable

The lab's shared baseline. It holds common statistics (like per-set usage) and the temperature model, and the experimental branches are merged into it once they settle.

## Tools that grew out of this

- [SPEC CPU 2006 runner](/projects/spec-cpu-2006/): the scripts I use to run benchmarks on these branches.
- [cache_sim](/projects/cache-sim/): a small Python cache simulator for quick experiments before touching C++.
- [Terminal waveform viewer](/projects/iverilog-waveform-viewer/): for the hardware (Verilog) side of things.

## Status

Ongoing research. Several branches are explicitly marked as "not complete" in their history, which is normal for research code. They're public so the work is reproducible, not because they're polished.
