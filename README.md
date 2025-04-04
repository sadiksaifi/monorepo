# Monorepo

This is a monorepo for my personal projects. It uses [pnpm](https://pnpm.io/) as the package manager and [turborepo](https://turbo.build/repo) for build orchestration.

## Prerequisites
- [Node.js](https://nodejs.org/en/download/) (v20 or later)
- [pnpm](https://pnpm.io/) (v10 or later)
- [Turbo](https://turbo.build/repo/docs/getting-started) (v2 or later)
- [Git](https://git-scm.com/downloads) (v2 or later)

## Getting Started

Install the dependencies:

```bash
pnpm install
```
Run the development server:

```bash
turbo dev
```
Run the build:

```bash
turbo build
```

## Project Structure
The monorepo is structured as follows:

```bash
monorepo/
├── apps
│   ├── blog # Blog website
│   ├── data # Assets
│   └── web # Portfolio website
└── packages
    ├── eslint-config
    ├── lib
    ├── typescript-config
    └── ui
```