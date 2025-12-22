// Package validation provides input validation and type casting for numeric values.
// It replicates the behavior of the Python is_number() and casting() functions
// from the original Simple Calculator application.
//
// The package supports various numeric formats including:
//   - Integers: "123", "-123", "+123"
//   - Floats: "123.456", "0.123", "-0.123", "+0.123"
//   - Leading decimals: ".123", "-.123", "+.123"
//   - Space-prefixed numbers: " 123", " .123", " 0.123"
//
// Key functions:
//   - IsValidNumber: Validates if a string represents a valid numeric value (returns bool)
//   - ValidateNumber: Validates and returns an error if invalid (error-returning interface)
//   - ParseNumber: Parses a validated string into a float64, preserving int/float distinction
//   - ValidateAndParseNumber: Convenience function that combines validation and parsing
package validation
