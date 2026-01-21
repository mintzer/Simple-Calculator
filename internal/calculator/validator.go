package calculator

import (
	"errors"
	"strconv"
	"strings"
)

// ParseNumber validates and parses a string input to float64.
// It trims whitespace before validation and returns a user-facing error
// message for invalid inputs.
//
// Valid formats include:
//   - Integers: "123", "0"
//   - Floats: "0.123", ".123", "-0.123", "123.456"
//
// Returns an error for empty strings, alphabetic characters, or malformed numbers.
func ParseNumber(input string) (float64, error) {
	trimmed := strings.TrimSpace(input)
	if trimmed == "" {
		return 0, errors.New("Enter a Valid number\ne.g. 123, 0.123, .123, -0.123, 123.456")
	}

	value, err := strconv.ParseFloat(trimmed, 64)
	if err != nil {
		return 0, errors.New("Enter a Valid number\ne.g. 123, 0.123, .123, -0.123, 123.456")
	}

	return value, nil
}
