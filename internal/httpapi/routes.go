package httpapi

import (
	"github.com/gin-gonic/gin"
)

// SetupRouter creates and configures a new Gin router with all API endpoints.
// It registers the calculate endpoint and health check endpoint.
//
// Returns a configured *gin.Engine ready to serve HTTP requests.
func SetupRouter() *gin.Engine {
	// Create a new Gin router with default middleware (logger and recovery)
	router := gin.Default()

	// API routes
	api := router.Group("/api")
	{
		// POST /api/calculate - Perform a calculation
		api.POST("/calculate", HandleCalculate)
	}

	// Health check endpoint
	router.GET("/health", HandleHealth)

	return router
}
