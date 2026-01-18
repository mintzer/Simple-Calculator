package ui

import (
	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/canvas"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"
)

// UIComponents holds references to all UI widgets that need to be accessed by handlers
type UIComponents struct {
	Input1           *widget.Entry
	Input2           *widget.Entry
	OperationLabel   *canvas.Text
	ResultLabel      *canvas.Text
	OperationBg      *canvas.Rectangle
	ResultBg         *canvas.Rectangle
	Window           fyne.Window
}

// NewMainWindow creates and configures the main calculator window.
// Migrates the tkinter GUI setup from Python lines 178-206.
//
// Design Decision #3: Using nested Fyne containers (VBox, HBox, Grid) to approximate
// the original tkinter layout while respecting Fyne's design philosophy. The layout
// uses VBox for vertical stacking and centers elements for a similar visual appearance.
func NewMainWindow(app fyne.App) fyne.Window {
	w := app.NewWindow("My First Python Calculator")

	// Create UI components
	ui := &UIComponents{
		Window: w,
	}

	// Title label (line 181-182 in Python)
	titleLabel := widget.NewLabel("Python Calculator")
	titleLabel.TextStyle = fyne.TextStyle{Bold: true, Italic: false}
	titleLabel.Alignment = fyne.TextAlignCenter

	// Input fields (lines 185-188 in Python)
	ui.Input1 = widget.NewEntry()
	ui.Input1.SetPlaceHolder("Enter first number")

	ui.Input2 = widget.NewEntry()
	ui.Input2.SetPlaceHolder("Enter second number")

	// Operation buttons (lines 190-200 in Python)
	// All four buttons are created, but only + button is wired in Task 1
	plusButton := widget.NewButton("+", func() {
		handleAddition(ui)
	})

	minusButton := widget.NewButton("-", func() {
		// Placeholder - will be implemented in Task 2
	})

	mulButton := widget.NewButton("*", func() {
		// Placeholder - will be implemented in Task 2
	})

	divButton := widget.NewButton("/", func() {
		// Placeholder - will be implemented in Task 2
	})

	// Create button row
	buttonRow := container.NewGridWithColumns(4, plusButton, minusButton, mulButton, divButton)

	// Result display area (lines 183-184 in Python: Showlabel, Showtemplabel)
	// Using canvas elements for colored backgrounds
	ui.OperationBg = canvas.NewRectangle(AdditionBackground)
	ui.OperationBg.SetMinSize(fyne.NewSize(300, 30))

	ui.OperationLabel = canvas.NewText("", AdditionForeground)
	ui.OperationLabel.Alignment = fyne.TextAlignCenter
	ui.OperationLabel.TextSize = 14

	operationContainer := container.NewMax(ui.OperationBg, ui.OperationLabel)

	ui.ResultBg = canvas.NewRectangle(AdditionBackground)
	ui.ResultBg.SetMinSize(fyne.NewSize(300, 30))

	ui.ResultLabel = canvas.NewText("", AdditionForeground)
	ui.ResultLabel.Alignment = fyne.TextAlignCenter
	ui.ResultLabel.TextSize = 16
	ui.ResultLabel.TextStyle = fyne.TextStyle{Bold: true}

	resultContainer := container.NewMax(ui.ResultBg, ui.ResultLabel)

	// Author button (lines 202-203 in Python)
	authorButton := widget.NewButton("Author", func() {
		handleAuthor(ui)
	})

	// Compose the main layout using VBox for vertical stacking
	// This approximates the Python layout's visual grouping
	content := container.NewVBox(
		titleLabel,
		widget.NewLabel(""), // spacer
		ui.Input1,
		ui.Input2,
		widget.NewLabel(""), // spacer
		operationContainer,
		resultContainer,
		widget.NewLabel(""), // spacer
		buttonRow,
		widget.NewLabel(""), // spacer
		container.NewCenter(authorButton),
	)

	w.SetContent(content)

	// Window properties (lines 179-180, 205 in Python)
	w.Resize(fyne.NewSize(380, 350))
	w.SetFixedSize(true)

	// Store the UI components for use by handlers
	w.SetOnClosed(func() {
		// Cleanup if needed
	})

	// Store UI components in window's canvas user data for access by handlers
	// This is a workaround since handlers need access to UI elements
	w.Canvas().SetOnTypedKey(func(event *fyne.KeyEvent) {
		// Can be used for keyboard shortcuts if needed
	})

	return w
}
