package ui

import (
	"image/color"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/canvas"
	"fyne.io/fyne/v2/dialog"
	"fyne.io/fyne/v2/widget"

	"simple-calculator/internal/calculator"
)

// makeOperationHandler creates a generic event handler for calculator operations.
// It accepts an operation function as a parameter, making it reusable for all arithmetic operations.
//
// Parameters:
//   - w: The parent window for displaying error dialogs
//   - calc: The Calculator instance to perform operations
//   - operation: The arithmetic operation function that may return an error (e.g., division by zero)
//   - aEntry, bEntry: Input entry widgets containing the operand values
//   - resultLabel: Label widget to display the computed result
//   - opLabel: Label widget to display the operation name
//   - opName: Human-readable operation name (e.g., "Summation", "Subtraction")
//   - opColor: Background color for the operation label
//
// Returns a closure that performs input validation, computation, and UI updates.
func makeOperationHandler(
	w fyne.Window,
	calc *calculator.Calculator,
	operation func(float64, float64) (float64, error),
	aEntry, bEntry *widget.Entry,
	resultLabel *widget.Label,
	opLabel *canvas.Text,
	opName string,
	opColor color.Color,
) func() {
	return func() {
		// Parse first operand
		a, err := calculator.ParseNumber(aEntry.Text)
		if err != nil {
			dialog.ShowError(err, w)
			return
		}

		// Parse second operand
		b, err := calculator.ParseNumber(bEntry.Text)
		if err != nil {
			dialog.ShowError(err, w)
			return
		}

		// Perform the operation
		result, err := operation(a, b)
		if err != nil {
			dialog.ShowError(err, w)
			return
		}

		// Update operation label with name and color
		opLabel.Text = opName
		opLabel.Color = opColor
		opLabel.Refresh()

		// Update result label with formatted result
		resultLabel.SetText(calculator.FormatResult(result))
	}
}
