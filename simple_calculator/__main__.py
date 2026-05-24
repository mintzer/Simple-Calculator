"""Entry point for `python -m simple_calculator`."""
from __future__ import annotations

from simple_calculator.app import CalculatorApp


def main() -> None:
    """Launch the calculator GUI."""
    app = CalculatorApp()
    app.mainloop()


if __name__ == "__main__":
    main()
