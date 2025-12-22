# Simple Calculator

A web-based calculator application written in Go, migrated from the original Python tkinter implementation.

## Project Overview

This is a modernized version of the Simple Calculator, transformed from a Python desktop GUI application to a Go-based web application. The calculator performs basic arithmetic operations (addition, subtraction, multiplication, and division) on two numbers.

**Original Author**: Pranta Sarker
**Original Source**: Python tkinter application
**Target Language**: Go 1.21+

## Project Structure

```
.
├── cmd/
│   └── calculator/        # Main application entrypoint
│       └── main.go
├── internal/
│   ├── validation/        # Input validation and type casting
│   │   ├── validation.go
│   │   └── validation_test.go
│   ├── calculator/        # Arithmetic operations
│   │   └── doc.go
│   └── httpapi/          # HTTP handlers and routing
│       └── doc.go
├── static/               # Static assets (HTML, CSS, JS)
├── go.mod               # Go module definition
└── README.md            # This file
```

## Prerequisites

- **Go 1.21 or higher** - Download from [https://go.dev/dl/](https://go.dev/dl/)
- A web browser for accessing the calculator UI

## Installation

1. Clone or download this repository

2. Install dependencies:
   ```bash
   go mod download
   ```

3. Verify the installation:
   ```bash
   go version
   ```

## Building the Application

To build the application:

```bash
go build ./...
```

To build the main executable:

```bash
go build -o calculator ./cmd/calculator
```

## Running the Application

To run the application directly:

```bash
go run cmd/calculator/main.go
```

Once started, open your web browser and navigate to:
```
http://localhost:8080
```

## Testing

Run all tests:

```bash
go test ./...
```

Run tests with verbose output:

```bash
go test -v ./...
```

Run tests with coverage:

```bash
go test -cover ./...
```

## Features

- **Input Validation**: Supports various numeric formats including:
  - Integers: `123`, `-123`, `+123`
  - Floats: `123.456`, `0.123`, `-0.123`
  - Leading decimals: `.123`, `-.123`, `+.123`

- **Arithmetic Operations**:
  - Addition (Summation)
  - Subtraction
  - Multiplication
  - Division

- **Web Interface**: Browser-based UI replacing the original tkinter GUI

- **REST API**: HTTP endpoints for programmatic access to calculator functions

## Development

### Code Organization

- **`internal/validation`**: Handles input validation and number parsing, preserving the behavior of the Python `is_number()` and `casting()` functions
- **`internal/calculator`**: Implements arithmetic operations
- **`internal/httpapi`**: Provides HTTP handlers and request/response models
- **`cmd/calculator`**: Application entrypoint and server initialization

### Design Decisions

This migration follows Go best practices while maintaining behavioral compatibility with the original Python implementation:

1. **Module Structure**: Uses Go modules with internal packages for encapsulation
2. **Web Architecture**: Transforms desktop GUI to web application with HTTP API
3. **Validation**: Preserves exact validation rules from Python, including support for edge cases like space-prefixed numbers
4. **Testing**: Comprehensive test coverage with behavioral parity verification

## License

Original work by Pranta Sarker, Department of Computer Science and Engineering, North East University Bangladesh.

## Acknowledgements

- Original Python implementation by Pranta Sarker
- Go community for excellent tools and libraries
- Stack Overflow and related technical resources
