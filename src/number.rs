/// Number validation and parsing module
///
/// This module provides validation and parsing functionality for calculator input,
/// mirroring the behavior of the Python version's is_number() and casting() functions.
/// Validates if a string represents a valid number
///
/// Supports the following formats:
/// - Integers: 123, -456
/// - Decimals: 123.456, 0.123, .123
/// - Signed decimals: -0.123, +123.45
///
/// Matches the Python is_number() function behavior exactly.
pub fn is_number(s: &str) -> bool {
    if s.is_empty() {
        return false;
    }

    // Handle simple cases first
    // Check if it's a simple decimal number (e.g., "123.456")
    if s.contains('.') {
        let parts: Vec<&str> = s.split('.').collect();
        if parts.len() == 2 {
            let before = parts[0];
            let after = parts[1];

            // Handle cases like ".123"
            if before.is_empty() && after.chars().all(|c| c.is_ascii_digit()) && !after.is_empty() {
                return true;
            }

            // Handle cases like "-.123" or "+.123" (sign directly before dot)
            if before.len() == 1 && (before == "-" || before == "+")
                && !after.is_empty() && after.chars().all(|c| c.is_ascii_digit()) {
                return true;
            }

            // Handle cases like "123.456" or "-123.456" or "+123.456"
            if !after.is_empty() && after.chars().all(|c| c.is_ascii_digit()) {
                if before.is_empty() {
                    return false; // Just "." is not valid
                }

                if before.chars().all(|c| c.is_ascii_digit()) {
                    return true;
                }

                // Handle signed decimals like "-123.456" or "+0.123"
                if before.len() > 1 {
                    let first_char = before.chars().next().unwrap();
                    if first_char == '-' || first_char == '+' {
                        let rest = &before[1..];
                        if rest.chars().all(|c| c.is_ascii_digit()) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    // Check if it's a simple integer
    if s.chars().all(|c| c.is_ascii_digit()) {
        return true;
    }

    // Check for signed numbers
    if s.len() > 1 {
        let first_char = s.chars().next().unwrap();
        if first_char == '-' || first_char == '+' || first_char == ' ' {
            let rest = &s[1..];

            if rest.is_empty() {
                return false;
            }

            // Handle cases like "-123" or "+123"
            if rest.chars().all(|c| c.is_ascii_digit()) {
                return true;
            }

            // Handle cases like "-.123" or "+.123"
            if rest.starts_with('.') && rest.len() > 1 {
                let after_dot = &rest[1..];
                if after_dot.chars().all(|c| c.is_ascii_digit()) && !after_dot.is_empty() {
                    return true;
                }
            }

            // Handle cases like "-0.123" or "+0.123" or "-123.456"
            if rest.contains('.') {
                let parts: Vec<&str> = rest.split('.').collect();
                if parts.len() == 2 {
                    let before = parts[0];
                    let after = parts[1];
                    if !after.is_empty() && after.chars().all(|c| c.is_ascii_digit())
                        && !before.is_empty() && before.chars().all(|c| c.is_ascii_digit()) {
                        return true;
                    }
                }
            }
        }
    }

    false
}

/// Parses a validated number string to f64
///
/// This function assumes the input has already been validated with is_number().
/// The Python version returns int or float depending on presence of decimal point,
/// but in Rust we'll return f64 and format appropriately when displaying.
pub fn parse_number(s: &str) -> Result<f64, std::num::ParseFloatError> {
    s.trim().parse::<f64>()
}

/// Formats a number for display, matching Python behavior
///
/// - If the number is a whole number, display without decimal point
/// - Otherwise, display with decimal precision
pub fn format_number(n: f64) -> String {
    if n.fract() == 0.0 && n.is_finite() {
        // It's a whole number, format as integer
        format!("{}", n as i64)
    } else {
        // It's a decimal, format normally
        format!("{}", n)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_is_number_integers() {
        assert!(is_number("123"));
        assert!(is_number("0"));
        assert!(is_number("456"));
    }

    #[test]
    fn test_is_number_signed_integers() {
        assert!(is_number("-123"));
        assert!(is_number("+456"));
        assert!(is_number("-0"));
    }

    #[test]
    fn test_is_number_decimals() {
        assert!(is_number("123.456"));
        assert!(is_number("0.123"));
        assert!(is_number(".123"));
    }

    #[test]
    fn test_is_number_signed_decimals() {
        assert!(is_number("-0.123"));
        assert!(is_number("+123.45"));
        assert!(is_number("-.123"));
        assert!(is_number("+.456"));
    }

    #[test]
    fn test_is_number_invalid() {
        assert!(!is_number(""));
        assert!(!is_number("abc"));
        assert!(!is_number("12.34.56"));
        assert!(!is_number("12a34"));
        assert!(!is_number("."));
        assert!(!is_number("-."));
        assert!(!is_number("+."));
    }

    #[test]
    fn test_parse_number() {
        assert_eq!(parse_number("123").unwrap(), 123.0);
        assert_eq!(parse_number("-456").unwrap(), -456.0);
        assert_eq!(parse_number("123.456").unwrap(), 123.456);
        assert_eq!(parse_number(".123").unwrap(), 0.123);
        assert_eq!(parse_number("-0.123").unwrap(), -0.123);
    }

    #[test]
    fn test_format_number() {
        assert_eq!(format_number(123.0), "123");
        assert_eq!(format_number(-456.0), "-456");
        assert_eq!(format_number(123.456), "123.456");
        assert_eq!(format_number(0.123), "0.123");
    }
}
