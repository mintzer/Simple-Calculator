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
│   └── main.rs         # Main application code
└── README.md           # This file
```

## Technology Stack

- **Language**: Rust (edition 2021)
- **GUI Framework**: egui 0.20.0 (immediate mode GUI)
- **Application Framework**: eframe 0.20.0

## Implementation Status

### Task 3: GUI Framework and Application Structure ✓

This task establishes the complete GUI framework and application structure:

- ✓ GUI framework integrated (egui + eframe)
- ✓ Main window created (380x300, non-resizable)
- ✓ Input widgets implemented (two text entry fields)
- ✓ Display labels implemented (operation and result labels)
- ✓ Operation buttons implemented (+, -, *, /)
- ✓ Author button implemented
- ✓ Application state management working
- ✓ Event handling infrastructure in place
- ✓ Project builds and runs successfully

### Pending Tasks

The following functionality will be implemented in future tasks:

- **Task 1**: Number type definitions and basic types
- **Task 2**: Calculation logic (actual arithmetic operations)
- **Task 4**: Input validation and error handling
  - Integration of `is_number()` validation
  - Error dialogs for invalid input
  - Author information dialog
  - Division by zero handling

Currently, clicking operation buttons displays the operation name and shows "0" as a placeholder result. Actual calculations will be implemented in Task 4 when integrated with the calculation logic from Task 2 and validation from Task 1.

## Architecture

The application follows a simple immediate-mode GUI pattern:

- **CalculatorApp**: Main application struct holding state (inputs, operation, result, colors)
- **OperationColor**: Struct defining label and background colors for operations
- **Event Handling**: Button clicks update application state and trigger UI updates
- **UI Layout**: Vertical centered layout with horizontal spacing for button rows

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
| `messagebox.showinfo()` | Console output (placeholder for Task 4) |

## Development

### Code Quality

The code passes all Rust quality checks:

- ✓ Compiles without errors
- ✓ No clippy warnings
- ✓ Follows Rust naming conventions and idioms

### Testing

GUI components are verified through:
- Manual interaction testing
- Visual verification of layout and colors
- Event handler response testing

## License

Source: https://github.com/mintzer/Simple-Calculator.git

## Author

Original Python version by Pranta Sarker
- Institution: North East University Bangladesh
- Department: CSE
- Batch: 6th

Rust migration completed as part of a Python-to-Rust modernization project.
