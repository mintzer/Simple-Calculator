package calculator

import (
	"math"
	"testing"
)

func TestAdd(t *testing.T) {
	tests := []struct {
		name     string
		a, b     float64
		expected float64
	}{
		{"positive integers", 5, 3, 8},
		{"negative integers", -5, -3, -8},
		{"mixed signs", 5, -3, 2},
		{"with zero", 5, 0, 5},
		{"floats", 3.14, 2.86, 6.0},
		{"negative floats", -1.5, -2.5, -4.0},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := Add(tt.a, tt.b)
			if math.Abs(result-tt.expected) > 1e-9 {
				t.Errorf("Add(%v, %v) = %v, want %v", tt.a, tt.b, result, tt.expected)
			}
		})
	}
}

func TestSubtract(t *testing.T) {
	tests := []struct {
		name     string
		a, b     float64
		expected float64
	}{
		{"positive integers", 5, 3, 2},
		{"negative integers", -5, -3, -2},
		{"mixed signs", 5, -3, 8},
		{"with zero", 5, 0, 5},
		{"floats", 6.5, 2.5, 4.0},
		{"negative result", 3, 5, -2},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := Subtract(tt.a, tt.b)
			if math.Abs(result-tt.expected) > 1e-9 {
				t.Errorf("Subtract(%v, %v) = %v, want %v", tt.a, tt.b, result, tt.expected)
			}
		})
	}
}

func TestMultiply(t *testing.T) {
	tests := []struct {
		name     string
		a, b     float64
		expected float64
	}{
		{"positive integers", 5, 3, 15},
		{"negative integers", -5, -3, 15},
		{"mixed signs", 5, -3, -15},
		{"with zero", 5, 0, 0},
		{"with one", 5, 1, 5},
		{"floats", 2.5, 4.0, 10.0},
		{"negative floats", -1.5, 2.0, -3.0},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := Multiply(tt.a, tt.b)
			if math.Abs(result-tt.expected) > 1e-9 {
				t.Errorf("Multiply(%v, %v) = %v, want %v", tt.a, tt.b, result, tt.expected)
			}
		})
	}
}

func TestDivide(t *testing.T) {
	tests := []struct {
		name     string
		a, b     float64
		expected float64
		wantErr  bool
	}{
		{"positive integers", 6, 3, 2, false},
		{"negative integers", -6, -3, 2, false},
		{"mixed signs", 6, -3, -2, false},
		{"with one", 5, 1, 5, false},
		{"floats", 7.5, 2.5, 3.0, false},
		{"result less than one", 1, 2, 0.5, false},
		{"division by zero", 5, 0, 0, true},
		{"zero divided by number", 0, 5, 0, false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result, err := Divide(tt.a, tt.b)
			if tt.wantErr {
				if err == nil {
					t.Errorf("Divide(%v, %v) should return error, but got nil", tt.a, tt.b)
				}
			} else {
				if err != nil {
					t.Errorf("Divide(%v, %v) returned unexpected error: %v", tt.a, tt.b, err)
				}
				if math.Abs(result-tt.expected) > 1e-9 {
					t.Errorf("Divide(%v, %v) = %v, want %v", tt.a, tt.b, result, tt.expected)
				}
			}
		})
	}
}
