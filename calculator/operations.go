package calculator

import "errors"

// Add performs addition of two numbers.
// Migrated from Python's actionPlus function (line 61: num1 + num2)
func Add(a, b float64) float64 {
	return a + b
}

// Subtract performs subtraction of two numbers.
// Migrated from Python's actionMinus function (line 95: num1 - num2)
func Subtract(a, b float64) float64 {
	return a - b
}

// Multiply performs multiplication of two numbers.
// Migrated from Python's actionMul function (line 128: num1 * num2)
func Multiply(a, b float64) float64 {
	return a * b
}

// Divide performs division of two numbers.
// Returns an error if the divisor is zero.
// Migrated from Python's actionDiv function (line 164: num1 / num2)
//
// Design Decision #5: Implementing explicit zero-check to return error
// rather than allowing Go's Inf behavior. This provides better UX than
// either Python's ZeroDivisionError or Go's default float division.
func Divide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, errors.New("division by zero")
	}
	return a / b, nil
}
