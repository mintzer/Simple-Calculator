# Go Calculator

A cross-platform desktop calculator application built with Go and Fyne, modernized from a Python tkinter implementation.

## Description

This calculator provides basic arithmetic operations (addition, subtraction, multiplication, and division) with a graphical user interface. It includes input validation and proper error handling for edge cases like division by zero and invalid numeric inputs.

## Prerequisites

- **Go**: Version 1.18 or newer
- **Fyne Dependencies**: The Fyne GUI toolkit requires platform-specific dependencies:
  - **Linux**: X11 development libraries (`libgl1-mesa-dev`, `xorg-dev`)
  - **macOS**: Xcode command line tools
  - **Windows**: No additional prerequisites

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Simple-Calculator
   ```

2. Install dependencies:
   ```bash
   go mod download
   ```

## Building

Build the application binary:

```bash
go build -o bin/calculator ./cmd/calculator
```

Or simply:

```bash
go build ./cmd/calculator
```

## Running

### Run without building:
```bash
go run ./cmd/calculator
```

### Run the built binary:
```bash
./bin/calculator
```

Or on Windows:
```cmd
.\bin\calculator.exe
```

## Testing

Run all unit tests:

```bash
go test ./...
```

Run tests with coverage:

```bash
go test -cover ./internal/calculator
```

Run tests with detailed coverage report:

```bash
go test -coverprofile=coverage.out ./internal/calculator
go tool cover -html=coverage.out
```

## Project Structure

```
simple-calculator/
├── cmd/
│   └── calculator/
│       └── main.go          # Application entry point
├── internal/
│   ├── calculator/
│   │   ├── calculator.go    # Core arithmetic operations
│   │   ├── validator.go     # Input validation
│   │   ├── formatter.go     # Result formatting
│   │   └── calculator_test.go # Unit tests
│   └── ui/
│       ├── config.go        # UI constants (window size, colors)
│       ├── window.go        # Main window layout
│       └── handlers.go      # Event handlers
├── go.mod
├── go.sum
└── README.md
```

## Features

- **Basic Arithmetic**: Addition, subtraction, multiplication, and division
- **Input Validation**: Accepts integers, floats, negative numbers, and numbers with leading decimals
- **Error Handling**: User-friendly error dialogs for invalid inputs and division by zero
- **Cross-Platform**: Runs on Windows, macOS, and Linux
- **Fixed Window Size**: 380×300 pixel non-resizable window for consistent layout

## Development

### Supported Input Formats

The calculator accepts the following numeric formats:
- Integers: `123`, `0`
- Floats: `0.123`, `.123`, `-0.123`, `123.456`
- Positive signs: `+123`, `+0.5`

### Error Messages

- Invalid input: "Enter a Valid number\ne.g. 123, 0.123, .123, -0.123, 123.456"
- Division by zero: "cannot divide by zero"

## License

This project is a modernization of the [Simple-Calculator](https://github.com/mintzer/Simple-Calculator) by mintzer.

## Source

Original Python implementation: https://github.com/mintzer/Simple-Calculator.git
