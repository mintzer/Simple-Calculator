/// Calculator operations module
///
/// This module provides the four basic arithmetic operations:
/// addition, subtraction, multiplication, and division.
/// Adds two numbers
pub fn add(num1: f64, num2: f64) -> f64 {
    num1 + num2
}

/// Subtracts the second number from the first
pub fn subtract(num1: f64, num2: f64) -> f64 {
    num1 - num2
}

/// Multiplies two numbers
pub fn multiply(num1: f64, num2: f64) -> f64 {
    num1 * num2
}

/// Divides the first number by the second
///
/// Returns a Result to handle division by zero explicitly.
/// This is an enhancement over the Python version which would crash on division by zero.
pub fn divide(num1: f64, num2: f64) -> Result<f64, String> {
    if num2 == 0.0 {
        Err("Cannot divide by zero".to_string())
    } else {
        Ok(num1 / num2)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(5.0, 3.0), 8.0);
        assert_eq!(add(-5.0, 3.0), -2.0);
        assert_eq!(add(2.5, 3.5), 6.0);
        assert_eq!(add(0.1, 0.2), 0.30000000000000004); // Floating point precision
    }

    #[test]
    fn test_subtract() {
        assert_eq!(subtract(10.0, 4.0), 6.0);
        assert_eq!(subtract(5.0, 10.0), -5.0);
        assert_eq!(subtract(-5.0, -3.0), -2.0);
        assert_eq!(subtract(7.5, 2.5), 5.0);
    }

    #[test]
    fn test_multiply() {
        assert_eq!(multiply(3.0, 5.0), 15.0);
        assert_eq!(multiply(-3.0, 5.0), -15.0);
        assert_eq!(multiply(2.5, 4.0), 10.0);
        assert_eq!(multiply(0.0, 100.0), 0.0);
    }

    #[test]
    fn test_divide() {
        assert_eq!(divide(12.0, 3.0).unwrap(), 4.0);
        assert_eq!(divide(7.5, 2.5).unwrap(), 3.0);
        assert_eq!(divide(10.0, 4.0).unwrap(), 2.5);
        assert_eq!(divide(-12.0, 3.0).unwrap(), -4.0);
    }

    #[test]
    fn test_divide_by_zero() {
        assert!(divide(10.0, 0.0).is_err());
        assert_eq!(
            divide(10.0, 0.0).unwrap_err(),
            "Cannot divide by zero".to_string()
        );
    }

    #[test]
    fn test_mixed_operations() {
        // Test with integers displayed as floats
        assert_eq!(add(5.0, 3.0), 8.0);
        // Test with mixed float and int-like values
        assert_eq!(multiply(5.0, 2.5), 12.5);
    }
}
