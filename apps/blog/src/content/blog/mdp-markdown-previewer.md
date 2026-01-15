---
title: "mdp - Preview Markdown Files Instantly in Your Browser"
description: "A fast CLI tool that converts Markdown to beautifully styled HTML with GitHub-flavored rendering, multi-file support, and a sleek sidebar navigation."
pubDate: "Jan 12 2026"
image: "./images/mdp-markdown-previewer.png"
tags: ["markdown", "cli", "productivity", "tools", "go"]
---

Ever wanted to quickly preview a Markdown file without opening a full-blown editor or IDE? Meet **mdp** - a lightning-fast CLI tool that renders your Markdown files in the browser with beautiful GitHub-styled formatting.

> Give the project a star on [GitHub](https://github.com/sadiksaifi/mdp) if you find it useful!

## Why mdp?

Most developers work with Markdown daily - READMEs, documentation, notes, changelogs. But previewing them often means:

- Opening VS Code or another heavy editor
- Installing browser extensions
- Using online converters that require copy-pasting

**mdp** solves this with a single command. Just run `mdp README.md` and your file opens in the browser, beautifully rendered with GitHub's familiar styling.

## Features at a Glance

- **GitHub Flavored Markdown** - Tables, task lists, strikethrough, syntax highlighting
- **Dark mode support** - Automatically follows your system preference
- **Multi-file preview** - View multiple files with sidebar navigation
- **Directory support** - Preview all Markdown files in a folder
- **Live reload server** - Watch files and auto-refresh on changes
- **Respects .gitignore** - Automatically skips ignored files
- **Auto-updates** - Get notified when new versions are available
- **Cross-platform** - Works on macOS, Linux, and Windows
- **Zero configuration** - Just install and use

## Installation

### Using Homebrew (macOS)

```bash
brew install sadiksaifi/tap/mdp
```

### Using Curl (macOS/Linux)

```bash
curl -fsSL https://raw.githubusercontent.com/sadiksaifi/mdp/main/scripts/install.sh | sh
```

This installs mdp to `~/.local/bin` and automatically configures your PATH.

### From Source

```bash
git clone https://github.com/sadiksaifi/mdp.git
cd mdp
make install
```

## Upgrading

mdp automatically checks for updates and notifies you when a new version is available.

### Homebrew

```bash
brew upgrade sadiksaifi/tap/mdp
```

### Curl Installation

```bash
mdp upgrade
```

## Usage

### Preview a Single File

The simplest use case - preview any Markdown file:

```bash
mdp README.md
```

This converts your Markdown to HTML with GitHub styling and opens it in your default browser. The output is saved to `/tmp/mdpreview-README.html`.

### Preview Multiple Files

Working on documentation with multiple files? Preview them together with a handy sidebar:

```bash
mdp README.md CHANGELOG.md docs/getting-started.md
```

This creates a single HTML page with all your files accessible through a sidebar navigation panel.

### Preview an Entire Directory

Have a `docs/` folder full of Markdown? Preview everything at once:

```bash
mdp ./docs/
```

mdp will recursively find all `.md` files, respecting any `.gitignore` files along the way (including nested ones in monorepos).

### Live Reload Server

The `--serve` flag starts a local development server that watches your files and automatically refreshes the browser when you make changes:

```bash
mdp --serve README.md
```

This starts a server at `http://localhost:8080` and opens it in your browser. Every time you save the file, the preview updates instantly - no manual refresh needed!

#### Custom Port

Need a different port? Use the `--port` flag:

```bash
mdp --serve --port 3000 ./docs/
```

#### Perfect for Writing

The live reload feature is ideal for:

- **Writing documentation** - See your changes in real-time
- **Drafting blog posts** - Preview formatting as you write
- **Editing READMEs** - Perfect your project description
- **Reviewing changes** - Watch updates as teammates edit

Simply save your file and watch the browser update automatically. No more switching windows and hitting refresh!

## Multi-File Mode Features

When previewing multiple files or a directory, mdp creates an elegant interface with:

### Collapsible Sidebar

The sidebar shows your file tree on the left. On desktop, you can collapse it to focus on the content using the keyboard shortcut:

- **Mac**: `Cmd + B`
- **Windows/Linux**: `Ctrl + B`

Your sidebar preference is remembered between sessions.

### Mobile Responsive

On smaller screens, the sidebar becomes a hamburger menu. Tap to open, tap outside or press `Escape` to close. Perfect for reviewing docs on a tablet.

### File Tree Navigation

Files are organized just like your directory structure, with folders shown first. Click any file to view its content instantly - no page reload needed.

## Real-World Use Cases

### Quick README Check

Before pushing to GitHub, preview how your README will look:

```bash
mdp README.md
```

### Documentation Review

Review your entire documentation site locally:

```bash
mdp ./docs/
```

### Changelog Preview

Check your release notes formatting:

```bash
mdp CHANGELOG.md
```

### Meeting Notes

Preview your Markdown meeting notes before sharing:

```bash
mdp notes/2024-01-meeting.md
```

### Live Documentation Editing

Write documentation with instant feedback using live reload:

```bash
mdp --serve ./docs/
```

Every save automatically refreshes your browser - perfect for documentation sprints or technical writing sessions.

## Technical Details

mdp is built with Go for speed and simplicity:

- Uses [goldmark](https://github.com/yuin/goldmark) for Markdown parsing
- Supports all GitHub Flavored Markdown extensions
- Generates self-contained HTML with embedded CSS
- Live reload powered by WebSocket for instant updates
- File watching via [fsnotify](https://github.com/fsnotify/fsnotify)
- No external dependencies at runtime
- Single binary, easy to install anywhere

## Tips and Tricks

### Combine with Other Tools

Chain mdp with file finders for powerful workflows:

```bash
# Preview all Markdown files modified today
find . -name "*.md" -mtime 0 | xargs mdp

# Preview specific docs
mdp $(ls docs/*.md)
```

### Use in Scripts

mdp returns proper exit codes, making it useful in scripts:

```bash
# Check if Markdown renders without errors
if mdp --help > /dev/null 2>&1; then
    echo "mdp is installed"
fi
```

## Get Started

Install mdp today and simplify your Markdown workflow:

```bash
# macOS (Homebrew)
brew install sadiksaifi/tap/mdp

# macOS/Linux (Curl)
curl -fsSL https://raw.githubusercontent.com/sadiksaifi/mdp/main/scripts/install.sh | sh
```

Check out the [GitHub repository](https://github.com/sadiksaifi/mdp) for more options and to contribute to the project.

Happy writing!
