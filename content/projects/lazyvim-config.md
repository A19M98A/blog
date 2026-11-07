+++
title = "Neovim config (LazyVim)"
date = "2025-05-18"
lastmod = "2025-05-31"
summary = "My current editor: LazyVim with a handful of extras, tuned for working inside the gem5 codebase."
repo = "https://github.com/A19M98A/nvim"
language = "Lua"
status = "active"
stack = ["Lua", "Neovim", "LazyVim"]
tags = ["neovim", "dotfiles", "lua", "tooling"]
weight = 8
+++

After building a [Neovim config from scratch](/projects/neovim-config/), I switched to **[LazyVim](https://www.lazyvim.org/)**: a well-maintained distribution with good defaults that's still just Lua underneath. This repo holds the small set of changes that make it mine.

## The changes

- **Extras turned on:** Copilot and Copilot Chat, `mini-diff`, the `neo-tree` and `snacks` file explorers, Treesitter context (the current function stays pinned at the top), and language packs for JSON, Markdown and TOML.
- **4-space indentation** everywhere, with spaces instead of tabs.
- **Autoformat off for gem5.** gem5 has its own strict style, and a formatter rewriting whole files would make every diff unreadable. Turning it off was literally one of my first commits.
- **LazyDocker** for managing containers without leaving the editor.

## Why LazyVim?

Writing every plugin config yourself is a great way to learn, and a slow way to stay up to date. LazyVim gives me sensible, maintained defaults, and my repo only has to describe what's *different*. That's a much smaller thing to maintain.

## Status

My daily editor.
