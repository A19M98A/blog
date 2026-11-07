+++
title = "Terminal waveform viewer"
date = "2025-11-11"
lastmod = "2025-11-11"
summary = "A GTKWave-style viewer for Verilog simulation waveforms (.vcd) that runs entirely in the terminal."
repo = "https://github.com/A19M98A/IverilogWaveformViewer"
language = "Python"
status = "working"
stack = ["Python 3", "Textual", "vcdvcd", "Icarus Verilog"]
tags = ["hardware", "verilog", "tui", "python"]
featured = true
weight = 3
+++

When you simulate a Verilog design, the simulator writes a **Value Change Dump** (`.vcd`) file: a log of every time every signal changed. The usual way to look at it is GTKWave, a desktop GUI. I spend most of my day in a terminal (often over SSH), so I built a viewer that runs **inside the terminal**.

## What it does

- A built-in **file browser** to find and open `.vcd` files.
- A **signal list** with checkboxes, so you choose which signals to draw.
- Synchronized panes for **names**, **values at the cursor**, the **waveforms** and a **timeline** that scrolls in lockstep with them.
- **Pan** with the arrow keys, **zoom** with `-` and `=`, and **click** anywhere to move the time cursor and see every signal's value at that moment.
- Single-bit signals are drawn as high/low lines with sharp edges at each transition. Multi-bit buses are drawn as a band with their hex value written inside. Every signal gets its own colour.

## How to use it

Ask your testbench to dump waveforms:

```verilog
initial begin
  $dumpfile("fifo_waveform.vcd");
  $dumpvars(0, tb_fifo);
end
```

Then simulate and open the result:

```bash
iverilog -o my_sim fifo.v tb_fifo.v
vvp my_sim
python main.py   # pick fifo_waveform.vcd in the file browser
```

## How it's built

The app is made with [Textual](https://textual.textualize.io/). Parsing is handled by `vcdvcd` behind a tiny wrapper (`vcd_parser.py`), and each pane is its own widget in `widgets/`. The interesting part is `waveform_view.py`: it turns a list of `(time, value)` changes into rows of box-drawing characters at the current zoom level, and keeps the timeline and waveform scroll positions in sync.

## Status

Works well for everyday debugging. A sample FIFO waveform is included in `TestFile/` so you can try it without a simulator.
