package calculator

import (
	"errors"
	"strconv"
	"strings"
)

// ParseNumber parses a string input into a float64, matching Python's is_number() behavior.
// Accepts: integers ("1", "42"), floats ("3.14", "-7.5"), signed numbers ("+10", "-10"),
// and leading decimals (".5", "-.75").
//
// Design Decision #1: Using Go's strconv.ParseFloat with pre-processing to handle
// the formats accepted by Python's is_number() function. This balances simplicity
// with acceptable behavioral parity.
func ParseNumber(input string) (float64, error) {
	// Trim whitespace
	s := strings.TrimSpace(input)

	// Empty string is invalid
	if s == "" {
		return 0, errors.New("empty input")
	}

	// Handle the case where input is just whitespace (Python rejects ' ')
	if input == " " {
		return 0, errors.New("whitespace-only input")
	}

	// Use strconv.ParseFloat which handles:
	// - Integers: "1", "42", "0"
	// - Floats: "3.14", "-7.5", "+2.0"
	// - Leading decimals: ".5", "-.75", "+.5"
	// - Signed numbers: "+10", "-10"
	result, err := strconv.ParseFloat(s, 64)
	if err != nil {
		return 0, errors.New("invalid number format")
	}

	return result, nil
}
