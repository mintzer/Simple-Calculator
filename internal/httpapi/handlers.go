package httpapi

import (
	"net/http"

	"github.com/example/simple-calculator/internal/calculator"
	"github.com/example/simple-calculator/internal/validation"
	"github.com/gin-gonic/gin"
)

// HandleCalculate handles POST /api/calculate requests.
// It validates the input numbers, performs the requested calculation,
// and returns the result or an error response.
//
// This implements the core logic from the Python actionPlus() function (lines 44-73),
// adapted for HTTP request/response handling.
func HandleCalculate(c *gin.Context) {
	var req CalculateRequest

	// Bind and validate JSON request
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error: "Invalid request format",
		})
		return
	}

	// Validate that operation is provided
	if req.Operation == "" {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error: "operation field is required",
		})
		return
	}

	// Validate num1
	if err := validation.ValidateNumber(req.Num1); err != nil {
		// Return the original Python error message (line 73)
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error: validation.ValidationError,
		})
		return
	}

	// Validate num2
	if err := validation.ValidateNumber(req.Num2); err != nil {
		// Return the original Python error message (line 73)
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error: validation.ValidationError,
		})
		return
	}

	// Parse the validated numbers
	val1, isInt1, err := validation.ParseNumber(req.Num1)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error: "Failed to parse num1",
		})
		return
	}

	val2, isInt2, err := validation.ParseNumber(req.Num2)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error: "Failed to parse num2",
		})
		return
	}

	// Perform the requested operation
	var result string
	var operationName string

	switch req.Operation {
	case "add":
		// This corresponds to actionPlus() from lines 44-73
		// Operation name from line 49, 67: "Summation"
		operationName = "Summation"
		result = calculator.Add(val1, isInt1, val2, isInt2)

	default:
		// Unsupported operation
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error: "Unsupported operation: " + req.Operation,
		})
		return
	}

	// Return successful response
	c.JSON(http.StatusOK, CalculateResponse{
		OperationName: operationName,
		Result:        result,
	})
}

// HandleHealth handles GET /health requests.
// It returns a simple health status indicating the service is running.
func HandleHealth(c *gin.Context) {
	c.JSON(http.StatusOK, HealthResponse{
		Status: "ok",
	})
}
