"""Tests for simple_calculator.calculator pure computation functions."""
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
# is_number
# ---------------------------------------------------------------------------

class TestIsNumber:
    @pytest.mark.parametrize(
        "value, expected",
        [
            ("123", True),          # valid integer
            ("3.14", True),         # valid float
            ("-5", True),           # negative integer
            (".5", True),           # leading dot notation
            ("", False),            # empty string
            ("abc", False),         # non-numeric string
            ("12.3.4", False),      # malformed float
            ("  ", False),          # whitespace only
        ],
    )
    def test_is_number(self, value: str, expected: bool) -> None:
        assert is_number(value) is expected


# ---------------------------------------------------------------------------
# cast_number
# ---------------------------------------------------------------------------

class TestCastNumber:
    def test_integer_string_returns_int(self) -> None:
        result = cast_number("10")
        assert result == 10
        assert isinstance(result, int)

    def test_float_string_returns_float(self) -> None:
        result = cast_number("3.14")
        assert result == pytest.approx(3.14)
        assert isinstance(result, float)

    def test_whole_float_returns_int(self) -> None:
        """A float with no fractional part should be returned as int."""
        result = cast_number("5.0")
        assert result == 5
        assert isinstance(result, int)


# ---------------------------------------------------------------------------
# add
# ---------------------------------------------------------------------------

class TestAdd:
    def test_int_plus_int(self) -> None:
        assert add("3", "4") == 7

    def test_float_plus_float(self) -> None:
        assert add("1.5", "2.5") == pytest.approx(4.0)

    def test_int_plus_float(self) -> None:
        assert add("2", "0.5") == pytest.approx(2.5)


# ---------------------------------------------------------------------------
# subtract
# ---------------------------------------------------------------------------

class TestSubtract:
    def test_positive_result(self) -> None:
        assert subtract("10", "3") == 7

    def test_negative_result(self) -> None:
        assert subtract("3", "10") == -7


# ---------------------------------------------------------------------------
# multiply
# ---------------------------------------------------------------------------

class TestMultiply:
    def test_integer_product(self) -> None:
        assert multiply("4", "5") == 20

    def test_float_product(self) -> None:
        assert multiply("2.5", "4") == pytest.approx(10.0)


# ---------------------------------------------------------------------------
# divide
# ---------------------------------------------------------------------------

class TestDivide:
    def test_normal_division(self) -> None:
        assert divide("10", "4") == pytest.approx(2.5)

    def test_zero_divisor_raises(self) -> None:
        with pytest.raises(ZeroDivisionError):
            divide("5", "0")
