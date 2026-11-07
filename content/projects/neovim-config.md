+++
title = "Neovim config (from scratch)"
date = "2025-02-15"
lastmod = "2025-05-12"
summary = "My hand-built Neovim setup: lazy.nvim, LSP, completion, Git, Copilot and a transparent Catppuccin theme."
repo = "https://github.com/A19M98A/nvimConf"
language = "Lua"
status = "archived"
stack = ["Lua", "Neovim", "lazy.nvim", "Mason", "Telescope", "Treesitter"]
tags = ["neovim", "dotfiles", "lua", "tooling"]
weight = 7
+++

Editors are personal. In early 2025 I rebuilt my Neovim setup **from scratch** in Lua, one plugin at a time, so I'd understand every line of it.

## How it's organised

```
init.lua                 -- bootstraps lazy.nvim, loads core modules
lua/core/options.lua     -- tabs, numbers, search…
lua/core/keymaps.lua     -- my shortcuts
lua/core/plugins.lua     -- the plugin list
lua/core/plugin_config/  -- one file per plugin
```

One file per plugin makes it painless to add, tweak or remove something without touching the rest.

## What's inside

- **Language smarts:** `nvim-lspconfig` + **Mason** to install language servers, `nvim-cmp` + LuaSnip for completion, Treesitter for highlighting, plus Rust and debugger (DAP) setups.
- **Finding things:** Telescope for files and text, `nvim-tree` and `oil.nvim` for browsing, and `neoclip` for clipboard history (`<leader>co`).
- **Git:** gitsigns with inline blame, fugitive, diffview, and LazyGit on `Ctrl+G`.
- **Writing and docs:** Markdown preview, Swagger/OpenAPI preview, todo-comments and a small to-do list plugin.
- **Comfort:** auto-sessions, noice + notify for nicer messages, tmux navigation with `Ctrl+H/J/K/L`, and GitHub Copilot.
- **Looks:** Catppuccin *Mocha* with a transparent background, so the terminal theme shows through.

## Status

Archived. After a few months I moved to a lighter [LazyVim-based setup](/projects/lazyvim-config/), but building this one first is what made LazyVim easy to bend to my needs.
