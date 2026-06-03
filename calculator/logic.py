"""Pure arithmetic logic for the calculator — no GUI dependencies."""

type Number = int | float


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
    int_value = int(value)
    if value == int_value:
        return int_value
    return value


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
    int_result = int(result)
    if result == int_result:
        return int_result
    return result
