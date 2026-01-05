# Simple Calculator

TypeScript calculator migrated from Python, transforming a Tkinter desktop application into a browser-based SPA.

Source: https://github.com/mintzer/Simple-Calculator.git

## Project Status

This project is currently in **Milestone 1, Task 1** - establishing the foundation and validation module.

### Completed Features
- ✅ Node.js/TypeScript project setup with Vite
- ✅ Validation module (`isNumber()`) supporting integers, decimals, and signed numbers
- ✅ Casting module (`castNumber()`) for converting validated strings to numbers
- ✅ Comprehensive unit tests with Vitest
- ✅ TypeScript strict mode enabled
- ✅ Build system configured

### In Progress
- 🚧 UI components (HTML/CSS/DOM manipulation) - planned for Task 2
- 🚧 Addition operation implementation - planned for Task 2
- 🚧 Complete calculator functionality - planned for Milestone 2

## Development

### Prerequisites
- Node.js 20+ LTS
- npm package manager

### Installation
```bash
npm install
```

### Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run preview` - Preview production build
- `npm test` - Run unit tests with Vitest

### Project Structure

```
src/
  validation.ts  - Input validation logic (port of Python is_number)
  casting.ts     - Number casting logic (port of Python casting)
  main.ts        - Application entry point (minimal placeholder)
tests/
  validation.test.ts  - Unit tests for validation module
  casting.test.ts     - Unit tests for casting module
```

## Migration Notes

This is a TypeScript port of a Python Tkinter calculator application. The migration preserves:
- Exact validation semantics supporting various numeric formats
- Numeric casting behavior
- Visual feedback and color schemes (to be implemented)
- Calculator operations: addition, subtraction, multiplication, division (to be implemented)

The target is a browser-based SPA using plain TypeScript + DOM APIs, built with Vite.

## Testing

All validation and casting logic is thoroughly tested:
- 29 unit tests covering edge cases
- Support for integers, decimals, signed numbers
- Validation of invalid inputs
- Zero and edge case handling

Run tests with: `npm test`

## License

ISC

## Author

Pranta Sarker
