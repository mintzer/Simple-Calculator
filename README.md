# Simple Calculator

A browser-based calculator application migrated from Python/Tkinter to TypeScript/React.

## Overview

This calculator performs basic arithmetic operations (addition, subtraction, multiplication, division) with a clean web interface. It has been migrated from a Python Tkinter desktop application to a modern React single-page application.

## Features

- Addition, subtraction, multiplication, and division operations
- Input validation matching the original Python implementation
- Operation-specific color schemes
- Author information display
- Division-by-zero error handling

## Installation

```bash
npm install
```

## Usage

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Run tests:
```bash
npm run test
```

Type checking:
```bash
npx tsc --noEmit
```

## Project Structure

- `src/core/validation.ts` - Input validation logic
- `src/core/operations.ts` - Arithmetic operation functions
- `src/core/author.ts` - Author information provider
- `src/ui/components/Calculator.tsx` - Main calculator component
- `src/main.tsx` - Application entry point

## Author

- Name: Pranta Sarker
- Batch: 6th
- Department: CSE
- Institution: North East University Bangladesh

## Source

Original Python implementation: https://github.com/mintzer/Simple-Calculator-8.git
