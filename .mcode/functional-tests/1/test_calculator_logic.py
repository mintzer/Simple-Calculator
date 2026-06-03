"""Functional tests for calculator.logic — pure arithmetic layer.

All entities are target_only (single-repo modernization project, no origin counterpart).
Tests validate against the milestone specification.
"""

import pytest

from calculator.logic import parse_number, add, subtract, multiply, divide


# ---------------------------------------------------------------------------
# parse_number — HAPPY_PATH
# ---------------------------------------------------------------------------

class TestParseNumberHappyPath:
    """parse_number() correctly parses valid numeric strings."""

    @pytest.mark.parametrize(
        "s, expected, expected_type",
        [
            ("123", 123, int),
            ("0", 0, int),
            ("1.0", 1, int),       # whole-valued float → int
            ("0.123", 0.123, float),
            (".5", 0.5, float),
            ("-5", -5, int),
            ("+3.14", 3.14, float),
            ("1e3", 1000, int),    # scientific notation now accepted (broader than original)
            ("  42  ", 42, int),   # float() strips surrounding whitespace
        ],
    )
    def test_parse_number_valid(self, s: str, expected: int | float, expected_type: type) -> None:
        result = parse_number(s)
        assert result == expected
        assert type(result) is expected_type


# ---------------------------------------------------------------------------
# parse_number — INVALID_INPUT (inputs that crashed the original is_number())
# ---------------------------------------------------------------------------

class TestParseNumberInvalidInput:
    """parse_number() raises ValueError for invalid inputs, including IndexError-triggering ones."""

    @pytest.mark.parametrize(
        "s",
        [
            "-",       # original IndexError trigger
            "+",       # original IndexError trigger
            "+.",      # original IndexError trigger
            "",        # empty string
            "abc",     # non-numeric text
            "1.2.3",   # multiple decimal points
            "--1",     # double minus
        ],
    )
    def test_parse_number_raises_value_error(self, s: str) -> None:
        with pytest.raises(ValueError):
            parse_number(s)

    def test_parse_number_error_not_index_error(self) -> None:
        """Confirms the old IndexError bug is fixed — only ValueError is raised."""
        for s in ("-", "+", "+."):
            with pytest.raises(ValueError):
                parse_number(s)


# ---------------------------------------------------------------------------
# add — HAPPY_PATH
# ---------------------------------------------------------------------------

class TestAdd:
    """add() returns correct sums for positive, negative, and float operands."""

    @pytest.mark.parametrize(
        "a, b, expected",
        [
            (1, 2, 3),
            (-1, -2, -3),
            (0.5, 0.5, 1),
            (0, 0, 0),
            (100, -50, 50),
            (1.1, 2.2, pytest.approx(3.3)),
        ],
    )
    def test_add_returns_correct_sum(self, a: int | float, b: int | float, expected: int | float) -> None:
        assert add(a, b) == expected


# ---------------------------------------------------------------------------
# subtract — HAPPY_PATH
# ---------------------------------------------------------------------------

class TestSubtract:
    """subtract() returns correct differences for positive, negative, and float operands."""

    @pytest.mark.parametrize(
        "a, b, expected",
        [
            (5, 3, 2),
            (-1, -2, 1),
            (0.5, 0.25, 0.25),
            (0, 0, 0),
            (0, 10, -10),
            (3.5, 1.5, 2.0),
        ],
    )
    def test_subtract_returns_correct_difference(self, a: int | float, b: int | float, expected: int | float) -> None:
        assert subtract(a, b) == expected


# ---------------------------------------------------------------------------
# multiply — HAPPY_PATH
# ---------------------------------------------------------------------------

class TestMultiply:
    """multiply() returns correct products for positive, negative, and float operands."""

    @pytest.mark.parametrize(
        "a, b, expected",
        [
            (3, 4, 12),
            (-2, 3, -6),
            (-2, -3, 6),
            (0.5, 2, 1),
            (0, 5, 0),
            (1.5, 4, 6),
        ],
    )
    def test_multiply_returns_correct_product(self, a: int | float, b: int | float, expected: int | float) -> None:
        assert multiply(a, b) == expected


# ---------------------------------------------------------------------------
# divide — HAPPY_PATH
# ---------------------------------------------------------------------------

class TestDivideHappyPath:
    """divide() returns correct quotients."""

    @pytest.mark.parametrize(
        "a, b, expected",
        [
            (10, 2, 5),
            (7, 2, 3.5),
            (-6, 2, -3),
            (1, 4, 0.25),
            (9, 3, 3),
            (-10, -2, 5),
        ],
    )
    def test_divide_returns_correct_quotient(self, a: int | float, b: int | float, expected: int | float) -> None:
        assert divide(a, b) == expected


# ---------------------------------------------------------------------------
# divide — BOUNDARY (zero divisor raises ValueError, not ZeroDivisionError)
# ---------------------------------------------------------------------------

class TestDivideZeroDivisor:
    """divide() raises ValueError (not ZeroDivisionError) when divisor is zero."""

    @pytest.mark.parametrize(
        "a, b",
        [
            (5, 0),
            (-1, 0),
            (0, 0),
            (1.5, 0),
        ],
    )
    def test_divide_zero_raises_value_error(self, a: int | float, b: int | float) -> None:
        with pytest.raises(ValueError):
            divide(a, b)

    def test_divide_zero_raises_value_error_not_zero_division_error(self) -> None:
        """Explicitly confirms the bug fix: ZeroDivisionError is NOT raised."""
        with pytest.raises(ValueError):
            divide(5, 0)
        # Confirm ZeroDivisionError is NOT raised (it would be a subclass issue otherwise)
        try:
            divide(5, 0)
        except ZeroDivisionError:
            pytest.fail("divide(5, 0) raised ZeroDivisionError instead of ValueError")
        except ValueError:
            pass  # correct


# ---------------------------------------------------------------------------
# divide — BOUNDARY (whole-number result returned as int)
# ---------------------------------------------------------------------------

class TestDivideReturnType:
    """divide() returns int for whole-number results, float otherwise."""

    def test_divide_whole_result_is_int(self) -> None:
        result = divide(10, 2)
        assert result == 5
        assert type(result) is int

    def test_divide_fractional_result_is_float(self) -> None:
        result = divide(7, 2)
        assert result == 3.5
        assert type(result) is float


# ---------------------------------------------------------------------------
# parse_number — BOUNDARY (edge cases)
# ---------------------------------------------------------------------------

class TestParseNumberBoundary:
    """parse_number() edge cases for boundary values."""

    def test_parse_negative_zero(self) -> None:
        """'-0' parses as 0 (int)."""
        result = parse_number("-0")
        assert result == 0

    def test_parse_very_large_number(self) -> None:
        result = parse_number("1e308")
        assert result > 0

    def test_parse_returns_int_for_whole_float(self) -> None:
        """'5.0' should return int 5, not float 5.0."""
        result = parse_number("5.0")
        assert result == 5
        assert type(result) is int

    def test_parse_returns_float_for_fractional(self) -> None:
        result = parse_number("3.14")
        assert isinstance(result, float)
