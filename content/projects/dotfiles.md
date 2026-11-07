+++
title = "Dotfiles"
date = "2020-09-08"
lastmod = "2023-03-29"
summary = "My terminal setup: zsh, vim and an iTerm2 profile with a Powerline font and custom colours."
repo = "https://github.com/A19M98A/config"
language = "Shell"
status = "archived"
stack = ["zsh", "bash", "vim", "iTerm2"]
tags = ["dotfiles", "tooling", "macos"]
weight = 10
+++

The repo every developer ends up with: my **configuration files**, kept in Git so a new machine feels like home in minutes.

## What's in it

- **Shell:** `.zshrc` and `.bashrc` with my aliases and prompt.
- **Editor:** a `.vimrc` from before I [moved to Neovim](/projects/neovim-config/).
- **Terminal:** an exported **iTerm2** profile (`iterm.json`) using the *Meslo LG M for Powerline* font, plus a custom colour preset (`.itermcolors`) you can import with one click.
- **IDE:** an exported Android Studio settings archive from my Android days.

## Restoring it

```bash
git clone https://github.com/A19M98A/config.git
cp config/.zshrc config/.vimrc ~/
# iTerm2 → Settings → Profiles → Other Actions → Import JSON Profiles → iterm.json
```

## Status

Archived since 2023. Most of my setup now lives in my [Neovim config](/projects/lazyvim-config/) and in the tools I write myself.
