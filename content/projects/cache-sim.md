+++
title = "cache_sim"
date = "2023-11-17"
lastmod = "2024-01-10"
summary = "A small, readable set-associative cache simulator in Python, with pluggable replacement policies and prefetchers."
repo = "https://github.com/A19M98A/cache_sim"
language = "Python"
status = "finished"
stack = ["Python 3", "argparse", "Bash"]
tags = ["computer-architecture", "cache", "python"]
weight = 4
+++

Before changing a cache in C++ inside [gem5](/projects/gem5-cache-research/), it helps to try an idea in something you can read in one sitting. **cache_sim** is that: a set-associative cache simulator in about 300 lines of Python, written for a computer architecture course and kept as a scratchpad for experiments.

## What it models

- A cache of any **size**, **block size** and **associativity**. The number of sets and the tag/index bit split are derived from them.
- **Replacement policies:** LRU, NMRU (not-most-recently-used) and Random, each a small class with one `getVictim()` method.
- **Prefetchers:** none, **next-line** (fetch the following block on a miss) and a **stride** prefetcher that tracks the last address and distance per program counter (PC).
- **Statistics:** hits, misses, hit rate, prefetches issued, and how many prefetched blocks were actually used. A prefetched block is only counted as useful the first time a real access hits it.

## Running it

Traces are text files with one `PC address` pair per line, both in hex:

```bash
python3 run.py -c 32 -b 64 -a 8 -r LRU -p next_line -s y -w traces/WebSearch/00-L1d
```

That's a 32 KB, 64-byte-block, 8-way cache with LRU and a next-line prefetcher. `-s y` shows a coloured progress bar. `run.sh` sweeps every prefetcher across eight server workloads (data serving, MapReduce, media streaming, a SAT solver, two TPC-C databases, web front-end and web search), which makes it easy to compare policies side by side.

## What I learned

How much a prefetcher's *accuracy* matters, not just its coverage: a next-line prefetcher helps streaming workloads but pollutes the cache on pointer-chasing ones. Keeping policies and prefetchers as swappable classes made those comparisons a one-flag change.

## Status

Finished as a course and learning project. A known rough edge: the NMRU victim picker currently finds the *least* recently used block where it means the most recent one, so its results should be taken with a grain of salt until that comparison is flipped.
