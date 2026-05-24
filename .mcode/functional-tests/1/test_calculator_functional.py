"""Functional tests for simple_calculator.calculator pure computation module.

All entities are target_only — this is a MODIFIED single-repo project with no origin.
Tests verify correctness per the modernization spec.
"""
from __future__ import annotations

import pytest

from simple_calculator.calculator import (
    add,
    cast_number,
    divide,
    is_number,
    multiply,
    subtract,
)


# ---------------------------------------------------------------------------
# is_number — HAPPY_PATH
# ---------------------------------------------------------------------------

class TestIsNumberHappyPath:
    """is_number returns True for valid numeric strings."""

    def test_positive_integer(self):
        assert is_number("42") is True

    def test_zero(self):
        assert is_number("0") is True

    def test_valid_float(self):
        assert is_number("3.14") is True

    def test_negative_integer(self):
        assert is_number("-7") is True

    def test_negative_float(self):
        assert is_number("-2.5") is True

    def test_leading_dot_notation(self):
        """'.5' is a valid float per spec (leading-dot notation)."""
        assert is_number(".5") is True

    def test_large_integer(self):
        assert is_number("999999999") is True

    def test_scientific_notation(self):
        """float() accepts scientific notation; is_number should too."""
        assert is_number("1e10") is True


# ---------------------------------------------------------------------------
# is_number — INVALID_INPUT
# ---------------------------------------------------------------------------

class TestIsNumberInvalidInput:
    """is_number returns False for non-numeric and malformed strings."""

    def test_empty_string(self):
        """Empty string must return False per spec."""
        assert is_number("") is False

    def test_alphabetic_string(self):
        assert is_number("abc") is False

    def test_alphanumeric_string(self):
        assert is_number("12abc") is False

    def test_whitespace_only(self):
        """Whitespace-only string is not a valid number."""
        assert is_number("  ") is False

    def test_malformed_float_double_dot(self):
        assert is_number("12.3.4") is False

    def test_bare_dot(self):
        """A lone '.' is not a valid number — float('.') raises ValueError."""
        assert is_number(".") is False

    def test_special_characters(self):
        assert is_number("!@#") is False

    def test_slash(self):
        assert is_number("1/2") is False


# ---------------------------------------------------------------------------
# is_number — BOUNDARY
# ---------------------------------------------------------------------------

class TestIsNumberBoundary:
    """is_number edge cases at the boundary of valid/invalid."""

    def test_negative_zero(self):
        assert is_number("-0") is True

    def test_single_digit(self):
        assert is_number("5") is True

    def test_single_zero(self):
        assert is_number("0") is True

    def test_negative_leading_dot(self):
        """'-. 5' style — '-.5' should be valid (float parses it)."""
        assert is_number("-.5") is True


# ---------------------------------------------------------------------------
# cast_number — HAPPY_PATH
# ---------------------------------------------------------------------------

class TestCastNumberHappyPath:
    """cast_number returns int for whole values and float for fractional ones."""

    def test_integer_string_returns_int(self):
        result = cast_number("10")
        assert result == 10
        assert isinstance(result, int)

    def test_float_string_returns_float(self):
        result = cast_number("3.14")
        assert result == pytest.approx(3.14)
        assert isinstance(result, float)

    def test_whole_float_returns_int(self):
        """'5.0' has no fractional part — must return int(5) per spec."""
        result = cast_number("5.0")
        assert result == 5
        assert isinstance(result, int)

    def test_zero_string_returns_int(self):
        result = cast_number("0")
        assert result == 0
        assert isinstance(result, int)

    def test_negative_integer_returns_int(self):
        result = cast_number("-3")
        assert result == -3
        assert isinstance(result, int)

    def test_negative_float_returns_float(self):
        result = cast_number("-1.5")
        assert result == pytest.approx(-1.5)
        assert isinstance(result, float)


# ---------------------------------------------------------------------------
# add — HAPPY_PATH
# ---------------------------------------------------------------------------

class TestAddHappyPath:
    """add(a, b) returns correct sum with correct type."""

    def test_int_plus_int_returns_int(self):
        result = add("1", "2")
        assert result == 3
        assert isinstance(result, int), "add('1','2') must return int(3) not float(3.0)"

    def test_float_plus_float(self):
        result = add("1.5", "2.5")
        assert result == pytest.approx(4.0)

    def test_int_plus_float(self):
        result = add("2", "0.5")
        assert result == pytest.approx(2.5)

    def test_negative_operands(self):
        result = add("-3", "-4")
        assert result == -7
        assert isinstance(result, int)

    def test_add_zeros(self):
        result = add("0", "0")
        assert result == 0
        assert isinstance(result, int)

    def test_large_numbers(self):
        result = add("1000000", "2000000")
        assert result == 3000000


# ---------------------------------------------------------------------------
# add — BOUNDARY
# ---------------------------------------------------------------------------

class TestAddBoundary:
    """add edge cases."""

    def test_add_negative_and_positive(self):
        result = add("-5", "5")
        assert result == 0

    def test_add_fractional_precision(self):
        result = add("0.1", "0.2")
        assert result == pytest.approx(0.3)


# ---------------------------------------------------------------------------
# subtract — HAPPY_PATH
# ---------------------------------------------------------------------------

class TestSubtractHappyPath:
    """subtract(a, b) returns correct difference."""

    def test_positive_result(self):
        result = subtract("10", "3")
        assert result == 7
        assert isinstance(result, int)

    def test_negative_result(self):
        result = subtract("3", "10")
        assert result == -7
        assert isinstance(result, int)

    def test_subtract_floats(self):
        result = subtract("5.5", "2.5")
        assert result == pytest.approx(3.0)

    def test_subtract_to_zero(self):
        result = subtract("7", "7")
        assert result == 0

    def test_subtract_negative_operand(self):
        """Subtracting a negative is equivalent to addition."""
        result = subtract("5", "-3")
        assert result == 8


# ---------------------------------------------------------------------------
# multiply — HAPPY_PATH
# ---------------------------------------------------------------------------

class TestMultiplyHappyPath:
    """multiply(a, b) returns correct product."""

    def test_integer_product(self):
        result = multiply("4", "5")
        assert result == 20
        assert isinstance(result, int)

    def test_float_product(self):
        result = multiply("2.5", "4")
        assert result == pytest.approx(10.0)

    def test_multiply_by_zero(self):
        result = multiply("999", "0")
        assert result == 0

    def test_multiply_negatives(self):
        result = multiply("-3", "-4")
        assert result == 12
        assert isinstance(result, int)

    def test_multiply_negative_positive(self):
        result = multiply("-5", "6")
        assert result == -30
        assert isinstance(result, int)


# ---------------------------------------------------------------------------
# multiply — BOUNDARY
# ---------------------------------------------------------------------------

class TestMultiplyBoundary:
    """multiply edge cases."""

    def test_multiply_by_one(self):
        result = multiply("42", "1")
        assert result == 42

    def test_multiply_fractional(self):
        result = multiply("0.5", "0.5")
        assert result == pytest.approx(0.25)


# ---------------------------------------------------------------------------
# divide — HAPPY_PATH
# ---------------------------------------------------------------------------

class TestDivideHappyPath:
    """divide(a, b) returns correct quotient."""

    def test_even_division(self):
        result = divide("10", "2")
        assert result == pytest.approx(5.0)

    def test_fractional_result(self):
        result = divide("10", "4")
        assert result == pytest.approx(2.5)

    def test_divide_by_one(self):
        result = divide("7", "1")
        assert result == pytest.approx(7.0)

    def test_divide_float_numerator(self):
        result = divide("9.0", "3")
        assert result == pytest.approx(3.0)

    def test_divide_negatives(self):
        result = divide("-10", "2")
        assert result == pytest.approx(-5.0)

    def test_divide_negative_by_negative(self):
        result = divide("-6", "-3")
        assert result == pytest.approx(2.0)


# ---------------------------------------------------------------------------
# divide — BOUNDARY / zero-divisor
# ---------------------------------------------------------------------------

class TestDivideBoundary:
    """divide edge cases including zero-divisor."""

    def test_zero_divisor_raises_zero_division_error(self):
        """Spec mandates ZeroDivisionError when divisor is 0."""
        with pytest.raises(ZeroDivisionError):
            divide("5", "0")

    def test_zero_float_divisor_raises(self):
        """'0.0' should also trigger ZeroDivisionError."""
        with pytest.raises(ZeroDivisionError):
            divide("5", "0.0")

    def test_zero_numerator(self):
        """0 / n = 0.0 (no error)."""
        result = divide("0", "5")
        assert result == pytest.approx(0.0)

    def test_large_division(self):
        result = divide("1000000", "1000")
        assert result == pytest.approx(1000.0)


# ---------------------------------------------------------------------------
# Type consistency (spec requirement §5)
# ---------------------------------------------------------------------------

class TestTypeConsistency:
    """Verify that integer-valued results are returned as int, not float."""

    def test_add_int_int_is_int(self):
        result = add("1", "2")
        assert isinstance(result, int), f"Expected int, got {type(result)}"
        assert result == 3

    def test_subtract_int_int_is_int(self):
        result = subtract("9", "4")
        assert isinstance(result, int), f"Expected int, got {type(result)}"
        assert result == 5

    def test_multiply_int_int_is_int(self):
        result = multiply("3", "7")
        assert isinstance(result, int), f"Expected int, got {type(result)}"
        assert result == 21

    def test_cast_number_whole_float_is_int(self):
        result = cast_number("4.0")
        assert isinstance(result, int), f"Expected int, got {type(result)}"
        assert result == 4

    def test_divide_returns_float(self):
        """divide() always returns a float (quotient can be non-integer)."""
        result = divide("6", "2")
        assert isinstance(result, float), f"Expected float, got {type(result)}"
