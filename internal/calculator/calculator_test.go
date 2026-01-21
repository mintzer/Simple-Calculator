package calculator

import (
	"math"
	"strings"
	"testing"
)

// floatEquals checks if two float64 values are approximately equal
// using a small epsilon for floating-point comparison
func floatEquals(a, b float64) bool {
	const epsilon = 1e-9
	return math.Abs(a-b) < epsilon
}

// TestCalculatorNew verifies that New() creates a non-nil Calculator instance
func TestCalculatorNew(t *testing.T) {
	calc := New()
	if calc == nil {
		t.Fatal("New() returned nil")
	}
}

// TestAdd verifies the addition operation
func TestAdd(t *testing.T) {
	calc := New()
	tests := []struct {
		name     string
		a, b     float64
		expected float64
	}{
		{"positive numbers", 5.0, 3.0, 8.0},
		{"negative numbers", -5.0, -3.0, -8.0},
		{"mixed signs", 5.0, -3.0, 2.0},
		{"with zero", 5.0, 0.0, 5.0},
		{"decimal numbers", 1.5, 2.5, 4.0},
		{"small decimals", 0.1, 0.2, 0.3},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result, err := calc.Add(tt.a, tt.b)
			if err != nil {
				t.Errorf("Add(%v, %v) unexpected error: %v", tt.a, tt.b, err)
			}
			if !floatEquals(result, tt.expected) {
				t.Errorf("Add(%v, %v) = %v; want %v", tt.a, tt.b, result, tt.expected)
			}
		})
	}
}

// TestSubtract verifies the subtraction operation
func TestSubtract(t *testing.T) {
	calc := New()
	tests := []struct {
		name     string
		a, b     float64
		expected float64
	}{
		{"positive numbers", 5.0, 3.0, 2.0},
		{"negative numbers", -5.0, -3.0, -2.0},
		{"mixed signs", 5.0, -3.0, 8.0},
		{"with zero", 5.0, 0.0, 5.0},
		{"decimal numbers", 5.5, 2.5, 3.0},
		{"result negative", 3.0, 5.0, -2.0},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result, err := calc.Subtract(tt.a, tt.b)
			if err != nil {
				t.Errorf("Subtract(%v, %v) unexpected error: %v", tt.a, tt.b, err)
			}
			if result != tt.expected {
				t.Errorf("Subtract(%v, %v) = %v; want %v", tt.a, tt.b, result, tt.expected)
			}
		})
	}
}

// TestMultiply verifies the multiplication operation
func TestMultiply(t *testing.T) {
	calc := New()
	tests := []struct {
		name     string
		a, b     float64
		expected float64
	}{
		{"positive numbers", 5.0, 3.0, 15.0},
		{"negative numbers", -5.0, -3.0, 15.0},
		{"mixed signs", 5.0, -3.0, -15.0},
		{"with zero", 5.0, 0.0, 0.0},
		{"with one", 5.0, 1.0, 5.0},
		{"decimal numbers", 2.5, 4.0, 10.0},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result, err := calc.Multiply(tt.a, tt.b)
			if err != nil {
				t.Errorf("Multiply(%v, %v) unexpected error: %v", tt.a, tt.b, err)
			}
			if result != tt.expected {
				t.Errorf("Multiply(%v, %v) = %v; want %v", tt.a, tt.b, result, tt.expected)
			}
		})
	}
}

// TestDivide verifies the division operation
func TestDivide(t *testing.T) {
	calc := New()
	tests := []struct {
		name        string
		a, b        float64
		expected    float64
		expectError bool
	}{
		{"positive numbers", 6.0, 3.0, 2.0, false},
		{"negative numbers", -6.0, -3.0, 2.0, false},
		{"mixed signs", 6.0, -3.0, -2.0, false},
		{"divide by one", 5.0, 1.0, 5.0, false},
		{"decimal result", 5.0, 2.0, 2.5, false},
		{"divide by zero", 5.0, 0.0, 0.0, true},
		{"zero divided by number", 0.0, 5.0, 0.0, false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result, err := calc.Divide(tt.a, tt.b)
			if tt.expectError {
				if err == nil {
					t.Errorf("Divide(%v, %v) expected error but got none", tt.a, tt.b)
				}
			} else {
				if err != nil {
					t.Errorf("Divide(%v, %v) unexpected error: %v", tt.a, tt.b, err)
				}
				if result != tt.expected {
					t.Errorf("Divide(%v, %v) = %v; want %v", tt.a, tt.b, result, tt.expected)
				}
			}
		})
	}
}

// TestParseNumber verifies the input validation and parsing
func TestParseNumber(t *testing.T) {
	tests := []struct {
		name        string
		input       string
		expected    float64
		expectError bool
	}{
		// Valid formats
		{"integer", "123", 123.0, false},
		{"zero", "0", 0.0, false},
		{"float with leading zero", "0.123", 0.123, false},
		{"float without leading zero", ".123", 0.123, false},
		{"negative float", "-0.123", -0.123, false},
		{"float with integer", "123.456", 123.456, false},
		{"negative integer", "-123", -123.0, false},
		{"positive sign", "+123", 123.0, false},
		{"with leading whitespace", "  123", 123.0, false},
		{"with trailing whitespace", "123  ", 123.0, false},
		{"with both whitespace", "  123  ", 123.0, false},
		{"large number", "999999", 999999.0, false},
		{"small decimal", "0.001", 0.001, false},

		// Invalid formats
		{"empty string", "", 0.0, true},
		{"whitespace only", "   ", 0.0, true},
		{"alphabetic", "abc", 0.0, true},
		{"mixed alphanumeric", "123abc", 0.0, true},
		{"mixed alphanumeric prefix", "abc123", 0.0, true},
		{"double negative", "--1", 0.0, true},
		{"just a dot", ".", 0.0, true},
		{"multiple dots", "1.2.3", 0.0, true},
		{"invalid symbols", "12$3", 0.0, true},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result, err := ParseNumber(tt.input)
			if tt.expectError {
				if err == nil {
					t.Errorf("ParseNumber(%q) expected error but got none", tt.input)
				}
				// Verify error message format
				expectedMsg := "Enter a Valid number\ne.g. 123, 0.123, .123, -0.123, 123.456"
				if err.Error() != expectedMsg {
					t.Errorf("ParseNumber(%q) error message = %q; want %q", tt.input, err.Error(), expectedMsg)
				}
			} else {
				if err != nil {
					t.Errorf("ParseNumber(%q) unexpected error: %v", tt.input, err)
				}
				if result != tt.expected {
					t.Errorf("ParseNumber(%q) = %v; want %v", tt.input, result, tt.expected)
				}
			}
		})
	}
}

// TestFormatResult verifies the result formatting
func TestFormatResult(t *testing.T) {
	tests := []struct {
		name     string
		input    float64
		expected string
	}{
		{"integer zero", 0.0, "0"},
		{"positive integer", 5.0, "5"},
		{"negative integer", -5.0, "-5"},
		{"large integer", 999999.0, "999999"},
		{"small decimal", 5.5, "5.5"},
		{"negative decimal", -5.5, "-5.5"},
		{"very small decimal", 0.123, "0.123"},
		{"decimal that looks like int", 10.0, "10"},
		{"three decimal places", 123.456, "123.456"},
		{"negative with decimals", -123.456, "-123.456"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := FormatResult(tt.input)
			if result != tt.expected {
				t.Errorf("FormatResult(%v) = %q; want %q", tt.input, result, tt.expected)
			}
		})
	}
}

// TestFormatResultWithCalculations verifies formatting after calculations
func TestFormatResultWithCalculations(t *testing.T) {
	calc := New()

	// Test that integer results are formatted without decimals
	result, _ := calc.Add(2.0, 3.0)
	formatted := FormatResult(result)
	if formatted != "5" {
		t.Errorf("Add result formatted as %q; want \"5\"", formatted)
	}

	// Test that decimal results preserve decimals
	result, _ = calc.Divide(5.0, 2.0)
	formatted = FormatResult(result)
	if formatted != "2.5" {
		t.Errorf("Divide result formatted as %q; want \"2.5\"", formatted)
	}
}

// TestParseNumberEdgeCases tests additional edge cases
func TestParseNumberEdgeCases(t *testing.T) {
	tests := []struct {
		input       string
		expectError bool
	}{
		{"0.0", false},
		{"-0.0", false},
		{"+0.0", false},
		{"00123", false},    // Leading zeros are valid
		{"123.000", false},  // Trailing zeros are valid
		{".5", false},       // Decimal without leading zero
		{"-.5", false},      // Negative decimal without leading zero
		{"+.5", false},      // Positive decimal without leading zero
	}

	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			_, err := ParseNumber(tt.input)
			if tt.expectError && err == nil {
				t.Errorf("ParseNumber(%q) expected error but got none", tt.input)
			}
			if !tt.expectError && err != nil {
				t.Errorf("ParseNumber(%q) unexpected error: %v", tt.input, err)
			}
		})
	}
}

// TestDivisionByZeroErrorMessage verifies the division by zero error message
func TestDivisionByZeroErrorMessage(t *testing.T) {
	calc := New()
	_, err := calc.Divide(5.0, 0.0)
	if err == nil {
		t.Fatal("Divide by zero should return an error")
	}
	if !strings.Contains(err.Error(), "division by zero") {
		t.Errorf("Error message should mention division by zero, got: %v", err.Error())
	}
}
