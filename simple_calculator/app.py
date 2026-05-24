"""Class-based tkinter GUI for the Simple Calculator."""
from __future__ import annotations

import tkinter as tk
from tkinter import messagebox

from simple_calculator import calculator


class CalculatorApp(tk.Tk):
    """Main application window for the Simple Calculator."""

    def __init__(self) -> None:
        super().__init__()
        self.title("My First Python Calculator")
        self.geometry("380x300+200+250")
        self.resizable(False, False)
        self._build_ui()

    def _build_ui(self) -> None:
        """Construct and place all widgets."""
        # Title label
        self._title_label = tk.Label(
            self,
            fg="green",
            font="none 10 bold underline",
            text="Python Calculator",
            compound=tk.CENTER,
        )
        self._title_label.place(relx=0.5, rely=0.1, anchor="center")

        # Number entry fields
        self._numberentry1 = tk.Entry(self)
        self._numberentry1.place(relx=0.5, rely=0.3, anchor="center")

        self._numberentry2 = tk.Entry(self)
        self._numberentry2.place(relx=0.5, rely=0.4, anchor="center")

        # Operation label (shows the current operation name)
        self._showtemplabel = tk.Entry(self)

        # Result label (shows the computed result)
        self._showlabel = tk.Entry(self)

        # Operation buttons
        self._plusbutton = tk.Button(self, text="+", width=5, command=self._on_plus)
        self._plusbutton.place(relx=0.1, rely=0.7)

        self._minusbutton = tk.Button(self, text="-", width=5, command=self._on_minus)
        self._minusbutton.place(relx=0.3, rely=0.7)

        self._mulbutton = tk.Button(self, text="*", width=5, command=self._on_multiply)
        self._mulbutton.place(relx=0.5, rely=0.7)

        self._divbutton = tk.Button(self, text="/", width=5, command=self._on_divide)
        self._divbutton.place(relx=0.7, rely=0.7)

        # Author button
        self._authorbutton = tk.Button(
            self, text="Author", width=6, command=self._on_author
        )
        self._authorbutton.place(relx=0.5, rely=0.95, anchor="center")

    def _validate_inputs(self) -> tuple[str, str] | None:
        """Retrieve and validate both entry values.

        Returns a (num1, num2) tuple if both are valid, otherwise shows an error
        dialog and returns None.
        """
        num1 = self._numberentry1.get()
        num2 = self._numberentry2.get()
        if calculator.is_number(num1) and calculator.is_number(num2):
            return num1, num2
        messagebox.showerror(
            "Error",
            "Enter a Valid number\ne.g. 123, 0.123, .123, -0.123, 123.456",
        )
        return None

    def _display_result(self, operation: str, fg: str, bg: str, result: str) -> None:
        """Update the operation and result entry widgets."""
        self._showtemplabel.delete(0, tk.END)
        self._showlabel.delete(0, tk.END)

        self._showtemplabel.config(fg=fg, bg=bg)
        self._showtemplabel.insert(0, operation)
        self._showtemplabel.place(relx=0.5, rely=0.5, anchor="center")

        self._showlabel.insert(0, result)
        self._showlabel.place(relx=0.5, rely=0.6, anchor="center")

    def _on_plus(self) -> None:
        """Handle the addition button press."""
        inputs = self._validate_inputs()
        if inputs is None:
            return
        num1, num2 = inputs
        result = calculator.add(num1, num2)
        self._display_result("Summation", "red", "#9ed8ee", str(result))

    def _on_minus(self) -> None:
        """Handle the subtraction button press."""
        inputs = self._validate_inputs()
        if inputs is None:
            return
        num1, num2 = inputs
        result = calculator.subtract(num1, num2)
        self._display_result("Subtraction", "green", "#ece7e2", str(result))

    def _on_multiply(self) -> None:
        """Handle the multiplication button press."""
        inputs = self._validate_inputs()
        if inputs is None:
            return
        num1, num2 = inputs
        result = calculator.multiply(num1, num2)
        self._display_result("Multiplication", "blue", "#cacba9", str(result))

    def _on_divide(self) -> None:
        """Handle the division button press."""
        inputs = self._validate_inputs()
        if inputs is None:
            return
        num1, num2 = inputs
        try:
            result = calculator.divide(num1, num2)
        except ZeroDivisionError:
            messagebox.showerror("Error", "Cannot divide by zero")
            return
        self._display_result("Division", "yellow", "#8dad96", str(result))

    def _on_author(self) -> None:
        """Show author information dialog."""
        messagebox.showinfo(
            "Author",
            "Pranta Sarker\nBatch: 6th\nDepartment: CSE\nNorth East University Bangladesh",
        )
