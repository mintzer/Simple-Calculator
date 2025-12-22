package httpapi

// CalculateRequest represents a request to perform a calculation.
// The request includes two numeric strings and an operation to perform.
type CalculateRequest struct {
	// Num1 is the first operand as a string
	Num1 string `json:"num1"`
	// Num2 is the second operand as a string
	Num2 string `json:"num2"`
	// Operation is the arithmetic operation to perform: "add", "subtract", "multiply", "divide"
	// Currently only "add" is supported in this milestone
	Operation string `json:"operation"`
}

// CalculateResponse represents a successful calculation response.
// It includes the operation name and the calculated result.
type CalculateResponse struct {
	// OperationName is the human-readable name of the operation (e.g., "Summation")
	OperationName string `json:"operationName"`
	// Result is the calculated result as a string
	Result string `json:"result"`
}

// ErrorResponse represents an error response.
// It includes an error message describing what went wrong.
type ErrorResponse struct {
	// Error is the error message
	Error string `json:"error"`
}

// HealthResponse represents a health check response.
type HealthResponse struct {
	// Status indicates the health status of the service
	Status string `json:"status"`
}
