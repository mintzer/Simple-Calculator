"""Tkinter GUI for the Simple Calculator."""

from tkinter import Tk, Label, Entry, Button, END
from tkinter import messagebox

from calculator.logic import parse_number, add, subtract, multiply, divide


class CalculatorApp:
    """Four-operation desktop calculator built with tkinter."""

    def __init__(self) -> None:
        """Set up the root window and all widgets."""
        self.root = Tk()
        self.root.title("My First Python Calculator")
        self.root.geometry("380x300+200+250")
        self.root.resizable(False, False)

        # Title label
        title_label = Label(
            self.root,
            fg="green",
            font="none 10 bold underline",
            text="Python Calculator",
            compound="center",
        )
        title_label.place(relx=0.5, rely=0.1, anchor="center")

        # Operation name display
        self.operation_label: Entry = Entry(self.root)

        # Result display
        self.result_entry: Entry = Entry(self.root)

        # Number input fields
        self.number_entry1: Entry = Entry(self.root)
        self.number_entry2: Entry = Entry(self.root)
        self.number_entry1.place(relx=0.5, rely=0.3, anchor="center")
        self.number_entry2.place(relx=0.5, rely=0.4, anchor="center")

        # Operation buttons
        plus_button = Button(self.root, text="+", width=5, command=self._action_plus)
        plus_button.place(relx=0.1, rely=0.7)

        minus_button = Button(self.root, text="-", width=5, command=self._action_minus)
        minus_button.place(relx=0.3, rely=0.7)

        mul_button = Button(self.root, text="*", width=5, command=self._action_mul)
        mul_button.place(relx=0.5, rely=0.7)

        div_button = Button(self.root, text="/", width=5, command=self._action_div)
        div_button.place(relx=0.7, rely=0.7)

        # Author button
        author_button = Button(
            self.root, text="Author", width=6, command=self._action_author
        )
        author_button.place(relx=0.5, rely=0.95, anchor="center")

    def run(self) -> None:
        """Start the tkinter main event loop."""
        self.root.mainloop()

    def _action_author(self) -> None:
        """Show author information in an info dialog."""
        messagebox.showinfo(
            "Author",
            "Pranta Sarker\nBatch: 6th\nDepartment: CSE\nNorth East University Bangladesh",
        )

    def _action_plus(self) -> None:
        """Read inputs, compute sum, and display result."""
        self.operation_label.delete(0, END)
        self.result_entry.delete(0, END)

        self.operation_label.config(fg="red", bg="#9ed8ee")
        self.operation_label.insert(0, "Summation")
        self.operation_label.place(relx=0.5, rely=0.5, anchor="center")

        try:
            a = parse_number(self.number_entry1.get())
            b = parse_number(self.number_entry2.get())
        except ValueError:
            messagebox.showerror(
                "Error", "Enter a Valid number\ne.g. 123, 0.123, .123, -0.123, 123.456"
            )
            return

        result = add(a, b)
        self.result_entry.insert(0, str(result))
        self.result_entry.place(relx=0.5, rely=0.6, anchor="center")

    def _action_minus(self) -> None:
        """Read inputs, compute difference, and display result."""
        self.operation_label.delete(0, END)
        self.result_entry.delete(0, END)

        self.operation_label.config(fg="green", bg="#ece7e2")
        self.operation_label.insert(0, "Subtraction")
        self.operation_label.place(relx=0.5, rely=0.5, anchor="center")

        try:
            a = parse_number(self.number_entry1.get())
            b = parse_number(self.number_entry2.get())
        except ValueError:
            messagebox.showerror(
                "Error", "Enter a Valid number\ne.g. 123, 0.123, .123, -0.123, 123.456"
            )
            return

        result = subtract(a, b)
        self.result_entry.insert(0, str(result))
        self.result_entry.place(relx=0.5, rely=0.6, anchor="center")

    def _action_mul(self) -> None:
        """Read inputs, compute product, and display result."""
        self.operation_label.delete(0, END)
        self.result_entry.delete(0, END)

        self.operation_label.config(fg="blue", bg="#cacba9")
        self.operation_label.insert(0, "Multiplication")
        self.operation_label.place(relx=0.5, rely=0.5, anchor="center")

        try:
            a = parse_number(self.number_entry1.get())
            b = parse_number(self.number_entry2.get())
        except ValueError:
            messagebox.showerror(
                "Error", "Enter a Valid number\ne.g. 123, 0.123, .123, -0.123, 123.456"
            )
            return

        result = multiply(a, b)
        self.result_entry.insert(0, str(result))
        self.result_entry.place(relx=0.5, rely=0.6, anchor="center")

    def _action_div(self) -> None:
        """Read inputs, compute quotient, and display result."""
        self.operation_label.delete(0, END)
        self.result_entry.delete(0, END)

        self.operation_label.config(fg="yellow", bg="#8dad96")
        self.operation_label.insert(0, "Division")
        self.operation_label.place(relx=0.5, rely=0.5, anchor="center")

        try:
            a = parse_number(self.number_entry1.get())
            b = parse_number(self.number_entry2.get())
        except ValueError:
            messagebox.showerror(
                "Error", "Enter a Valid number\ne.g. 123, 0.123, .123, -0.123, 123.456"
            )
            return

        try:
            result = divide(a, b)
        except ValueError as exc:
            messagebox.showerror("Error", str(exc))
            return

        self.result_entry.insert(0, str(result))
        self.result_entry.place(relx=0.5, rely=0.6, anchor="center")
