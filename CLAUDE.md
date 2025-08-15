# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 blog application built with TypeScript, TailwindCSS, and shadcn/ui components. The blog uses markdown files stored in the `_posts/` directory for content, with support for categorization, search, and filtering functionality.

## Development Commands

### Core Commands
- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server

### Testing
- `yarn test` - Run tests with Vitest
- `yarn test:watch` - Run tests in watch mode
- `yarn test:coverage` - Run tests with coverage report

## Architecture Overview

### Content Management
- **Markdown-based posts**: Content stored in `_posts/[category]/[slug].md` format
- **Gray-matter frontmatter**: Posts use YAML frontmatter for metadata (title, date, category, preview, etc.)
- **Category structure**: Posts are organized in category subdirectories (`daily/`, `dev/`)
- **Static generation**: Posts are processed at build time using `getAllPosts()` and `getPostBySlug()`

### Key Components
- **ClientPage** (`src/components/ClientPage.tsx`): Main client-side component handling search/filter UI
- **SearchFilter** (`src/components/SearchFilter.tsx`): Search input and category filter components
- **PostCard** (`src/components/PostCard.tsx`): Individual post preview component
- **useSearchAndFilter** (`src/hooks/useSearchAndFilter.ts`): Custom hook managing search/filter state and URL synchronization

### Routing Structure
- `/` - Homepage with post listing, search, and filter
- `/posts/[category]/[slug]` - Individual post pages
- `/categories/[category]` - Category-specific post listings

### State Management
- URL-based state: Search terms and category filters are synced with URL query parameters
- Client-side filtering: Posts are filtered in real-time based on title and preview content
- No external state management library - uses React built-in state and URL params

### Styling
- **TailwindCSS**: Utility-first CSS framework with custom color palette
- **Dark mode**: Class-based dark mode (`dark:` prefix) with toggle functionality
- **shadcn/ui**: Pre-built accessible components (Select, Input, Button, Card)
- **Custom colors**: accent-1, accent-2, accent-7, success, cyan defined in tailwind.config.ts

### Testing Setup
- **Vitest**: Unit and integration testing framework
- **Testing Library**: React component testing utilities
- **jsdom**: Browser environment simulation
- **Path alias**: `@/` maps to `src/` directory
- Tests located in `src/tests/integration/`

## File Structure Conventions

### Path Aliases
- `@/` maps to `src/`
- `@/components` for React components
- `@/lib` for utilities and API functions
- `@/hooks` for custom React hooks
- `@/interfaces` for TypeScript type definitions

### Post Content
- Posts must be in `_posts/[category]/[filename].md` format
- Required frontmatter fields: `title`, `date`, `category`, `preview`
- Optional fields: `coverImage`, `ogImage`
- Categories are defined as TypeScript union type: `"daily" | "dev"`

### Component Organization
- UI components in `src/components/ui/` (shadcn/ui)
- Page-specific components in `src/app/_components/`
- Reusable components in `src/components/`
- Client components must include `"use client"` directive

## Development Notes

### Theme System
- Uses class-based dark mode with custom ThemeScript for SSR compatibility
- Theme switching handled by ThemeSwitcher component
- Custom theme colors defined in tailwind.config.ts

### Search Functionality
- Real-time search across post titles and preview content
- Case-insensitive matching
- URL synchronization for shareable search states
- Empty state handling for no search results

### TypeScript Configuration
- Strict mode enabled
- Path mapping configured for `@/*` imports
- Next.js plugin for enhanced TypeScript support
- Target: ES2017 for broad compatibility