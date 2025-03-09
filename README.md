# Todo App Architecture

## Overview

A modern Todo application built with Vite, React, and TypeScript, featuring a modular component architecture and clean state management.

## Tech Stack

- **Build Tool**: Vite
- **Frontend Framework**: React 18 with TypeScript
- **Styling**: CSS Modules
- **State Management**: React Context + Hooks
- **Type Safety**: TypeScript

## Project Structure

```
src/
api/                  # API service layer
components/          # React components
styles/             # Global styles and CSS modules
types/              # TypeScript type definitions
App.tsx             # Root application component
main.tsx           # Application entry point
index.css          # Global CSS
```

## Architecture Details

### Core Components

- `App.tsx`: Root component that sets up routing and global providers
- `main.tsx`: Entry point that renders the React application
- `vite-env.d.ts`: Vite environment type declarations

### Directory Organization

1. **api/**

   - Contains API service layer
   - Handles all external data fetching
   - Implements API interfaces and types

2. **components/**

   - Reusable UI components
   - Feature-specific components
   - Component-specific styles and tests

3. **styles/**

   - Global style definitions
   - Theme variables
   - Shared style utilities

4. **types/**
   - TypeScript interfaces
   - Type definitions
   - Shared type utilities

## Key Features

- Component-based architecture
- Type-safe development with TypeScript
- Modular CSS with CSS Modules
- Fast development with Vite HMR
- Clean separation of concerns

## Development Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development server:

   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Best Practices

- Components follow single responsibility principle
- TypeScript interfaces for all data structures
- CSS Modules for scoped styling
- API abstraction in dedicated service layer
- Consistent file naming conventions
