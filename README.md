# Simple Calculator - Rust Edition

A graphical calculator application built with Rust and egui, migrated from Python/Tkinter.

## Overview

This is a port of the original Python calculator to Rust, providing a native GUI calculator with the following operations:
- Addition (+)
- Subtraction (-)
- Multiplication (*)
- Division (/)

## Features

- Fixed-size non-resizable window (380x300 pixels)
- Two input fields for numeric entry
- Four operation buttons with visual feedback
- Color-coded operation display:
  - **Addition**: Red text on light blue background (#9ed8ee)
  - **Subtraction**: Green text on beige background (#ece7e2)
  - **Multiplication**: Blue text on olive background (#cacba9)
  - **Division**: Yellow text on sage green background (#8dad96)
- Author information button
- Native GUI using egui framework

## Prerequisites

- Rust 1.75.0 or later
- Cargo (Rust package manager)

## Building

To build the project:

```bash
cargo build
```

To build an optimized release version:

```bash
cargo build --release
```

## Running

To run the calculator:

```bash
cargo run
```

For the release version:

```bash
cargo run --release
```

## Project Structure

```
.
├── Cargo.toml          # Project dependencies and metadata
├── src/
│   ├── lib.rs          # Library exports for testing
│   ├── main.rs         # Main entry point
│   ├── app.rs          # GUI application and event handlers
│   ├── number.rs       # Number validation and parsing
│   └── calculator.rs   # Arithmetic operations
├── tests/
│   └── integration_test.rs  # Integration tests for calculation flows
└── README.md           # This file
```

## Technology Stack

- **Language**: Rust (edition 2021)
- **GUI Framework**: egui 0.20.0 (immediate mode GUI)
- **Application Framework**: eframe 0.20.0
- **Dialog System**: rfd 0.10.0 (native file dialogs)

## Implementation Status

### Task 1: Number Validation and Parsing ✓

- ✓ `is_number()` validation function implemented
  - Supports integers (123, -456)
  - Supports decimals (123.456, 0.123, .123)
  - Supports signed decimals (-0.123, +123.45, -.123, +.456)
- ✓ `parse_number()` parsing function implemented
- ✓ `format_number()` display formatting (integers without decimals, floats with decimals)
- ✓ Comprehensive unit tests for validation and parsing

### Task 2: Calculation Operations ✓

- ✓ `add()` function for addition
- ✓ `subtract()` function for subtraction
- ✓ `multiply()` function for multiplication
- ✓ `divide()` function with division-by-zero error handling
- ✓ Unit tests for all operations including edge cases

### Task 3: GUI Framework and Application Structure ✓

- ✓ GUI framework integrated (egui + eframe)
- ✓ Main window created (380x300, non-resizable)
- ✓ Input widgets implemented (two text entry fields)
- ✓ Display labels implemented (operation and result labels)
- ✓ Operation buttons implemented (+, -, *, /)
- ✓ Author button implemented
- ✓ Application state management working
- ✓ Event handling infrastructure in place
- ✓ Project builds and runs successfully

### Task 4: GUI Integration with Calculation Logic ✓

- ✓ Input reading from GUI fields
- ✓ Input validation integrated with button handlers
- ✓ Calculation operations called with validated inputs
- ✓ Results displayed in GUI with proper formatting
- ✓ Error dialogs for invalid input
- ✓ Division by zero error dialog
- ✓ Author information dialog
- ✓ Color schemes applied for each operation
- ✓ End-to-end functionality complete

**All tasks completed! The calculator is fully functional.**

## Architecture

The application follows a modular architecture with clear separation of concerns:

### Modules

- **number.rs**: Number validation and parsing
  - `is_number()`: Validates if a string is a valid number
  - `parse_number()`: Parses a validated string to f64
  - `format_number()`: Formats a number for display

- **calculator.rs**: Arithmetic operations
  - `add()`, `subtract()`, `multiply()`: Basic operations
  - `divide()`: Division with Result type for error handling

- **app.rs**: GUI application and event handling
  - `CalculatorApp`: Main application struct holding state
  - `Operation`: Enum for operation types
  - `OperationColor`: Color scheme definitions
  - Event handlers with validation and error dialogs

- **main.rs**: Application entry point

### Data Flow

1. User clicks operation button
2. Event handler reads input fields
3. Validation checks using `is_number()`
4. If invalid: show error dialog
5. If valid: parse with `parse_number()`
6. Perform calculation using calculator module
7. Format result with `format_number()`
8. Update GUI with operation name, color, and result

## Migration from Python

This Rust version replicates the behavior of the original Python/Tkinter calculator:

| Python/Tkinter | Rust/egui |
|----------------|-----------|
| `Tk()` window | `eframe::NativeOptions` with fixed size |
| `Entry` widgets | `egui::TextEdit::singleline()` |
| `Button` widgets | `egui::Button` |
| `Label` widgets | `egui::Label` |
| `.place()` positioning | `egui` spacing and layout functions |
| Color config (`fg`, `bg`) | `egui::Color32` for both text and background |
| `messagebox.showinfo()` | `rfd::MessageDialog` with native dialogs |
| `messagebox.showerror()` | `rfd::MessageDialog` with error level |
| `is_number()` function | Rust `is_number()` with same behavior |
| `casting()` function | `parse_number()` and `format_number()` |

## Development

### Code Quality

The code passes all Rust quality checks:

- ✓ Compiles without errors
- ✓ No clippy warnings
- ✓ Follows Rust naming conventions and idioms

### Testing

To run all tests:

```bash
cargo test
```

The project includes comprehensive tests:

**Unit Tests (13 tests):**
- Number validation (`is_number()` with 20+ test cases)
- Number parsing and formatting
- All arithmetic operations
- Division by zero error handling
- Edge cases (negative numbers, decimals, mixed inputs)

**Integration Tests (17 tests in `tests/integration_test.rs`):**
- Valid addition, subtraction, multiplication, and division flows
- Float division with proper formatting
- Mixed type operations (integer + decimal)
- Invalid input handling (abc, empty, malformed numbers)
- Division by zero error flow
- Negative results
- Signed input handling
- Integer vs decimal display formatting
- Large numbers and very small decimals

Test coverage:
- ✓ 30 total tests passing (13 unit + 17 integration)
- ✓ End-to-end calculation flows verified
- ✓ Input validation and error handling verified
- ✓ Result formatting verified

GUI components are verified through:
- Manual interaction testing
- Visual verification of layout and colors
- Error dialog behavior testing

## License

Source: https://github.com/mintzer/Simple-Calculator.git

## Author

Original Python version by Pranta Sarker
- Institution: North East University Bangladesh
- Department: CSE
- Batch: 6th

Rust migration completed as part of a Python-to-Rust modernization project.
