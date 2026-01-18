package ui

import (
	"fmt"
	"simple-calculator/calculator"

	"fyne.io/fyne/v2/dialog"
)

// handleAddition implements the Addition button click handler.
// Migrated from Python's actionPlus function (lines 44-73).
//
// Design Decision #4: Implements the two-phase display pattern from Python:
// 1. Show operation name + "0" immediately
// 2. Update with actual result after validation and computation
//
// Design Decision #2: Using fmt.Sprint for float formatting, which produces
// output similar to Python's str() for typical number ranges. For example,
// integers display without decimal points (e.g., "8" not "8.0") when the
// result is a whole number represented as a float.
func handleAddition(ui *UIComponents) {
	// Phase 1: Show operation name and initial "0" (lines 45-53 in Python)
	ui.OperationBg.FillColor = AdditionBackground
	ui.OperationLabel.Color = AdditionForeground
	ui.OperationLabel.Text = AdditionLabel
	ui.OperationBg.Refresh()
	ui.OperationLabel.Refresh()

	ui.ResultBg.FillColor = AdditionBackground
	ui.ResultLabel.Color = AdditionForeground
	ui.ResultLabel.Text = "0"
	ui.ResultBg.Refresh()
	ui.ResultLabel.Refresh()

	// Get input values (lines 55-56 in Python)
	input1 := ui.Input1.Text
	input2 := ui.Input2.Text

	// Validate inputs (line 58 in Python)
	num1, err1 := calculator.ParseNumber(input1)
	num2, err2 := calculator.ParseNumber(input2)

	if err1 != nil || err2 != nil {
		// Show error dialog (line 73 in Python)
		dialog.ShowError(fmt.Errorf(ErrorMessage), ui.Window)
		return
	}

	// Phase 2: Compute and display actual result (lines 59-71 in Python)
	result := calculator.Add(num1, num2)

	// Format result - using Sprint which handles integers cleanly
	resultStr := formatResult(result)

	// Update display with actual result
	ui.OperationBg.FillColor = AdditionBackground
	ui.OperationLabel.Color = AdditionForeground
	ui.OperationLabel.Text = AdditionLabel
	ui.OperationBg.Refresh()
	ui.OperationLabel.Refresh()

	ui.ResultBg.FillColor = AdditionBackground
	ui.ResultLabel.Color = AdditionForeground
	ui.ResultLabel.Text = resultStr
	ui.ResultBg.Refresh()
	ui.ResultLabel.Refresh()
}

// handleSubtraction implements the Subtraction button click handler.
// Migrated from Python's actionMinus function (lines 76-107).
//
// Design Decision #4: Implements the two-phase display pattern from Python:
// 1. Show operation name + "0" immediately
// 2. Update with actual result after validation and computation
func handleSubtraction(ui *UIComponents) {
	// Phase 1: Show operation name and initial "0" (lines 77-87 in Python)
	ui.OperationBg.FillColor = SubtractionBackground
	ui.OperationLabel.Color = SubtractionForeground
	ui.OperationLabel.Text = SubtractionLabel
	ui.OperationBg.Refresh()
	ui.OperationLabel.Refresh()

	ui.ResultBg.FillColor = SubtractionBackground
	ui.ResultLabel.Color = SubtractionForeground
	ui.ResultLabel.Text = "0"
	ui.ResultBg.Refresh()
	ui.ResultLabel.Refresh()

	// Get input values (lines 89-90 in Python)
	input1 := ui.Input1.Text
	input2 := ui.Input2.Text

	// Validate inputs (line 92 in Python)
	num1, err1 := calculator.ParseNumber(input1)
	num2, err2 := calculator.ParseNumber(input2)

	if err1 != nil || err2 != nil {
		// Show error dialog (line 107 in Python)
		dialog.ShowError(fmt.Errorf(ErrorMessage), ui.Window)
		return
	}

	// Phase 2: Compute and display actual result (lines 93-105 in Python)
	result := calculator.Subtract(num1, num2)

	// Format result
	resultStr := formatResult(result)

	// Update display with actual result
	ui.OperationBg.FillColor = SubtractionBackground
	ui.OperationLabel.Color = SubtractionForeground
	ui.OperationLabel.Text = SubtractionLabel
	ui.OperationBg.Refresh()
	ui.OperationLabel.Refresh()

	ui.ResultBg.FillColor = SubtractionBackground
	ui.ResultLabel.Color = SubtractionForeground
	ui.ResultLabel.Text = resultStr
	ui.ResultBg.Refresh()
	ui.ResultLabel.Refresh()
}

// handleMultiplication implements the Multiplication button click handler.
// Migrated from Python's actionMul function (lines 110-140).
//
// Design Decision #4: Implements the two-phase display pattern from Python:
// 1. Show operation name + "0" immediately
// 2. Update with actual result after validation and computation
func handleMultiplication(ui *UIComponents) {
	// Phase 1: Show operation name and initial "0" (lines 111-121 in Python)
	ui.OperationBg.FillColor = MultiplicationBackground
	ui.OperationLabel.Color = MultiplicationForeground
	ui.OperationLabel.Text = MultiplicationLabel
	ui.OperationBg.Refresh()
	ui.OperationLabel.Refresh()

	ui.ResultBg.FillColor = MultiplicationBackground
	ui.ResultLabel.Color = MultiplicationForeground
	ui.ResultLabel.Text = "0"
	ui.ResultBg.Refresh()
	ui.ResultLabel.Refresh()

	// Get input values (lines 123-124 in Python)
	input1 := ui.Input1.Text
	input2 := ui.Input2.Text

	// Validate inputs (line 125 in Python)
	num1, err1 := calculator.ParseNumber(input1)
	num2, err2 := calculator.ParseNumber(input2)

	if err1 != nil || err2 != nil {
		// Show error dialog (line 140 in Python)
		dialog.ShowError(fmt.Errorf(ErrorMessage), ui.Window)
		return
	}

	// Phase 2: Compute and display actual result (lines 126-138 in Python)
	result := calculator.Multiply(num1, num2)

	// Format result
	resultStr := formatResult(result)

	// Update display with actual result
	ui.OperationBg.FillColor = MultiplicationBackground
	ui.OperationLabel.Color = MultiplicationForeground
	ui.OperationLabel.Text = MultiplicationLabel
	ui.OperationBg.Refresh()
	ui.OperationLabel.Refresh()

	ui.ResultBg.FillColor = MultiplicationBackground
	ui.ResultLabel.Color = MultiplicationForeground
	ui.ResultLabel.Text = resultStr
	ui.ResultBg.Refresh()
	ui.ResultLabel.Refresh()
}

// handleDivision implements the Division button click handler.
// Migrated from Python's actionDiv function (lines 143-176).
//
// Design Decision #4: Implements the two-phase display pattern from Python:
// 1. Show operation name + "0" immediately
// 2. Update with actual result after validation and computation
//
// Design Decision #5: Explicit divide-by-zero check with user-friendly error dialog.
func handleDivision(ui *UIComponents) {
	// Phase 1: Show operation name and initial "0" (lines 144-157 in Python)
	ui.OperationBg.FillColor = DivisionBackground
	ui.OperationLabel.Color = DivisionForeground
	ui.OperationLabel.Text = DivisionLabel
	ui.OperationBg.Refresh()
	ui.OperationLabel.Refresh()

	ui.ResultBg.FillColor = DivisionBackground
	ui.ResultLabel.Color = DivisionForeground
	ui.ResultLabel.Text = "0"
	ui.ResultBg.Refresh()
	ui.ResultLabel.Refresh()

	// Get input values (lines 159-160 in Python)
	input1 := ui.Input1.Text
	input2 := ui.Input2.Text

	// Validate inputs (line 161 in Python)
	num1, err1 := calculator.ParseNumber(input1)
	num2, err2 := calculator.ParseNumber(input2)

	if err1 != nil || err2 != nil {
		// Show error dialog (line 175 in Python)
		dialog.ShowError(fmt.Errorf(ErrorMessage), ui.Window)
		return
	}

	// Phase 2: Compute and display actual result (lines 162-174 in Python)
	result, err := calculator.Divide(num1, num2)
	if err != nil {
		// Handle division by zero error
		dialog.ShowError(fmt.Errorf("Cannot divide by zero"), ui.Window)
		return
	}

	// Format result
	resultStr := formatResult(result)

	// Update display with actual result
	ui.OperationBg.FillColor = DivisionBackground
	ui.OperationLabel.Color = DivisionForeground
	ui.OperationLabel.Text = DivisionLabel
	ui.OperationBg.Refresh()
	ui.OperationLabel.Refresh()

	ui.ResultBg.FillColor = DivisionBackground
	ui.ResultLabel.Color = DivisionForeground
	ui.ResultLabel.Text = resultStr
	ui.ResultBg.Refresh()
	ui.ResultLabel.Refresh()
}

// handleAuthor implements the Author button click handler.
// Migrated from Python's actionauthor function (lines 15-16).
func handleAuthor(ui *UIComponents) {
	dialog.ShowInformation("Author", AuthorInfo, ui.Window)
}

// formatResult formats a float64 result for display, attempting to match
// Python's str() behavior for typical calculator usage.
//
// Design Decision #2 resolution: Using fmt.Sprint which naturally produces
// output like "3" for 3.0, "3.14" for 3.14, etc., matching Python's str()
// behavior for most calculator use cases. For very large numbers, Go may
// use scientific notation, but this is acceptable for a basic calculator.
func formatResult(value float64) string {
	// Check if the value is effectively an integer
	if value == float64(int64(value)) {
		// Display as integer (e.g., "3" not "3.0")
		return fmt.Sprintf("%d", int64(value))
	}
	// Display as float, removing trailing zeros
	return fmt.Sprintf("%g", value)
}
