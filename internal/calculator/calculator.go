package calculator

import "errors"

// Calculator performs basic arithmetic operations
type Calculator struct{}

// New creates a new Calculator instance
func New() *Calculator {
	return &Calculator{}
}

// Add performs addition of two float64 values
func (c *Calculator) Add(a, b float64) float64 {
	return a + b
}

// Subtract performs subtraction of two float64 values
func (c *Calculator) Subtract(a, b float64) float64 {
	return a - b
}

// Multiply performs multiplication of two float64 values
func (c *Calculator) Multiply(a, b float64) float64 {
	return a * b
}

// Divide performs division of two float64 values.
// Returns an error if the divisor (b) is zero.
func (c *Calculator) Divide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, errors.New("division by zero")
	}
	return a / b, nil
}
