+++
title = "ip-scanner"
date = "2019-02-05"
lastmod = "2022-09-02"
summary = "A threaded ping sweeper with a colourful terminal dashboard. One of my oldest projects and still my most-starred."
repo = "https://github.com/A19M98A/ip-scanner"
language = "Python"
status = "archived"
stack = ["Python 3", "threading", "ping", "ANSI terminal UI"]
tags = ["networking", "python", "tui"]
weight = 6
+++

**ip-scanner** is one of the first tools I ever published, and it's still my most-starred repo. It sweeps a range of IPv4 addresses, finds which ones answer, and shows them on a colourful dashboard right in the terminal.

## How it works

- You give it a **start and end address**. A set of nested loops walks every address in between, carrying correctly across octets (so `10.0.0.250`–`10.0.1.5` works).
- Each address gets its own **thread** that runs `ping -c1`. If the host answers, the thread records its address and round-trip time.
- To avoid drowning the machine, the scanner caps itself at about **200 live threads** and waits for some to finish before starting more.
- `Interface.py` draws an ASCII-art logo and a live grid of hosts, coloured by whether they're up, down or just came online, redrawn in place with ANSI escape codes.

```bash
cd ip-scanner
python3 Interface.py
```

There's also a small companion script, `Sexton.py`, for macOS. It walks through static IPs on a local network until it finds one that gets internet access, and offers to switch back to DHCP when you press Ctrl+C.

## Looking back

It's very much a 2019 student project: shelling out to `ping`, results passed through a text file, lots of threads instead of async I/O. If I wrote it today I'd use `asyncio` or raw ICMP sockets and keep results in memory. But it taught me threads, terminal drawing and a lot about how networks behave, and ideas from it live on in [ocpanel](/projects/ocpanel/).

## Status

Archived. Last touched in 2022.
