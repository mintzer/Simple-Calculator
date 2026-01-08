# Simple Calculator - TypeScript/React Migration

A browser-based calculator application migrated from Python/Tkinter to TypeScript/React.

**Source:** https://github.com/mintzer/Simple-Calculator-8.git
**Created:** Thu Dec 25 17:48:44 UTC 2025

## Overview

This project is a migration of a Python Tkinter calculator to a modern web application using TypeScript, React, and Vite. The calculator provides basic arithmetic operations (addition, subtraction, multiplication, division) with robust input validation.

## Project Status

- ✅ **Task 1 (Foundation)**: Project setup complete
- ✅ **Task 2 (Core Validation)**: Validation and type conversion logic implemented and tested

## Development

### Prerequisites

- Node.js 20+ LTS
- npm package manager

### Installation

```bash
npm install
```

### Available Commands

```bash
# Run development server
npm run dev

# Run tests
npm run test

# Run tests once (CI mode)
npm run test -- --run

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Project Structure

```
src/
├── core/
│   ├── validation.ts       # Input validation and type conversion
│   └── validation.test.ts  # Comprehensive validation tests
├── ui/
│   ├── components/         # React components (to be implemented)
│   └── styles/            # CSS styling
└── main.tsx               # Application entry point
```

## Core Validation Logic

The validation module (`src/core/validation.ts`) provides two key functions:

- **`isNumber(s: string): boolean`** - Validates numeric string formats, replicating Python's validation behavior
- **`castToNumber(num: string): number`** - Converts validated numeric strings to JavaScript numbers

### Supported Number Formats

✅ Integers: `"123"`, `"-123"`, `"+123"`
✅ Floats: `"123.456"`, `"0.123"`, `"1.0"`, `"0."`
✅ Decimals: `".123"`, `"-.123"`, `"+.123"`
✅ Signed floats with leading zero: `"-0.123"`, `"+0.123"`
✅ Space prefix: `" 123"`

❌ Empty string, single space, single dot, non-numeric characters, multiple dots

### Testing

The project includes 29 comprehensive unit tests covering:
- Valid integer and float formats
- Signed numbers
- Leading decimal points
- Edge cases (empty strings, special characters, etc.)
- Integration between validation and casting

All tests pass and maintain functional parity with the original Python implementation.

## Milestones

### Milestone 1: Foundation, Core Logic, and Addition Operation

**Status:** In Progress (Task 2 completed)

- ✅ Project infrastructure (TypeScript, Vite, React)
- ✅ Core validation and type conversion logic
- ⏳ Addition operation implementation
- ⏳ Basic UI with calculator layout

### Milestone 2: Remaining Operations and Complete UI

**Status:** Not Started

- ⏳ Subtraction, multiplication, division operations
- ⏳ Division-by-zero handling
- ⏳ Author information dialog
- ⏳ Operation-specific color schemes
- ⏳ UI/browser tests with Playwright

## Original Python Implementation

The original calculator was implemented in Python using Tkinter with:
- Two input fields for numbers
- Four operation buttons (+, -, *, /)
- Result display with operation-specific colors
- Author information button
- Input validation for various numeric formats

## Migration Strategy

The migration follows these principles:
- **Functional parity**: All validation logic preserves exact Python behavior
- **Type safety**: Leveraging TypeScript's static typing
- **Modern tooling**: Vite for fast builds, Vitest for testing
- **Browser-based**: React SPA instead of desktop GUI
- **No REST API**: All logic runs client-side
