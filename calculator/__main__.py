"""Entry point: python -m calculator launches the GUI."""
from calculator.gui import CalculatorApp


def main() -> None:
    app = CalculatorApp()
    app.run()


if __name__ == "__main__":
    main()
