package ui

import (
	"image/color"
)

// Color constants extracted from Python GUI code
// These match the original tkinter color scheme for each operation

// Addition colors (line 48, 66 in Python)
var (
	AdditionForeground = color.NRGBA{R: 255, G: 0, B: 0, A: 255}       // red
	AdditionBackground = color.NRGBA{R: 158, G: 216, B: 238, A: 255}   // #9ed8ee (light blue)
)

// Subtraction colors (line 80, 100 in Python)
var (
	SubtractionForeground = color.NRGBA{R: 0, G: 128, B: 0, A: 255}    // green
	SubtractionBackground = color.NRGBA{R: 236, G: 231, B: 226, A: 255} // #ece7e2 (beige)
)

// Multiplication colors (line 114, 133 in Python)
var (
	MultiplicationForeground = color.NRGBA{R: 0, G: 0, B: 255, A: 255}    // blue
	MultiplicationBackground = color.NRGBA{R: 202, G: 203, B: 169, A: 255} // #cacba9 (olive)
)

// Division colors (line 150, 169 in Python)
var (
	DivisionForeground = color.NRGBA{R: 255, G: 255, B: 0, A: 255}    // yellow
	DivisionBackground = color.NRGBA{R: 141, G: 173, B: 150, A: 255}  // #8dad96 (sage green)
)

// Operation name labels
const (
	AdditionLabel       = "Summation"
	SubtractionLabel    = "Subtraction"
	MultiplicationLabel = "Multiplication"
	DivisionLabel       = "Division"
)

// Error message text (from line 73, 107, 140, 176 in Python)
const ErrorMessage = "Enter a Valid number\ne.g. 123, 0.123, .123, -0.123, 123.456"

// Author information (from line 16 in Python)
const AuthorInfo = "Pranta Sarker\nBatch: 6th\nDepartment: CSE\nNorth East University Bangladesh"
