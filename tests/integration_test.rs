/// Integration tests for the Simple Calculator application
///
/// These tests verify end-to-end calculation flows by testing the integration
/// between validation, calculation, and result formatting modules.

// Import the modules we need to test
use simple_calculator::number;
use simple_calculator::calculator;

/// Test helper function that simulates the calculation flow
/// This mimics what happens when a user clicks an operation button
fn simulate_calculation(
    input1: &str,
    input2: &str,
    operation: fn(f64, f64) -> f64,
) -> Result<String, String> {
    // Step 1: Validate inputs (matching app.rs logic)
    if !number::is_number(input1) || !number::is_number(input2) {
        return Err("Enter a Valid number\ne.g. 123, 0.123, .123, -0.123, 123.456".to_string());
    }

    // Step 2: Parse numbers
    let num1 = number::parse_number(input1)
        .map_err(|_| "Invalid number format".to_string())?;
    let num2 = number::parse_number(input2)
        .map_err(|_| "Invalid number format".to_string())?;

    // Step 3: Perform calculation
    let result = operation(num1, num2);

    // Step 4: Format result
    Ok(number::format_number(result))
}

/// Test helper for division with error handling
fn simulate_division(input1: &str, input2: &str) -> Result<String, String> {
    // Step 1: Validate inputs
    if !number::is_number(input1) || !number::is_number(input2) {
        return Err("Enter a Valid number\ne.g. 123, 0.123, .123, -0.123, 123.456".to_string());
    }

    // Step 2: Parse numbers
    let num1 = number::parse_number(input1)
        .map_err(|_| "Invalid number format".to_string())?;
    let num2 = number::parse_number(input2)
        .map_err(|_| "Invalid number format".to_string())?;

    // Step 3: Perform division with error handling
    let result = calculator::divide(num1, num2)?;

    // Step 4: Format result
    Ok(number::format_number(result))
}

#[test]
fn test_valid_addition() {
    // Test: enter "5" and "3", click +, expect result "8"
    let result = simulate_calculation("5", "3", calculator::add);
    assert!(result.is_ok());
    assert_eq!(result.unwrap(), "8");
}

#[test]
fn test_valid_addition_with_decimals() {
    // Test: addition with decimal results should show decimals
    let result = simulate_calculation("5.5", "2.5", calculator::add);
    assert!(result.is_ok());
    assert_eq!(result.unwrap(), "8");
}

#[test]
fn test_valid_subtraction() {
    // Test: enter "10" and "4", click -, expect result "6"
    let result = simulate_calculation("10", "4", calculator::subtract);
    assert!(result.is_ok());
    assert_eq!(result.unwrap(), "6");
}

#[test]
fn test_valid_multiplication() {
    // Test: enter "3" and "5", click *, expect result "15"
    let result = simulate_calculation("3", "5", calculator::multiply);
    assert!(result.is_ok());
    assert_eq!(result.unwrap(), "15");
}

#[test]
fn test_valid_float_division() {
    // Test: enter "7.5" and "2.5", click /, expect "Division" and "3"
    let result = simulate_division("7.5", "2.5");
    assert!(result.is_ok());
    assert_eq!(result.unwrap(), "3");
}

#[test]
fn test_mixed_types() {
    // Test: enter "5" and "2.5", click *, expect "12.5"
    let result = simulate_calculation("5", "2.5", calculator::multiply);
    assert!(result.is_ok());
    assert_eq!(result.unwrap(), "12.5");
}

#[test]
fn test_invalid_input_abc() {
    // Test: invalid input should return error
    let result = simulate_calculation("abc", "5", calculator::add);
    assert!(result.is_err());
    assert!(result.unwrap_err().contains("Enter a Valid number"));
}

#[test]
fn test_invalid_input_empty() {
    // Test: empty input should return error
    let result = simulate_calculation("5", "", calculator::add);
    assert!(result.is_err());
}

#[test]
fn test_invalid_input_multiple_dots() {
    // Test: malformed number should return error
    let result = simulate_calculation("12.34.56", "5", calculator::add);
    assert!(result.is_err());
}

#[test]
fn test_division_by_zero() {
    // Test: division by zero should return error
    let result = simulate_division("10", "0");
    assert!(result.is_err());
    assert_eq!(result.unwrap_err(), "Cannot divide by zero");
}

#[test]
fn test_negative_result() {
    // Test: subtraction producing negative result
    let result = simulate_calculation("5", "10", calculator::subtract);
    assert!(result.is_ok());
    assert_eq!(result.unwrap(), "-5");
}

#[test]
fn test_signed_input_addition() {
    // Test: addition with signed inputs
    let result = simulate_calculation("-5", "3", calculator::add);
    assert!(result.is_ok());
    assert_eq!(result.unwrap(), "-2");
}

#[test]
fn test_decimal_input_formats() {
    // Test: various decimal formats work correctly
    let result1 = simulate_calculation(".123", "0.456", calculator::add);
    assert!(result1.is_ok());

    let result2 = simulate_calculation("-.123", "+.456", calculator::add);
    assert!(result2.is_ok());
}

#[test]
fn test_integer_display_format() {
    // Test: whole number results display without decimal point
    let result = simulate_division("4", "2");
    assert!(result.is_ok());
    assert_eq!(result.unwrap(), "2");
}

#[test]
fn test_decimal_display_format() {
    // Test: non-whole number results display with decimal point
    let result = simulate_division("5", "2");
    assert!(result.is_ok());
    assert_eq!(result.unwrap(), "2.5");
}

#[test]
fn test_large_numbers() {
    // Test: calculator handles large numbers
    let result = simulate_calculation("999999", "999999", calculator::add);
    assert!(result.is_ok());
    assert_eq!(result.unwrap(), "1999998");
}

#[test]
fn test_very_small_decimals() {
    // Test: calculator handles very small decimals
    let result = simulate_calculation("0.00001", "0.00001", calculator::multiply);
    assert!(result.is_ok());
    // Result should be a very small number
    let result_str = result.unwrap();
    assert!(result_str.contains("e") || result_str.starts_with("0.0000"));
}
