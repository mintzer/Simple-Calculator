"""Pure arithmetic logic for the calculator — no GUI dependencies."""

import math

type Number = int | float


def _as_number(value: float) -> Number:
    """Return *value* as int if it is a whole number, otherwise as float."""
    int_value = int(value)
    return int_value if value == int_value else value


def parse_number(s: str) -> int | float:
    """Parse a string into an int or float.

    Returns an int when the value is whole (e.g. "1.0" → 1),
    otherwise returns a float.

    Raises:
        ValueError: if *s* cannot be parsed as a number.
    """
    try:
        value = float(s)
    except ValueError:
        raise ValueError(f"Invalid number: {s!r}")
    if math.isinf(value) or math.isnan(value):
        raise ValueError(f"Invalid number: {s!r}")
    return _as_number(value)


def add(a: Number, b: Number) -> Number:
    """Return the sum of *a* and *b*."""
    return a + b


def subtract(a: Number, b: Number) -> Number:
    """Return the difference of *a* minus *b*."""
    return a - b


def multiply(a: Number, b: Number) -> Number:
    """Return the product of *a* and *b*."""
    return a * b


def divide(a: Number, b: Number) -> Number:
    """Return the quotient of *a* divided by *b*.

    Returns an int when the result is a whole number.

    Raises:
        ValueError: if *b* is zero.
    """
    if b == 0:
        raise ValueError("Division by zero is not allowed")
    result = a / b
    if math.isinf(result) or math.isnan(result):
        raise ValueError(f"Result is not a finite number: {result}")
    return _as_number(result)
