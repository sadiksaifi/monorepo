---
title: "Manage Dotfiles with Git Bare Repository"
description: "Learn how to manage dotfiles using a Git bare repository for a clean, symlink-free approach to version controlling your configuration files."
pubDate: "Apr 27 2025"
image: "./images/manage-dotfiles-with-git-bare-repository.png"
tags: ["git", "dotfiles", "repo", "config", "barerepo"]
---

Learn how to manage dotfiles using a Git bare repository for a clean, symlink-free approach to version controlling your configuration files.

## Setting Up Your Dotfiles Repository

### Initialize a Git Bare Repository

```bash
git init --bare $HOME/.dotfiles
```

### Create an Alias for Management

Add this to your shell config file (.zshrc, .bashrc, etc.):

```bash
echo "alias dots='/usr/bin/git --git-dir=$HOME/.dotfiles --work-tree=$HOME'" >> $HOME/.zshrc
source $HOME/.zshrc
```

### Configure Local Repository Settings

Hide untracked files to avoid noise in status output:

```bash
dots config --local status.showUntrackedFiles no
```

### Using Your Repository

From this point on, use your `dots` alias instead of `git`:

```bash
dots status
dots add $HOME/.config/nvim
dots commit -m "initial commit"
dots push -u origin main
```

## Setting Up on a New Machine

Clone the bare repository:

```bash
git clone --bare https://github.com/yourusername/dotfiles.git $HOME/.dotfiles
```

Set up the alias:

```bash
echo "alias dots='/usr/bin/git --git-dir=$HOME/.dotfiles --work-tree=$HOME'" >> $HOME/.zshrc
source $HOME/.zshrc
```

Checkout the actual content:

```bash
dots checkout
```

If you have conflicts with existing files:

```bash
# Option to force checkout
dots checkout -f

# Or backup and then checkout
mkdir -p $HOME/.config-backup
dots checkout 2>&1 | grep -E "\s+\." | awk {'print $1'} | xargs -I{} mv {} $HOME/.config-backup/{}
dots checkout
```

Apply the same configuration:

```bash
dots config --local status.showUntrackedFiles no
```

## Quick Setup Script

For faster setup on new machines:

```bash
#!/bin/bash
git clone --bare https://github.com/yourusername/dotfiles.git $HOME/.dotfiles
function dots {
   /usr/bin/git --git-dir=$HOME/.dotfiles --work-tree=$HOME $@
}
mkdir -p $HOME/.config-backup
dots checkout
if [ $? = 0 ]; then
  echo "Checked out config.";
else
  echo "Backing up pre-existing dot files.";
  dots checkout 2>&1 | grep -E "\s+\." | awk {'print $1'} | xargs -I{} mv {} $HOME/.config-backup/{}
  dots checkout
fi;
dots config --local status.showUntrackedFiles no
```

## Tips for Multiple Machines

For machine-specific settings, use branches:

```bash
dots checkout -b laptop
# Make changes for laptop configuration
dots push -u origin laptop
```

This approach eliminates the need for symlinks, complex scripts, or additional tools while providing a familiar Git workflow for your dotfiles.
