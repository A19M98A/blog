+++
title = "SPEC CPU 2006 runner"
date = "2023-07-12"
lastmod = "2023-09-03"
summary = "Shell scripts that run the SPEC CPU 2006 benchmark suite on gem5, single-core and multi-core, with logs and a live timer."
repo = "https://github.com/A19M98A/SPEC_CPU_2006"
language = "Shell"
status = "finished"
stack = ["Bash", "gem5", "SPEC CPU 2006", "ARM"]
tags = ["computer-architecture", "gem5", "benchmarking", "shell"]
weight = 5
+++

Simulating a cache idea is only useful if you run it on realistic programs. **SPEC CPU 2006** is the classic benchmark suite for that: gcc, bzip2, mcf, perlbench, soplex, lbm, omnetpp and more. Running it on [gem5](/projects/gem5-cache-research/) means juggling binaries, input files, cache sizes and dozens of command-line flags, so I wrapped it all in scripts.

## What's in the repo

- **`run_Spec2006_Simple_Modified.sh`**: runs the benchmarks one by one on a single core, in gem5's syscall-emulation mode with a `TimingSimpleCPU`. Cache geometry (L1I/L1D/L2 sizes, associativity, line size), the instruction limit and fast-forward distance are variables at the top, so a whole experiment is one edit away.
- **`run_Spec2006_Simple_Multicore.sh`**: a 4-core version that runs four benchmarks at once (for example perlbench + bzip2 + mcf + soplex) on a detailed ARM CPU model. It fast-forwards 4 billion instructions to skip start-up and then measures 4 billion more, against the four-partition L2 from my research branch.

It started from a SPEC2000 script shared in the gem5 community and grew into my own.

## Small things that make long runs bearable

A single benchmark can simulate for hours, so the runner:

- shows a **spinner with elapsed time** while gem5 runs in the background,
- writes each benchmark's **stats file and console output** to its own log,
- prints coloured *Started* / *Finished* lines so you can glance at a terminal and know where it is.

```bash
runProgran log_403.gcc.txt gcc gcc/ref/input/200.in
```

## Status

Finished. Paths point at my machine, so treat it as a template: set `GEM5_ROOT`, `BINARY_DIR` and `INPUT_DATA_DIR` to yours. SPEC itself is licensed and isn't included.
