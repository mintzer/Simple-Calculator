package calculator

import (
	"testing"
)

func TestParseNumber_ValidIntegers(t *testing.T) {
	tests := []struct {
		input    string
		expected float64
	}{
		{"1", 1.0},
		{"42", 42.0},
		{"0", 0.0},
		{"123", 123.0},
		{"-10", -10.0},
		{"+10", 10.0},
	}

	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			result, err := ParseNumber(tt.input)
			if err != nil {
				t.Errorf("ParseNumber(%q) returned error: %v", tt.input, err)
			}
			if result != tt.expected {
				t.Errorf("ParseNumber(%q) = %v, want %v", tt.input, result, tt.expected)
			}
		})
	}
}

func TestParseNumber_ValidFloats(t *testing.T) {
	tests := []struct {
		input    string
		expected float64
	}{
		{"3.14", 3.14},
		{"-7.5", -7.5},
		{"+2.0", 2.0},
		{"0.123", 0.123},
		{"123.456", 123.456},
		{"-0.123", -0.123},
	}

	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			result, err := ParseNumber(tt.input)
			if err != nil {
				t.Errorf("ParseNumber(%q) returned error: %v", tt.input, err)
			}
			if result != tt.expected {
				t.Errorf("ParseNumber(%q) = %v, want %v", tt.input, result, tt.expected)
			}
		})
	}
}

func TestParseNumber_LeadingDecimals(t *testing.T) {
	tests := []struct {
		input    string
		expected float64
	}{
		{".5", 0.5},
		{"-.75", -0.75},
		{"+.5", 0.5},
		{".123", 0.123},
	}

	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			result, err := ParseNumber(tt.input)
			if err != nil {
				t.Errorf("ParseNumber(%q) returned error: %v", tt.input, err)
			}
			if result != tt.expected {
				t.Errorf("ParseNumber(%q) = %v, want %v", tt.input, result, tt.expected)
			}
		})
	}
}

func TestParseNumber_Whitespace(t *testing.T) {
	tests := []struct {
		input    string
		expected float64
	}{
		{"  42  ", 42.0},
		{" 3.14 ", 3.14},
		{"\t10\t", 10.0},
	}

	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			result, err := ParseNumber(tt.input)
			if err != nil {
				t.Errorf("ParseNumber(%q) returned error: %v", tt.input, err)
			}
			if result != tt.expected {
				t.Errorf("ParseNumber(%q) = %v, want %v", tt.input, result, tt.expected)
			}
		})
	}
}

func TestParseNumber_InvalidInputs(t *testing.T) {
	tests := []string{
		"",
		" ",
		"abc",
		"1..2",
		"1.2.3",
		"not a number",
		"12.34.56",
		"xyz",
	}

	for _, tt := range tests {
		t.Run(tt, func(t *testing.T) {
			_, err := ParseNumber(tt)
			if err == nil {
				t.Errorf("ParseNumber(%q) should return error, but got nil", tt)
			}
		})
	}
}
