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
