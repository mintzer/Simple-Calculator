package validation

import (
	"errors"
	"strconv"
	"strings"
)

// IsValidNumber checks whether the input string represents a valid number.
// It replicates the behavior of the Python is_number() function from the source code.
// Valid formats include:
//   - Integers: "123", "-123", "+123"
//   - Floats: "123.456", "0.123", "-0.123", "+0.123"
//   - Leading decimal: ".123", "-.123", "+.123"
//
// Returns true if the string is a valid number, false otherwise.
func IsValidNumber(s string) bool {
	// Python: if(s != ''):
	if s == "" {
		return false
	}

	// Python: if (s.replace('.', '', 1).isdigit()):
	// This handles cases like "123.456", "123", ".123" (but not "-.123")
	withoutOneDot := strings.Replace(s, ".", "", 1)
	if isDigits(withoutOneDot) {
		return true
	}

	// Python: if (s.isdigit()):
	// This handles simple integers like "123"
	if isDigits(s) {
		return true
	}

	// Python: if s[0] in ['-', '+', '.', '0', ' ']:
	// This handles signed numbers and special cases
	if len(s) > 0 && (s[0] == '-' || s[0] == '+' || s[0] == '.' || s[0] == '0' || s[0] == ' ') {
		if len(s) > 1 {
			// Python: if (s[1] == '.'):
			//     if (s[2:].isdigit()):
			//         return True
			if s[1] == '.' {
				if len(s) > 2 && isDigits(s[2:]) {
					return true
				}
			}

			// Python: if (s[1] == '0' and s[2] == '.'):
			//     if (s[3:].isdigit()):
			//         return True
			if len(s) > 2 && s[1] == '0' && s[2] == '.' {
				if len(s) > 3 && isDigits(s[3:]) {
					return true
				}
			}

			// Python: if s[1:].isdigit():
			//     return True
			if isDigits(s[1:]) {
				return true
			}
		}
	}

	// Python: return False
	return false
}

// isDigits checks if a string contains only digit characters
func isDigits(s string) bool {
	if s == "" {
		return false
	}
	for _, c := range s {
		if c < '0' || c > '9' {
			return false
		}
	}
	return true
}

// ParseNumber parses a valid numeric string and returns it as a float64.
// The type parameter indicates whether the original format was an integer (no decimal point)
// or a float (has decimal point), preserving the Python casting() behavior.
//
// IMPORTANT: This function should only be called with strings that have been validated
// by IsValidNumber(). While ParseFloat can parse formats like "-123.456", the Python
// source does not support this format (is_number("-123.456") returns false), so callers
// must validate first to maintain behavioral parity with the Python implementation.
//
// Returns the parsed value, a boolean indicating if it's an integer (vs float), and an error.
func ParseNumber(s string) (float64, bool, error) {
	// Check if it has a decimal point to determine type
	hasDecimal := strings.Contains(s, ".")

	// Parse as float64
	val, err := strconv.ParseFloat(s, 64)
	if err != nil {
		return 0, false, err
	}

	// Return value and whether it was an integer format
	return val, !hasDecimal, nil
}

// ValidationError is the standard error message for invalid number inputs.
// This matches the exact error message from the Python source code (line 73).
const ValidationError = "Enter a Valid number\ne.g. 123, 0.123, .123, -0.123, 123.456"

// ValidateNumber validates a numeric string and returns an error if invalid.
// This provides an error-returning interface that matches the task specification.
// Returns nil if the input is valid, or an error with the standard validation message if invalid.
func ValidateNumber(s string) error {
	if !IsValidNumber(s) {
		return errors.New(ValidationError)
	}
	return nil
}

// ValidateAndParseNumber is a convenience function that validates and parses a numeric string.
// It combines ValidateNumber and ParseNumber into a single operation.
// Returns the parsed value, whether it's an integer format, and an error if validation or parsing fails.
func ValidateAndParseNumber(s string) (float64, bool, error) {
	if err := ValidateNumber(s); err != nil {
		return 0, false, err
	}
	return ParseNumber(s)
}
