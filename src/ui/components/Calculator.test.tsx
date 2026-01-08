import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from './Calculator';

/**
 * Test suite for the Calculator component.
 * Verifies:
 * - Component rendering (inputs, buttons, result area)
 * - Addition operation with valid inputs
 * - Operation-specific color scheme for addition
 * - Error handling for invalid inputs
 * - Author button functionality
 * - Stub buttons for other operations
 */
describe('Calculator Component', () => {
  it('renders two input fields', () => {
    render(<Calculator />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(2);
  });

  it('renders four operation buttons', () => {
    render(<Calculator />);
    const addButton = screen.getByRole('button', { name: /addition/i });
    const subtractButton = screen.getByRole('button', { name: /subtraction/i });
    const multiplyButton = screen.getByRole('button', { name: /multiplication/i });
    const divideButton = screen.getByRole('button', { name: /division/i });

    expect(addButton).toBeInTheDocument();
    expect(subtractButton).toBeInTheDocument();
    expect(multiplyButton).toBeInTheDocument();
    expect(divideButton).toBeInTheDocument();
  });

  it('renders author button', () => {
    render(<Calculator />);
    const authorButton = screen.getByRole('button', { name: /author/i });
    expect(authorButton).toBeInTheDocument();
  });

  it('performs addition with valid integer inputs', () => {
    render(<Calculator />);
    const inputs = screen.getAllByRole('textbox');
    const addButton = screen.getByRole('button', { name: /addition/i });

    // Enter valid numbers
    fireEvent.change(inputs[0], { target: { value: '5' } });
    fireEvent.change(inputs[1], { target: { value: '3' } });

    // Click addition button
    fireEvent.click(addButton);

    // Verify result is displayed
    expect(screen.getByText('Summation')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
  });

  it('performs addition with valid float inputs', () => {
    render(<Calculator />);
    const inputs = screen.getAllByRole('textbox');
    const addButton = screen.getByRole('button', { name: /addition/i });

    // Enter valid decimal numbers
    fireEvent.change(inputs[0], { target: { value: '1.5' } });
    fireEvent.change(inputs[1], { target: { value: '2.3' } });

    // Click addition button
    fireEvent.click(addButton);

    // Verify result is displayed (1.5 + 2.3 = 3.8)
    expect(screen.getByText('Summation')).toBeInTheDocument();
    expect(screen.getByText('3.8')).toBeInTheDocument();
  });

  it('performs addition with negative numbers', () => {
    render(<Calculator />);
    const inputs = screen.getAllByRole('textbox');
    const addButton = screen.getByRole('button', { name: /addition/i });

    // Enter negative numbers
    fireEvent.change(inputs[0], { target: { value: '-5' } });
    fireEvent.change(inputs[1], { target: { value: '3' } });

    // Click addition button
    fireEvent.click(addButton);

    // Verify result is displayed (-5 + 3 = -2)
    expect(screen.getByText('Summation')).toBeInTheDocument();
    expect(screen.getByText('-2')).toBeInTheDocument();
  });

  it('performs addition with decimal format like .123', () => {
    render(<Calculator />);
    const inputs = screen.getAllByRole('textbox');
    const addButton = screen.getByRole('button', { name: /addition/i });

    // Enter numbers in decimal format
    fireEvent.change(inputs[0], { target: { value: '.5' } });
    fireEvent.change(inputs[1], { target: { value: '.3' } });

    // Click addition button
    fireEvent.click(addButton);

    // Verify result is displayed (.5 + .3 = 0.8)
    expect(screen.getByText('Summation')).toBeInTheDocument();
    expect(screen.getByText('0.8')).toBeInTheDocument();
  });

  it('applies addition color scheme to result area', () => {
    render(<Calculator />);
    const inputs = screen.getAllByRole('textbox');
    const addButton = screen.getByRole('button', { name: /addition/i });

    // Enter valid numbers and perform addition
    fireEvent.change(inputs[0], { target: { value: '5' } });
    fireEvent.change(inputs[1], { target: { value: '3' } });
    fireEvent.click(addButton);

    // Find the result container
    const resultContainer = screen.getByText('Summation').closest('.result-container');
    expect(resultContainer).toHaveClass('addition-result');

    // Verify CSS classes are applied (the actual color styles are in CSS)
    // The addition-result class should apply red text and #9ed8ee background
  });

  it('displays error message for invalid first input', () => {
    render(<Calculator />);
    const inputs = screen.getAllByRole('textbox');
    const addButton = screen.getByRole('button', { name: /addition/i });

    // Enter invalid first number
    fireEvent.change(inputs[0], { target: { value: 'abc' } });
    fireEvent.change(inputs[1], { target: { value: '3' } });

    // Click addition button
    fireEvent.click(addButton);

    // Verify error message is displayed
    expect(screen.getByText('Summation')).toBeInTheDocument();
    expect(screen.getByText(/Enter a Valid number/)).toBeInTheDocument();
    expect(screen.getByText(/e\.g\. 123, 0\.123, \.123, -0\.123, 123\.456/)).toBeInTheDocument();
  });

  it('displays error message for invalid second input', () => {
    render(<Calculator />);
    const inputs = screen.getAllByRole('textbox');
    const addButton = screen.getByRole('button', { name: /addition/i });

    // Enter invalid second number
    fireEvent.change(inputs[0], { target: { value: '5' } });
    fireEvent.change(inputs[1], { target: { value: 'xyz' } });

    // Click addition button
    fireEvent.click(addButton);

    // Verify error message is displayed
    expect(screen.getByText('Summation')).toBeInTheDocument();
    expect(screen.getByText(/Enter a Valid number/)).toBeInTheDocument();
  });

  it('displays error message for empty inputs', () => {
    render(<Calculator />);
    const addButton = screen.getByRole('button', { name: /addition/i });

    // Click addition button without entering numbers
    fireEvent.click(addButton);

    // Verify error message is displayed
    expect(screen.getByText('Summation')).toBeInTheDocument();
    expect(screen.getByText(/Enter a Valid number/)).toBeInTheDocument();
  });

  it('displays author information when author button is clicked', () => {
    // Mock window.alert
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(<Calculator />);
    const authorButton = screen.getByRole('button', { name: /author/i });

    // Click author button
    fireEvent.click(authorButton);

    // Verify alert was called with correct author information
    expect(alertMock).toHaveBeenCalledWith(
      expect.stringContaining('Pranta Sarker')
    );
    expect(alertMock).toHaveBeenCalledWith(
      expect.stringContaining('Batch: 6th')
    );
    expect(alertMock).toHaveBeenCalledWith(
      expect.stringContaining('Department: CSE')
    );
    expect(alertMock).toHaveBeenCalledWith(
      expect.stringContaining('North East University Bangladesh')
    );

    alertMock.mockRestore();
  });

  it('shows not implemented message for subtraction button', () => {
    // Mock window.alert
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(<Calculator />);
    const subtractButton = screen.getByRole('button', { name: /subtraction/i });

    // Click subtraction button
    fireEvent.click(subtractButton);

    // Verify alert shows "not yet implemented"
    expect(alertMock).toHaveBeenCalledWith(
      expect.stringContaining('not yet implemented')
    );

    alertMock.mockRestore();
  });

  it('shows not implemented message for multiplication button', () => {
    // Mock window.alert
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(<Calculator />);
    const multiplyButton = screen.getByRole('button', { name: /multiplication/i });

    // Click multiplication button
    fireEvent.click(multiplyButton);

    // Verify alert shows "not yet implemented"
    expect(alertMock).toHaveBeenCalledWith(
      expect.stringContaining('not yet implemented')
    );

    alertMock.mockRestore();
  });

  it('shows not implemented message for division button', () => {
    // Mock window.alert
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(<Calculator />);
    const divideButton = screen.getByRole('button', { name: /division/i });

    // Click division button
    fireEvent.click(divideButton);

    // Verify alert shows "not yet implemented"
    expect(alertMock).toHaveBeenCalledWith(
      expect.stringContaining('not yet implemented')
    );

    alertMock.mockRestore();
  });

  it('updates result when performing multiple additions', () => {
    render(<Calculator />);
    const inputs = screen.getAllByRole('textbox');
    const addButton = screen.getByRole('button', { name: /addition/i });

    // First addition
    fireEvent.change(inputs[0], { target: { value: '5' } });
    fireEvent.change(inputs[1], { target: { value: '3' } });
    fireEvent.click(addButton);
    expect(screen.getByText('8')).toBeInTheDocument();

    // Second addition with different numbers
    fireEvent.change(inputs[0], { target: { value: '10' } });
    fireEvent.change(inputs[1], { target: { value: '20' } });
    fireEvent.click(addButton);
    expect(screen.getByText('30')).toBeInTheDocument();
  });

  it('clears error when valid calculation follows invalid input', () => {
    render(<Calculator />);
    const inputs = screen.getAllByRole('textbox');
    const addButton = screen.getByRole('button', { name: /addition/i });

    // First, trigger an error
    fireEvent.change(inputs[0], { target: { value: 'abc' } });
    fireEvent.change(inputs[1], { target: { value: '3' } });
    fireEvent.click(addButton);
    expect(screen.getByText(/Enter a Valid number/)).toBeInTheDocument();

    // Then, perform valid calculation
    fireEvent.change(inputs[0], { target: { value: '5' } });
    fireEvent.change(inputs[1], { target: { value: '3' } });
    fireEvent.click(addButton);

    // Error should be cleared and result should be shown
    expect(screen.queryByText(/Enter a Valid number/)).not.toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
  });
});
