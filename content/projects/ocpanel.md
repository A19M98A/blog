+++
title = "ocpanel"
date = "2026-09-28"
lastmod = "2026-11-07"
summary = "A keyboard-first terminal panel for split tunnelling on macOS and Linux: decide what goes through your VPN and what goes around it, live."
repo = "https://github.com/A19M98A/ocpanel"
language = "Python"
status = "active"
stack = ["Python 3.10+", "Textual", "openconnect", "sing-box", "iproute2 / BSD route"]
tags = ["networking", "tui", "python", "macos", "linux"]
featured = true
weight = 1
+++

**ocpanel** is a terminal app that gives you *split tunnelling* on top of whatever VPN you already use. You pick which sites, addresses or whole services go through the tunnel and which go around it, and the panel shows you, from the kernel's own routing table, whether that's really happening.

![The ocpanel main screen](https://raw.githubusercontent.com/A19M98A/ocpanel/main/docs/panel.png)

## Why I built it

A VPN is all-or-nothing by default. Everything goes through the tunnel, including the traffic that suffers most from it: a game that needs low latency, a big download that doesn't need hiding, or a local service that blocks VPN exit addresses. Server-side split tunnelling fixes this, but only if you run the server. I wanted to do it **from the client**, live, without asking the VPN to cooperate.

## How it works

ocpanel works on the **routing table**, not on the VPN protocol, so it doesn't care who built the tunnel: `openconnect`, a macOS system VPN like V2Box, WireGuard, or a VLESS/VMess/Trojan subscription the panel starts itself through `sing-box`.

It has two modes, and `m` switches between them:

- **VPN by default.** The VPN owns the default route. For every target on your *bypass list*, ocpanel adds a more specific route via your real gateway. More specific routes always win, so that traffic leaves directly.
- **Direct by default.** ocpanel adds `0.0.0.0/1` and `128.0.0.0/1` via your real gateway. Together they cover every address and beat the VPN's default route without deleting it. Targets on your *VPN list* get routes bound to the tunnel interface.

A few details I'm proud of:

- **It tells the truth.** Every rule shows the interface the kernel *actually* uses right now, read back from the routing table. If a client like V2Box sets Apple's `includeAllNetworks` flag (which silently overrides all routes), the panel detects it and says so instead of showing green rules that do nothing.
- **Whole services, not just hostnames.** YouTube lives on hundreds of Google addresses. `s` adds a service by the IP ranges its operator publishes (~305 ranges for Google, minus Google Cloud customer ranges).
- **Game-aware.** `g` pulls Valve's live Steam Datagram Relay list for Dota 2, and `f` reads what a running game is connected to right now.
- **"Is it really working?"** `v` opens a real TLS connection over the chosen path and reports what happened, so you can catch networks that accept the connection and then go silent.
- **No DNS leaks, no secrets in files.** Resolvers are pinned to the tunnel before anything goes direct, and passwords live in the system keychain, never in the config or on the command line.
- **Safe to recover.** Routes point at a gateway that changes when you switch Wi-Fi. ocpanel re-points them while it's open, and `ocpanel --reset` is an escape hatch when it isn't.

## Under the hood

It's built with [Textual](https://textual.textualize.io/). The code is split so the risky parts are testable: everything platform-specific lives in one module (`plat.py`) as functions that *parse text* rather than run commands, so the Linux parsing tests pass on a Mac and vice versa. Real route changes are verified inside a throwaway Docker container that has its own routing table.

```bash
git clone https://github.com/A19M98A/ocpanel.git
cd ocpanel && ./install.sh
sudo ~/.local/bin/ocpanel
```

## Status

Actively developed, and the project I use every day. IPv4 only for now, and routing is per destination rather than per app. That's a kernel limitation, and the README explains it honestly.
