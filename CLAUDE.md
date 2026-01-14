# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

This is a Next.js 16 project using the App Router with React 19, TypeScript, and Tailwind CSS 4.

**Path alias:** `@/*` maps to `./src/*`

**Fonts:** Geist Sans and Geist Mono are loaded via `next/font/google` and exposed as CSS variables `--font-geist-sans` and `--font-geist-mono`.

**Styling:** Tailwind CSS 4 with CSS-based configuration in `globals.css`. Theme colors use CSS custom properties (`--background`, `--foreground`) with automatic dark mode via `prefers-color-scheme`.
