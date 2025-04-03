---
title: 'Copy & Paste Controller'
description: 'A browser extension that enables or disables copy and paste functionality on any webpage with a single click.'
pubDate: 'Dec 16 2024'
image: './images/copy-paste-controller.png'
tags: ['chrome', 'safari', 'extension', 'copy', 'paste' ]
---

A browser extension that enables or disables copy and paste functionality on any webpage with a single click.

## Motivation

In the digital age, web developers often implement restrictive copy-paste policies that hinder user experience. The Copy & Paste Controller extension was born out of a simple yet powerful idea: giving users complete control over their browsing experience.

## What is Copy & Paste Controller?

Copy & Paste Controller is a browser extension that allows you to enable or disable copy and paste functionality on any webpage with a single click. Whether you're a student, researcher, professional, or casual browser, this extension restores a fundamental web interaction right.

## Key Features

### 1. One-Click Toggle
- Instantly enable or disable copy-paste functionality
- Works seamlessly across all websites
- Clean, intuitive user interface

### 2. Cross-Browser Support
- Available for Chrome
- Safari support in progress
- Consistent experience across platforms

### 3. Persistent Settings
- Remember your copy-paste preferences
- Settings persist across browser sessions
- No need to reconfigure every time you browse

## Technical Architecture

### Chrome Extension
- Manifest V3 compliant
- Uses WebExtensions API
- Lightweight and performant
- Minimal system resource consumption

### Safari Extension
- Native Safari extension support
- Swift-based implementation
- Follows Apple's extension guidelines

## Privacy Commitment

- Zero data collection
- No tracking or telemetry
- Settings stored locally in browser storage
- Open-source and transparent

## Installation

### Chrome
1. Visit Chrome Web Store
2. Search "Copy & Paste Controller"
3. Click "Add to Chrome"

### Safari
- Coming soon!

### Manual Installation

1. Clone the repository: `git clone https://github.com/sadiksaifi/copy-paste-controller.git`
2. Open the respective browser extension folder (chrome/safari) with your browser as Load Unpacked
   - Chrome: `chrome://extensions/` > Enable Developer Mode > Load Unpacked > Select the Chrome extension folder
   - Safari: `safari://extensions/` > Enable Developer Mode > Load Unpacked > Select the Safari extension folder

## Roadmap

- [x] Chrome support
- [x] Basic Safari support
- [ ] Custom website-specific settings
- [ ] Keyboard shortcuts
- [ ] Localization support

## Technical Details

### Permissions
- `scripting`: Modify webpage behavior
- `activeTab`: Control current tab's copy-paste
- `storage`: Save user preferences

### Technologies
- JavaScript
- WebExtensions API
- Chrome Storage API
- Swift (for Safari)

## Community and Support

Developed by Sadik Saifi, a passionate developer committed to user empowerment.

- GitHub: [Copy & Paste Controller](https://github.com/sadiksaifi/copy-paste-controller/)
- Website: [www.sadiksaifi.dev](https://www.sadiksaifi.dev)
- Contact: email@sadiksaifi.dev

## License

GNU General Public License v3.0

**Version**: 1.0.0  
**Released**: December 16, 2024
