package validation

import (
	"math"
	"testing"
)

// Test cases in this file have been validated against the actual Python is_number() function
// from the source code (Simple Calculator by Python.py, lines 19-34) to ensure exact behavioral parity.
// Key findings from Python validation:
//   - Simple integers: "123", "-123", "+123" → valid
//   - Unsigned floats: "123.456", "0.123" → valid
//   - Signed floats with leading zero: "-0.123", "+0.123" → valid
//   - Leading decimals: ".123", "-.123", "+.123" → valid
//   - Space-prefixed: " 123", " .123", " 0.123" → valid
//   - Signed floats WITHOUT leading zero: "-123.456", "+123.456" → INVALID (Python limitation)
// These test cases mirror the Python behavior exactly.

// TestIsValidNumber_ValidIntegers tests validation of valid integer formats
func TestIsValidNumber_ValidIntegers(t *testing.T) {
	testCases := []string{
		"123",
		"-123",
		"+123",
		"0",
		"1",
		"999999",
	}

	for _, tc := range testCases {
		t.Run(tc, func(t *testing.T) {
			if !IsValidNumber(tc) {
				t.Errorf("IsValidNumber(%q) = false, want true", tc)
			}
		})
	}
}

// TestIsValidNumber_ValidFloats tests validation of valid float formats
func TestIsValidNumber_ValidFloats(t *testing.T) {
	testCases := []string{
		"123.456",
		"0.123",
		"-0.123",
		"+0.123",
		"123.0",
		"0.0",
	}

	for _, tc := range testCases {
		t.Run(tc, func(t *testing.T) {
			if !IsValidNumber(tc) {
				t.Errorf("IsValidNumber(%q) = false, want true", tc)
			}
		})
	}
}

// TestIsValidNumber_LeadingDecimal tests validation of leading decimal notation
func TestIsValidNumber_LeadingDecimal(t *testing.T) {
	testCases := []string{
		".123",
		"-.123",
		"+.123",
		".0",
		".999",
	}

	for _, tc := range testCases {
		t.Run(tc, func(t *testing.T) {
			if !IsValidNumber(tc) {
				t.Errorf("IsValidNumber(%q) = false, want true", tc)
			}
		})
	}
}

// TestIsValidNumber_SpacePrefixed tests validation of space-prefixed numeric strings
// The Python source code checks s[0] in ['-', '+', '.', '0', ' '], allowing space-prefixed numbers
func TestIsValidNumber_SpacePrefixed(t *testing.T) {
	testCases := []string{
		" 123",   // space then integer
		" .123",  // space then leading decimal
		" 0.123", // space then zero decimal
	}

	for _, tc := range testCases {
		t.Run(tc, func(t *testing.T) {
			if !IsValidNumber(tc) {
				t.Errorf("IsValidNumber(%q) = false, want true", tc)
			}
		})
	}
}

// TestIsValidNumber_Invalid tests rejection of invalid formats
func TestIsValidNumber_Invalid(t *testing.T) {
	testCases := []string{
		"",         // empty string
		" ",        // single space
		"abc",      // non-numeric
		"12a34",    // mixed
		"12.34.56", // multiple decimals
		"--123",    // double negative
		"++123",    // double positive
		"+-123",    // mixed signs
		".",        // just decimal point
		"-",        // just minus sign
		"+",        // just plus sign
		"12 34",    // space in middle
		"12.34a",   // letter at end
		"a12.34",   // letter at start
		"-123.456", // signed float (not supported by Python is_number)
		"+123.456", // signed float (not supported by Python is_number)
	}

	for _, tc := range testCases {
		t.Run(tc, func(t *testing.T) {
			if IsValidNumber(tc) {
				t.Errorf("IsValidNumber(%q) = true, want false", tc)
			}
		})
	}
}

// TestParseNumber_Integers tests parsing of integer formats
func TestParseNumber_Integers(t *testing.T) {
	testCases := []struct {
		input       string
		expectedVal float64
		expectedInt bool
	}{
		{"123", 123.0, true},
		{"-123", -123.0, true},
		{"+123", 123.0, true},
		{"0", 0.0, true},
	}

	for _, tc := range testCases {
		t.Run(tc.input, func(t *testing.T) {
			val, isInt, err := ParseNumber(tc.input)
			if err != nil {
				t.Fatalf("ParseNumber(%q) returned error: %v", tc.input, err)
			}
			if val != tc.expectedVal {
				t.Errorf("ParseNumber(%q) value = %v, want %v", tc.input, val, tc.expectedVal)
			}
			if isInt != tc.expectedInt {
				t.Errorf("ParseNumber(%q) isInt = %v, want %v", tc.input, isInt, tc.expectedInt)
			}
		})
	}
}

// TestParseNumber_Floats tests parsing of float formats
func TestParseNumber_Floats(t *testing.T) {
	testCases := []struct {
		input       string
		expectedVal float64
		expectedInt bool
	}{
		{"123.456", 123.456, false},
		{"0.123", 0.123, false},
		{"-0.123", -0.123, false},
		{"+0.123", 0.123, false},
		{".123", 0.123, false},
		{"-.123", -0.123, false},
		{"+.123", 0.123, false},
		{"123.0", 123.0, false},
	}

	for _, tc := range testCases {
		t.Run(tc.input, func(t *testing.T) {
			val, isInt, err := ParseNumber(tc.input)
			if err != nil {
				t.Fatalf("ParseNumber(%q) returned error: %v", tc.input, err)
			}
			if math.Abs(val-tc.expectedVal) > 0.0001 {
				t.Errorf("ParseNumber(%q) value = %v, want %v", tc.input, val, tc.expectedVal)
			}
			if isInt != tc.expectedInt {
				t.Errorf("ParseNumber(%q) isInt = %v, want %v", tc.input, isInt, tc.expectedInt)
			}
		})
	}
}

// TestParseNumber_InvalidInput tests error handling for invalid inputs
func TestParseNumber_InvalidInput(t *testing.T) {
	testCases := []string{
		"abc",
		"",
		"12.34.56",
		"not a number",
	}

	for _, tc := range testCases {
		t.Run(tc, func(t *testing.T) {
			_, _, err := ParseNumber(tc)
			if err == nil {
				t.Errorf("ParseNumber(%q) expected error, got nil", tc)
			}
		})
	}
}

// TestParseNumber_PreservesIntFloatDistinction verifies that the function
// preserves the distinction between integer and float notation
func TestParseNumber_PreservesIntFloatDistinction(t *testing.T) {
	// "123" should be marked as integer
	val1, isInt1, _ := ParseNumber("123")
	if !isInt1 {
		t.Errorf("ParseNumber(\"123\") should indicate integer format")
	}
	if val1 != 123.0 {
		t.Errorf("ParseNumber(\"123\") value = %v, want 123.0", val1)
	}

	// "123.0" should be marked as float
	val2, isInt2, _ := ParseNumber("123.0")
	if isInt2 {
		t.Errorf("ParseNumber(\"123.0\") should indicate float format")
	}
	if val2 != 123.0 {
		t.Errorf("ParseNumber(\"123.0\") value = %v, want 123.0", val2)
	}
}

// TestValidationWorkflow tests the complete validation and parsing workflow
func TestValidationWorkflow(t *testing.T) {
	testCases := []struct {
		input       string
		shouldValid bool
		expectedVal float64
		expectedInt bool
	}{
		{"123", true, 123.0, true},
		{"123.456", true, 123.456, false},
		{".123", true, 0.123, false},
		{"-.123", true, -0.123, false},
		{"", false, 0, false},
		{"abc", false, 0, false},
	}

	for _, tc := range testCases {
		t.Run(tc.input, func(t *testing.T) {
			// First validate
			isValid := IsValidNumber(tc.input)
			if isValid != tc.shouldValid {
				t.Errorf("IsValidNumber(%q) = %v, want %v", tc.input, isValid, tc.shouldValid)
			}

			// If should be valid, parse it
			if tc.shouldValid {
				val, isInt, err := ParseNumber(tc.input)
				if err != nil {
					t.Fatalf("ParseNumber(%q) returned error: %v", tc.input, err)
				}
				if math.Abs(val-tc.expectedVal) > 0.0001 {
					t.Errorf("ParseNumber(%q) value = %v, want %v", tc.input, val, tc.expectedVal)
				}
				if isInt != tc.expectedInt {
					t.Errorf("ParseNumber(%q) isInt = %v, want %v", tc.input, isInt, tc.expectedInt)
				}
			}
		})
	}
}

// TestValidateNumber tests the error-returning validation function
func TestValidateNumber(t *testing.T) {
	// Test valid inputs
	validInputs := []string{"123", "123.456", ".123", "-.123", "-0.123"}
	for _, input := range validInputs {
		t.Run("valid_"+input, func(t *testing.T) {
			err := ValidateNumber(input)
			if err != nil {
				t.Errorf("ValidateNumber(%q) returned error: %v, want nil", input, err)
			}
		})
	}

	// Test invalid inputs
	invalidInputs := []string{"", " ", "abc", "12.34.56"}
	for _, input := range invalidInputs {
		t.Run("invalid_"+input, func(t *testing.T) {
			err := ValidateNumber(input)
			if err == nil {
				t.Errorf("ValidateNumber(%q) returned nil, want error", input)
			}
			if err != nil && err.Error() != ValidationError {
				t.Errorf("ValidateNumber(%q) error = %q, want %q", input, err.Error(), ValidationError)
			}
		})
	}
}

// TestValidateAndParseNumber tests the convenience function
func TestValidateAndParseNumber(t *testing.T) {
	testCases := []struct {
		input       string
		shouldValid bool
		expectedVal float64
		expectedInt bool
	}{
		{"123", true, 123.0, true},
		{"123.456", true, 123.456, false},
		{".123", true, 0.123, false},
		{"-.123", true, -0.123, false},
		{"", false, 0, false},
		{"abc", false, 0, false},
	}

	for _, tc := range testCases {
		t.Run(tc.input, func(t *testing.T) {
			val, isInt, err := ValidateAndParseNumber(tc.input)

			if tc.shouldValid {
				if err != nil {
					t.Fatalf("ValidateAndParseNumber(%q) returned error: %v", tc.input, err)
				}
				if math.Abs(val-tc.expectedVal) > 0.0001 {
					t.Errorf("ValidateAndParseNumber(%q) value = %v, want %v", tc.input, val, tc.expectedVal)
				}
				if isInt != tc.expectedInt {
					t.Errorf("ValidateAndParseNumber(%q) isInt = %v, want %v", tc.input, isInt, tc.expectedInt)
				}
			} else {
				if err == nil {
					t.Errorf("ValidateAndParseNumber(%q) returned nil error, want validation error", tc.input)
				}
				if err != nil && err.Error() != ValidationError {
					t.Errorf("ValidateAndParseNumber(%q) error = %q, want %q", tc.input, err.Error(), ValidationError)
				}
			}
		})
	}
}
