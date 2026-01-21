package ui

import (
	"image/color"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/canvas"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"

	"simple-calculator/internal/calculator"
)

// fyneMaxLayout is a custom layout that layers widgets on top of each other
// with all widgets sized to fill the container. This is used to create
// colored button backgrounds by layering a colored rectangle behind a button.
type fyneMaxLayout struct{}

func (l *fyneMaxLayout) Layout(objects []fyne.CanvasObject, size fyne.Size) {
	// Position all objects at (0,0) and resize to fill the container
	for _, obj := range objects {
		obj.Resize(size)
		obj.Move(fyne.NewPos(0, 0))
	}
}

func (l *fyneMaxLayout) MinSize(objects []fyne.CanvasObject) fyne.Size {
	// Return the minimum size needed to fit the largest object
	minSize := fyne.NewSize(0, 0)
	for _, obj := range objects {
		objSize := obj.MinSize()
		if objSize.Width > minSize.Width {
			minSize.Width = objSize.Width
		}
		if objSize.Height > minSize.Height {
			minSize.Height = objSize.Height
		}
	}
	return minSize
}

// parseHexColor converts a hex color string to color.Color
func parseHexColor(hex string) color.Color {
	var r, g, b uint8
	if len(hex) == 7 && hex[0] == '#' {
		// Parse #RRGGBB format
		var rgb uint32
		for i := 1; i < 7; i++ {
			rgb = rgb << 4
			c := hex[i]
			if c >= '0' && c <= '9' {
				rgb |= uint32(c - '0')
			} else if c >= 'a' && c <= 'f' {
				rgb |= uint32(c - 'a' + 10)
			} else if c >= 'A' && c <= 'F' {
				rgb |= uint32(c - 'A' + 10)
			}
		}
		r = uint8((rgb >> 16) & 0xFF)
		g = uint8((rgb >> 8) & 0xFF)
		b = uint8(rgb & 0xFF)
	}
	return color.RGBA{R: r, G: g, B: b, A: 255}
}

// BuildMainWindow constructs and configures the main calculator window.
// It creates all UI widgets, sets up the layout using Fyne containers,
// and wires the addition button to the calculator logic.
func BuildMainWindow(w fyne.Window) {
	// Create Calculator instance
	calc := calculator.New()

	// Create title label
	titleLabel := widget.NewLabel("Simple Calculator")
	titleLabel.TextStyle = fyne.TextStyle{Bold: true}

	// Create input labels and entry widgets
	label1 := widget.NewLabel("First Number:")
	entryA := widget.NewEntry()
	entryA.SetPlaceHolder("Enter first number")

	label2 := widget.NewLabel("Second Number:")
	entryB := widget.NewEntry()
	entryB.SetPlaceHolder("Enter second number")

	// Create operation label (displays operation type like "Summation")
	opText := canvas.NewText("", color.RGBA{R: 255, G: 0, B: 0, A: 255})
	opText.Alignment = fyne.TextAlignCenter
	opText.TextSize = 14
	opText.TextStyle = fyne.TextStyle{Bold: true}

	// Create result label (displays the computed result)
	resultLabel := widget.NewLabel("")
	resultLabel.Alignment = fyne.TextAlignCenter

	// Create operation buttons with styling
	addButton := widget.NewButton("+", nil)
	subButton := widget.NewButton("-", nil)
	mulButton := widget.NewButton("*", nil)
	divButton := widget.NewButton("/", nil)

	// Wire the addition button to the handler
	addButton.OnTapped = makeOperationHandler(
		w,
		calc,
		calc.Add,
		entryA,
		entryB,
		resultLabel,
		opText,
		"Summation",
		parseHexColor(ColorAddition),
	)

	// Create colored backgrounds for buttons
	// Note: Fyne v2.2.1 doesn't support container.NewStack, so we use MaxLayout
	// which layers widgets with the first being the background
	addBg := canvas.NewRectangle(parseHexColor(ColorAddition))
	subBg := canvas.NewRectangle(parseHexColor(ColorSubtraction))
	mulBg := canvas.NewRectangle(parseHexColor(ColorMultiplication))
	divBg := canvas.NewRectangle(parseHexColor(ColorDivision))

	// Create containers with colored backgrounds using MaxLayout for layering
	addWithBg := container.New(&fyneMaxLayout{}, addBg, addButton)
	subWithBg := container.New(&fyneMaxLayout{}, subBg, subButton)
	mulWithBg := container.New(&fyneMaxLayout{}, mulBg, mulButton)
	divWithBg := container.New(&fyneMaxLayout{}, divBg, divButton)

	// Build the layout using VBox with nested containers
	content := container.NewVBox(
		// Title at the top
		container.NewCenter(titleLabel),

		// Spacing
		widget.NewLabel(""),

		// First number input (grid: label, entry)
		container.NewGridWithColumns(2,
			label1,
			entryA,
		),

		// Second number input (grid: label, entry)
		container.NewGridWithColumns(2,
			label2,
			entryB,
		),

		// Spacing
		widget.NewLabel(""),

		// Operation buttons in a horizontal box with colored backgrounds
		container.NewHBox(
			addWithBg,
			subWithBg,
			mulWithBg,
			divWithBg,
		),

		// Spacing
		widget.NewLabel(""),

		// Operation label and result display
		container.NewVBox(
			container.NewCenter(opText),
			container.NewCenter(resultLabel),
		),
	)

	// Set window content and configure window properties
	w.SetContent(content)
	w.Resize(fyne.NewSize(WindowWidth, WindowHeight))
	w.SetFixedSize(true)
}
