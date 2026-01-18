package main

import (
	"simple-calculator/ui"

	"fyne.io/fyne/v2/app"
)

// main is the application entry point.
// Initializes the Fyne app and displays the main calculator window.
// Migrated from Python lines 178-206 (root initialization and mainloop).
func main() {
	// Create Fyne application
	a := app.New()

	// Create and configure main window
	w := ui.NewMainWindow(a)

	// Show window and run event loop (equivalent to root.mainloop() in Python)
	w.ShowAndRun()
}
