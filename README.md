# Simple Calculator

A cross-platform desktop calculator application built with Go and Fyne, migrated from the original Python/tkinter implementation.

## Overview

This calculator provides basic arithmetic operations (addition, subtraction, multiplication, division) with a graphical user interface. It features:

- Two input fields for entering numbers
- Four operation buttons (+, -, ×, ÷)
- Color-coded result displays for each operation
- Input validation with user-friendly error messages
- Division by zero protection
- Author information dialog

## Current Status (Task 1)

**Fully Functional:**
- ✅ Addition operation with red/light-blue color scheme
- ✅ Author information dialog
- ✅ Input validation for all number formats
- ✅ All four arithmetic operations implemented and tested in business logic

**Placeholder (to be completed in Task 2):**
- ⏳ Subtraction button handler
- ⏳ Multiplication button handler
- ⏳ Division button handler

The other three operation buttons are visible in the UI but not yet wired to their handlers.

## Requirements

- Go 1.23 or later
- Fyne v2.7.x (automatically installed via `go mod tidy`)

### Platform-Specific Requirements

**Linux:**
- X11 development libraries: `libgl1-mesa-dev xorg-dev`
- Install on Ubuntu/Debian: `sudo apt-get install libgl1-mesa-dev xorg-dev`

**Windows:**
- No additional requirements (pure Go with no CGO by default)

**macOS:**
- Xcode Command Line Tools

## Building

### Standard Build

```bash
go build -o simple-calculator
```

### Optimized Release Build

```bash
go build -ldflags="-s -w" -o simple-calculator
```

### Cross-Compilation

**Build for Windows from Linux/macOS:**
```bash
GOOS=windows GOARCH=amd64 go build -o simple-calculator.exe
```

**Build for Linux from Windows/macOS:**
```bash
GOOS=linux GOARCH=amd64 go build -o simple-calculator
```

## Running

After building, simply run the executable:

```bash
./simple-calculator
```

On Windows:
```cmd
simple-calculator.exe
```

## Testing

Run all unit tests with coverage:

```bash
go test ./calculator/... -v -cover
```

Expected output: All tests pass with >90% coverage.

## Usage

1. Enter a number in the first input field
2. Enter a number in the second input field
3. Click the operation button (+, -, ×, or ÷)
4. View the result displayed with the operation-specific color scheme

**Supported Number Formats:**
- Integers: `1`, `42`, `0`
- Floats: `3.14`, `-7.5`, `+2.0`
- Leading decimals: `.5`, `-.75`, `+.123`
- Signed numbers: `+10`, `-10`

**Error Handling:**
- Invalid inputs show an error dialog with format examples
- Division by zero shows an error message

## Project Structure

```
Simple-Calculator/
├── main.go                      # Application entry point
├── calculator/
│   ├── operations.go            # Arithmetic operations (Add, Subtract, Multiply, Divide)
│   ├── operations_test.go       # Unit tests for operations
│   ├── validator.go             # Input parsing and validation
│   └── validator_test.go        # Unit tests for validator
├── ui/
│   ├── theme.go                 # Color constants and UI text
│   ├── window.go                # Main window layout
│   └── handlers.go              # Button event handlers
├── go.mod                       # Go module definition
├── go.sum                       # Dependency checksums
└── README.md                    # This file
```

## Architecture

The application follows a clean separation of concerns:

- **calculator package**: Pure business logic with no UI dependencies
  - `operations.go`: Arithmetic functions
  - `validator.go`: Number parsing and validation
  - Comprehensive unit tests for all logic

- **ui package**: Fyne-based graphical interface
  - `theme.go`: Color schemes and constants
  - `window.go`: Window layout and widget creation
  - `handlers.go`: Event handlers that bridge UI and business logic

- **main.go**: Application bootstrap

## Design Decisions

### Number Parsing (Decision #1)
Uses Go's `strconv.ParseFloat` with pre-processing to handle formats accepted by Python's original `is_number()` function. This balances simplicity with behavioral parity.

### Float Display Formatting (Decision #2)
Uses `fmt.Sprintf("%g")` to display results, which naturally handles integers (e.g., "3" not "3.0") and floats (e.g., "3.14") similar to Python's `str()` function.

### Fyne Layout Strategy (Decision #3)
Uses nested Fyne containers (VBox, HBox, Grid) to approximate the original tkinter layout while respecting Fyne's declarative design philosophy.

### Result Display State (Decision #4)
Implements a two-phase display pattern matching the Python original:
1. Show operation name + "0" immediately on button click
2. Update with actual result after validation and computation

### Division by Zero (Decision #5)
Implements explicit zero-check in the `Divide` function, returning an error rather than allowing Go's default Inf behavior. This provides better user experience than either Python's exception or Go's float division.

## Original Source

Migrated from Python/tkinter implementation by:
- **Author:** Pranta Sarker
- **Institution:** North East University Bangladesh
- **Department:** CSE, Batch 6th
- **Source:** https://github.com/mintzer/Simple-Calculator.git

## License

This Go implementation maintains compatibility with the original Python calculator's intent and design.
