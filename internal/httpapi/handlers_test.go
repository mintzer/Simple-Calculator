package httpapi

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/example/simple-calculator/internal/validation"
)

// TestHandleCalculate_SuccessfulAddition tests the calculate endpoint with valid addition inputs.
func TestHandleCalculate_SuccessfulAddition(t *testing.T) {
	router := SetupRouter("./static")

	tests := []struct {
		name             string
		num1             string
		num2             string
		expectedResult   string
		expectedOpName   string
	}{
		{
			name:           "Add two integers",
			num1:           "5",
			num2:           "3",
			expectedResult: "8",
			expectedOpName: "Summation",
		},
		{
			name:           "Add two floats",
			num1:           "5.5",
			num2:           "3.3",
			expectedResult: "8.8",
			expectedOpName: "Summation",
		},
		{
			name:           "Add integer and float",
			num1:           "5",
			num2:           "3.5",
			expectedResult: "8.5",
			expectedOpName: "Summation",
		},
		{
			name:           "Add negative numbers",
			num1:           "-5",
			num2:           "-3",
			expectedResult: "-8",
			expectedOpName: "Summation",
		},
		{
			name:           "Add leading decimal format",
			num1:           ".5",
			num2:           ".3",
			expectedResult: "0.8",
			expectedOpName: "Summation",
		},
		{
			name:           "Add negative leading decimal",
			num1:           "-.5",
			num2:           "-.3",
			expectedResult: "-0.8",
			expectedOpName: "Summation",
		},
		{
			name:           "Add positive sign prefix",
			num1:           "+5",
			num2:           "+3",
			expectedResult: "8",
			expectedOpName: "Summation",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Create request
			reqBody := CalculateRequest{
				Num1:      tt.num1,
				Num2:      tt.num2,
				Operation: "add",
			}
			jsonBytes, _ := json.Marshal(reqBody)

			req, _ := http.NewRequest(http.MethodPost, "/api/calculate", bytes.NewBuffer(jsonBytes))
			req.Header.Set("Content-Type", "application/json")

			// Create response recorder
			w := httptest.NewRecorder()

			// Perform request
			router.ServeHTTP(w, req)

			// Check status code
			if w.Code != http.StatusOK {
				t.Errorf("Expected status %d, got %d. Body: %s", http.StatusOK, w.Code, w.Body.String())
				return
			}

			// Parse response
			var resp CalculateResponse
			if err := json.Unmarshal(w.Body.Bytes(), &resp); err != nil {
				t.Fatalf("Failed to parse response: %v", err)
			}

			// Verify operation name
			if resp.OperationName != tt.expectedOpName {
				t.Errorf("Expected operation name %q, got %q", tt.expectedOpName, resp.OperationName)
			}

			// Verify result
			if resp.Result != tt.expectedResult {
				t.Errorf("Expected result %q, got %q", tt.expectedResult, resp.Result)
			}
		})
	}
}

// TestHandleCalculate_ValidationErrors tests the calculate endpoint with invalid inputs.
func TestHandleCalculate_ValidationErrors(t *testing.T) {
	router := SetupRouter("./static")

	tests := []struct {
		name          string
		reqBody       string
		expectedError string
	}{
		{
			name:          "Empty num1",
			reqBody:       `{"num1": "", "num2": "5", "operation": "add"}`,
			expectedError: validation.ValidationError,
		},
		{
			name:          "Empty num2",
			reqBody:       `{"num1": "5", "num2": "", "operation": "add"}`,
			expectedError: validation.ValidationError,
		},
		{
			name:          "Invalid num1",
			reqBody:       `{"num1": "abc", "num2": "5", "operation": "add"}`,
			expectedError: validation.ValidationError,
		},
		{
			name:          "Invalid num2",
			reqBody:       `{"num1": "5", "num2": "xyz", "operation": "add"}`,
			expectedError: validation.ValidationError,
		},
		{
			name:          "Multiple decimal points",
			reqBody:       `{"num1": "5.5.5", "num2": "3", "operation": "add"}`,
			expectedError: validation.ValidationError,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Create request
			req, _ := http.NewRequest(http.MethodPost, "/api/calculate", bytes.NewBufferString(tt.reqBody))
			req.Header.Set("Content-Type", "application/json")

			// Create response recorder
			w := httptest.NewRecorder()

			// Perform request
			router.ServeHTTP(w, req)

			// Check status code
			if w.Code != http.StatusBadRequest {
				t.Errorf("Expected status %d, got %d", http.StatusBadRequest, w.Code)
				return
			}

			// Parse response
			var resp ErrorResponse
			if err := json.Unmarshal(w.Body.Bytes(), &resp); err != nil {
				t.Fatalf("Failed to parse error response: %v", err)
			}

			// Verify error message
			if resp.Error != tt.expectedError {
				t.Errorf("Expected error %q, got %q", tt.expectedError, resp.Error)
			}
		})
	}
}

// TestHandleCalculate_UnsupportedOperation tests the calculate endpoint with unsupported operations.
func TestHandleCalculate_UnsupportedOperation(t *testing.T) {
	router := SetupRouter("./static")

	tests := []struct {
		name      string
		operation string
	}{
		{"Subtract operation", "subtract"},
		{"Multiply operation", "multiply"},
		{"Divide operation", "divide"},
		{"Unknown operation", "unknown"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Create request
			reqBody := CalculateRequest{
				Num1:      "5",
				Num2:      "3",
				Operation: tt.operation,
			}
			jsonBytes, _ := json.Marshal(reqBody)

			req, _ := http.NewRequest(http.MethodPost, "/api/calculate", bytes.NewBuffer(jsonBytes))
			req.Header.Set("Content-Type", "application/json")

			// Create response recorder
			w := httptest.NewRecorder()

			// Perform request
			router.ServeHTTP(w, req)

			// Check status code
			if w.Code != http.StatusBadRequest {
				t.Errorf("Expected status %d, got %d", http.StatusBadRequest, w.Code)
				return
			}

			// Parse response
			var resp ErrorResponse
			if err := json.Unmarshal(w.Body.Bytes(), &resp); err != nil {
				t.Fatalf("Failed to parse error response: %v", err)
			}

			// Verify error message contains "Unsupported operation"
			if resp.Error[:21] != "Unsupported operation" {
				t.Errorf("Expected error to start with 'Unsupported operation', got %q", resp.Error)
			}
		})
	}
}

// TestHandleCalculate_MalformedRequest tests the calculate endpoint with malformed JSON.
func TestHandleCalculate_MalformedRequest(t *testing.T) {
	router := SetupRouter("./static")

	tests := []struct {
		name    string
		body    string
	}{
		{"Invalid JSON", "{invalid}"},
		{"Missing num1", `{"num2": "5", "operation": "add"}`},
		{"Missing num2", `{"num1": "5", "operation": "add"}`},
		{"Missing operation", `{"num1": "5", "num2": "3"}`},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			req, _ := http.NewRequest(http.MethodPost, "/api/calculate", bytes.NewBufferString(tt.body))
			req.Header.Set("Content-Type", "application/json")

			// Create response recorder
			w := httptest.NewRecorder()

			// Perform request
			router.ServeHTTP(w, req)

			// Check status code
			if w.Code != http.StatusBadRequest {
				t.Errorf("Expected status %d, got %d", http.StatusBadRequest, w.Code)
			}
		})
	}
}

// TestHandleHealth tests the health check endpoint.
func TestHandleHealth(t *testing.T) {
	router := SetupRouter("./static")

	req, _ := http.NewRequest(http.MethodGet, "/health", nil)
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	// Check status code
	if w.Code != http.StatusOK {
		t.Errorf("Expected status %d, got %d", http.StatusOK, w.Code)
	}

	// Parse response
	var resp HealthResponse
	if err := json.Unmarshal(w.Body.Bytes(), &resp); err != nil {
		t.Fatalf("Failed to parse health response: %v", err)
	}

	// Verify status
	if resp.Status != "ok" {
		t.Errorf("Expected status %q, got %q", "ok", resp.Status)
	}
}
