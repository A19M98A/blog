+++
title = "MoonSim"
date = "2023-09-08"
lastmod = "2023-09-08"
summary = "The very first seed of a GUI simulator, a Tkinter window and an idea."
repo = "https://github.com/A19M98A/MoonSim"
language = "Python"
status = "experiment"
stack = ["Python 3", "Tkinter"]
tags = ["python", "experiment"]
weight = 9
+++

Not every repo is a finished project, and I think it's worth being honest about that. **MoonSim** is the very beginning of one: a Python **Tkinter** window with a label and a Quit button, committed the day the idea came up.

```python
root = Tk()
frm = ttk.Frame(root, padding=10)
frm.grid()
ttk.Label(frm, text="Hello World!").grid(column=0, row=0)
ttk.Button(frm, text="Quit", command=root.destroy).grid(column=1, row=0)
root.mainloop()
```

## Why keep it public?

It marks the moment I started thinking about putting a friendly graphical front-end on the simulators I use. That idea ended up going in a different direction: instead of a desktop GUI, I now build **terminal UIs** with Textual, as in [ocpanel](/projects/ocpanel/) and the [waveform viewer](/projects/iverilog-waveform-viewer/). Those run over SSH, which matters when your simulations live on a remote server.

## Status

An experiment that stopped at step one, kept as a bookmark.
