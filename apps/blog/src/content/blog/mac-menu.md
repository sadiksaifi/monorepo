---
title: "mac-menu: A Modern macOS Fuzzy Finder"
description: "Discover mac-menu, a native macOS GUI implementation of fuzzy finding, bringing the power of fzf to your desktop with a beautiful interface."
pubDate: "May 2 2025"
image: "./images/mac-menu.png"
tags: ["macos", "productivity", "launcher", "fzf"]
---

mac-menu is a modern, native macOS implementation of fuzzy finding, inspired by the powerful [fzf](https://github.com/junegunn/fzf) command-line tool. Built with Swift and Cocoa, it provides a clean, blur-backed interface with fuzzy search capabilities, making it an essential tool for power users who value efficiency and aesthetics.

## Features

- 🎨 Native macOS UI with modern design
- 🔍 Fuzzy search functionality (similar to fzf)
- ⌨️ Keyboard navigation (Up/Down arrows, Ctrl+P/N)
- 🖱️ Mouse support with hover effects
- 🌫️ Transparent, blur-backed window
- ⚡ Fast and responsive
- 📝 Standard input/output integration

## Installation

### Quick Install

```bash
curl -sSL https://raw.githubusercontent.com/sadiksaifi/mac-menu/main/install.sh | bash
```

### Manual Installation

```bash
# Clone and build
git clone https://github.com/sadiksaifi/mac-menu.git
cd mac-menu
make
sudo make install
```

## Basic Usage

The simplest way to use mac-menu is by piping input to it:

```bash
echo -e "Firefox\nSafari\nChrome" | mac-menu
```

The selected item will be printed to stdout, making it perfect for integration with other scripts and tools.

### Keyboard Shortcuts

- `↑` or `Ctrl+P`: Move selection up
- `↓` or `Ctrl+N`: Move selection down
- `Enter`: Select current item
- `Escape`: Exit without selection

## Real-World Example: Project Opener

One of the most practical uses of mac-menu is in project management scripts. Here's an example of how it can be used to create a project opener script:

```bash
#!/usr/bin/env bash

# Define directories to search
dirs=(
  "$HOME/Projects/"
  "$HOME/Repos/"
  "$HOME/.config/"
  "$HOME/.local/"
  "$HOME/Personal"
)

# Select directory using argument or mac-menu if no argument provided
if [ $# -eq 1 ]; then
  selected="$1"
else
  selected=$(find "${dirs[@]}" -mindepth 1 -maxdepth 1 -type d \
    -not -path '*/.git' \
    -not -path '*/node_modules' \
    -not -path '*/.yarn' \
    2>/dev/null | mac-menu)
fi

# Exit if no directory is selected
[ -z "$selected" ] && exit 0

# Open the selected directory with your preferred editor
/opt/homebrew/bin/cursor "$selected"
```

This script, which I call `pj` (project opener), demonstrates the power of mac-menu in a real-world scenario:

1. It searches through multiple directories for projects
2. Uses mac-menu to provide a fuzzy-searchable interface
3. Excludes common directories like `.git` and `node_modules`
4. Opens the selected project in your preferred editor

## Why mac-menu?

mac-menu stands out from other launchers because:

1. **Native Performance**: Built with Swift and Cocoa, it feels like a natural part of macOS
2. **Modern Design**: The blur-backed, transparent window with hover effects provides a premium feel
3. **Script Integration**: Its stdin/stdout interface makes it perfect for shell scripts, similar to fzf
4. **Keyboard First**: Designed for power users who prefer keyboard navigation
5. **Lightweight**: No dependencies, just pure macOS goodness
6. **Fuzzy Finding**: Brings the power of fzf's fuzzy search to a native GUI environment

## Building Your Own Integration

The possibilities with mac-menu are endless. Here are some ideas for integration:

- File and directory fuzzy finder
- Command history selector
- Git branch switcher
- SSH connection manager
- Password manager interface
- Project directory navigator

## Conclusion

mac-menu brings the power of fuzzy finding to macOS with a modern, native implementation. Whether you're a developer looking to streamline your workflow or a power user seeking a better way to interact with your system, mac-menu provides a clean, efficient solution that feels right at home on macOS.

Try it out today and experience the difference a well-designed fuzzy finder can make in your daily workflow!

## Open Source

mac-menu is open source and available on GitHub at [sadiksaifi/mac-menu](https://github.com/sadiksaifi/mac-menu). If you find it useful, please consider giving it a star! Your support helps the project grow and encourages further development.

## License

mac-menu is released under the MIT License. Feel free to use, modify, and distribute it as you wish.
