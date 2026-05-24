"""Pure computation functions for the Simple Calculator.

These functions have no GUI dependency and are fully testable in headless environments.
"""
from __future__ import annotations


def is_number(s: str) -> bool:
    """Return True if *s* is a parseable number, False otherwise.

    Handles integers, floats, negatives, and leading-dot notation.
    """
    if not s:
        return False
    try:
        float(s)
        return True
    except ValueError:
        return False


def cast_number(num: str) -> int | float:
    """Convert a validated numeric string to int or float.

    Returns int when the value has no fractional part, float otherwise.
    """
    value = float(num)
    if value == int(value):
        return int(value)
    return value


def add(a: str, b: str) -> int | float:
    """Return the sum of two numeric strings."""
    return cast_number(a) + cast_number(b)


def subtract(a: str, b: str) -> int | float:
    """Return the difference of two numeric strings (a - b)."""
    return cast_number(a) - cast_number(b)


def multiply(a: str, b: str) -> int | float:
    """Return the product of two numeric strings."""
    return cast_number(a) * cast_number(b)


def divide(a: str, b: str) -> float:
    """Return the quotient of two numeric strings (a / b).

    Raises:
        ZeroDivisionError: if *b* is zero.
    """
    divisor = cast_number(b)
    if divisor == 0:
        raise ZeroDivisionError("Cannot divide by zero")
    return cast_number(a) / divisor
