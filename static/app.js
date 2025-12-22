/**
 * Simple Calculator Web Frontend
 * JavaScript for interacting with the Go backend API
 *
 * This implements the client-side logic for the calculator,
 * making API calls to POST /api/calculate and displaying results.
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationDisplay = document.getElementById('operation-name');
    const resultDisplay = document.getElementById('result');
    const errorMessage = document.getElementById('error-message');

    // Get buttons
    const addButton = document.getElementById('btn-add');
    const subtractButton = document.getElementById('btn-subtract');
    const multiplyButton = document.getElementById('btn-multiply');
    const divideButton = document.getElementById('btn-divide');
    const authorButton = document.getElementById('btn-author');

    /**
     * Clear the result and error displays
     */
    function clearDisplays() {
        operationDisplay.textContent = '';
        operationDisplay.className = 'operation-display';
        resultDisplay.textContent = '';
        resultDisplay.className = 'result-display';
        errorMessage.textContent = '';
        errorMessage.classList.remove('visible');
    }

    /**
     * Display an error message
     * @param {string} message - The error message to display
     */
    function showError(message) {
        clearDisplays();
        errorMessage.textContent = message;
        errorMessage.classList.add('visible');
    }

    /**
     * Display the calculation result
     * @param {string} operationName - The name of the operation (e.g., "Summation")
     * @param {string} result - The calculated result
     * @param {string} colorClass - CSS class for operation-specific styling
     */
    function showResult(operationName, result, colorClass) {
        clearDisplays();

        // Display operation name with color scheme (lines 48, 66 from Python)
        operationDisplay.textContent = operationName;
        operationDisplay.classList.add(colorClass);

        // Display result with color scheme for the result display area
        resultDisplay.textContent = result;
        resultDisplay.classList.add(colorClass);
    }

    /**
     * Perform a calculation by calling the backend API
     * @param {string} operation - The operation to perform ("add", "subtract", "multiply", "divide")
     * @param {string} colorClass - CSS class for operation-specific styling
     */
    async function performCalculation(operation, colorClass) {
        // Get input values
        const num1 = num1Input.value.trim();
        const num2 = num2Input.value.trim();

        // Build the request payload matching models.go structure
        const requestData = {
            num1: num1,
            num2: num2,
            operation: operation
        };

        try {
            // Make API call to POST /api/calculate
            const response = await fetch('/api/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            // Parse JSON response
            const data = await response.json();

            if (response.ok) {
                // Success - display the result
                // data.operationName comes from CalculateResponse.OperationName
                // data.result comes from CalculateResponse.Result
                showResult(data.operationName, data.result, colorClass);
            } else {
                // Error response from backend
                // data.error comes from ErrorResponse.Error (line 73 validation message)
                showError(data.error || 'An error occurred');
            }
        } catch (error) {
            // Network or other error
            showError('Failed to connect to server. Please try again.');
            console.error('API call failed:', error);
        }
    }

    /**
     * Show author information
     * Implements the actionauthor() function from Python (lines 15-16)
     */
    function showAuthorInfo() {
        // Display author info similar to Python's messagebox.showinfo
        // Using browser alert for simplicity (could be enhanced with a modal)
        alert('Author\n\nPranta Sarker\nBatch: 6th\nDepartment: CSE\nNorth East University Bangladesh');
    }

    // Event listeners for operation buttons

    // Addition button (line 190: actionPlus, color scheme lines 48, 66)
    addButton.addEventListener('click', function() {
        performCalculation('add', 'color-add');
    });

    // Subtraction button (disabled for Milestone 1)
    subtractButton.addEventListener('click', function() {
        showError('Subtraction will be implemented in Milestone 2');
    });

    // Multiplication button (disabled for Milestone 1)
    multiplyButton.addEventListener('click', function() {
        showError('Multiplication will be implemented in Milestone 2');
    });

    // Division button (disabled for Milestone 1)
    divideButton.addEventListener('click', function() {
        showError('Division will be implemented in Milestone 2');
    });

    // Author button (lines 202-203: actionauthor)
    authorButton.addEventListener('click', showAuthorInfo);

    // Allow Enter key in input fields to trigger addition
    num1Input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            performCalculation('add', 'color-add');
        }
    });

    num2Input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            performCalculation('add', 'color-add');
        }
    });

    // Focus on first input field when page loads
    num1Input.focus();
});
