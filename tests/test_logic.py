"""Unit tests for calculator.logic."""

import pytest

from calculator.logic import parse_number, add, subtract, multiply, divide


# ---------------------------------------------------------------------------
# parse_number
# ---------------------------------------------------------------------------

@pytest.mark.parametrize(
    "s, expected, expected_type",
    [
        ("123", 123, int),
        ("0.123", 0.123, float),
        (".5", 0.5, float),
        ("-5", -5, int),
        ("+3.14", 3.14, float),
        ("0", 0, int),
        ("1.0", 1, int),
    ],
)
def test_parse_number_valid(s: str, expected: int | float, expected_type: type) -> None:
    result = parse_number(s)
    assert result == expected
    assert type(result) is expected_type


@pytest.mark.parametrize(
    "s",
    ["-", "+", "+.", "", "abc", "1.2.3", "--1", "inf", "-inf", "infinity", "-infinity"],
)
def test_parse_number_invalid(s: str) -> None:
    with pytest.raises(ValueError):
        parse_number(s)


# ---------------------------------------------------------------------------
# add
# ---------------------------------------------------------------------------

@pytest.mark.parametrize(
    "a, b, expected",
    [
        (1, 2, 3),
        (-1, -2, -3),
        (0.5, 0.5, 1),
        (0, 0, 0),
    ],
)
def test_add(a: int | float, b: int | float, expected: int | float) -> None:
    assert add(a, b) == expected


# ---------------------------------------------------------------------------
# subtract
# ---------------------------------------------------------------------------

@pytest.mark.parametrize(
    "a, b, expected",
    [
        (5, 3, 2),
        (-1, -2, 1),
        (0.5, 0.25, 0.25),
        (0, 0, 0),
    ],
)
def test_subtract(a: int | float, b: int | float, expected: int | float) -> None:
    assert subtract(a, b) == expected


# ---------------------------------------------------------------------------
# multiply
# ---------------------------------------------------------------------------

@pytest.mark.parametrize(
    "a, b, expected",
    [
        (3, 4, 12),
        (-2, 3, -6),
        (0.5, 2, 1),
        (0, 5, 0),
    ],
)
def test_multiply(a: int | float, b: int | float, expected: int | float) -> None:
    assert multiply(a, b) == expected


# ---------------------------------------------------------------------------
# divide — valid cases
# ---------------------------------------------------------------------------

@pytest.mark.parametrize(
    "a, b, expected",
    [
        (10, 2, 5),
        (7, 2, 3.5),
        (-6, 2, -3),
        (1, 4, 0.25),
    ],
)
def test_divide_valid(a: int | float, b: int | float, expected: int | float) -> None:
    assert divide(a, b) == expected


# ---------------------------------------------------------------------------
# divide — zero divisor
# ---------------------------------------------------------------------------

@pytest.mark.parametrize(
    "a, b",
    [
        (5, 0),
        (-1, 0),
    ],
)
def test_divide_zero_divisor(a: int | float, b: int | float) -> None:
    with pytest.raises(ValueError):
        divide(a, b)
