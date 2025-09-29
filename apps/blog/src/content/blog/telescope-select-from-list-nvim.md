---
title: "Telescope Select From List - Neovim Plugin"
description: "A pure Lua Neovim plugin that extends Telescope with interactive list selection capabilities for enhanced workflow efficiency."
pubDate: "Sep 29 2025"
image: "./images/telescope-select-from-list.png"
tags: ["neovim", "telescope", "lua", "plugin", "productivity"]
---

A pure Lua Neovim plugin that extends Telescope with interactive list selection capabilities for enhanced workflow efficiency.

## What is telescope-select-from-list.nvim?

Telescope Select From List is a pure Lua Neovim plugin that provides a clean, customizable interface for selecting items from any list. It's perfect for workflows that require user input or choice selection, leveraging Telescope's powerful fuzzy-finding capabilities.

## Installation

Install using your preferred plugin manager:

```lua
-- lazy.nvim
{
  "sadiksaifi/telescope-select-from-list.nvim",
  dependencies = { "nvim-telescope/telescope.nvim" },
  config = function()
    require("telescope").load_extension("select_from_list")
  end,
}

-- packer.nvim
use {
  "sadiksaifi/telescope-select-from-list.nvim",
  requires = { "nvim-telescope/telescope.nvim" },
  config = function()
    require("telescope").load_extension("select_from_list")
  end,
}
```

## Usage

Here are some practical examples of how to use the plugin:

### Basic Usage

```lua
require("telescope").extensions.select_from_list({
  "Option 1", "Option 2", "Option 3"
}, function(selected_item)
  print("Selected:", selected_item)
end)
```

### Theme Selection

```lua
local themes = { "tokyonight", "catppuccin", "gruvbox", "dracula" }
require("telescope").extensions.select_from_list(themes, function(theme)
  vim.cmd("colorscheme " .. theme)
end, { prompt_title = "Choose Color Scheme" })
```

### File Type Selection

```lua
local file_types = { "javascript", "typescript", "python", "lua", "rust" }
require("telescope").extensions.select_from_list(file_types, function(ft)
  vim.cmd("set filetype=" .. ft)
end, { prompt_title = "Set File Type" })
```

## Why This Plugin?

This plugin fills a gap in the Neovim ecosystem by providing a simple, clean way to select from custom lists using Telescope's interface. It's perfect for:

- **Theme switching** with visual feedback
- **File type selection** for quick switching
- **Custom workflows** that need user input
- **Configuration management** and project templates

The plugin is lightweight, pure Lua, and integrates seamlessly with existing Telescope setups.

## Conclusion

`telescope-select-from-list.nvim` provides a clean, efficient way to select from custom lists using Telescope's interface. It's perfect for enhancing your Neovim workflow with simple, interactive selections.

The plugin is lightweight, easy to use, and integrates seamlessly with existing Telescope configurations. Give it a try and let me know what you think!

**GitHub**: [telescope-select-from-list.nvim](https://github.com/sadiksaifi/telescope-select-from-list.nvim)
