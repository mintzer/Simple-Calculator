package calculator

import "strconv"

// FormatResult formats a float64 value for display.
// Integer-valued floats are formatted without decimal points (e.g., 5.0 → "5").
// Non-integer floats are formatted with appropriate precision (e.g., 5.5 → "5.5").
func FormatResult(v float64) string {
	// Check if the float is equivalent to an integer
	if v == float64(int64(v)) {
		return strconv.FormatInt(int64(v), 10)
	}
	// Use 'f' format with -1 precision to show minimal decimal places
	return strconv.FormatFloat(v, 'f', -1, 64)
}
