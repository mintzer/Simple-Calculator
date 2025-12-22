package httpapi

import (
	"github.com/gin-gonic/gin"
)

// SetupRouter creates and configures a new Gin router with all API endpoints.
// It registers the calculate endpoint, health check endpoint, and serves static files.
//
// staticDir is the directory path containing static files (HTML, CSS, JS).
// Returns a configured *gin.Engine ready to serve HTTP requests.
func SetupRouter(staticDir string) *gin.Engine {
	// Create a new Gin router with default middleware (logger and recovery)
	router := gin.Default()

	// Serve static files from the configured static directory
	// This allows serving CSS, JavaScript, and other static assets
	router.Static("/static", staticDir)

	// Serve index.html as the root page
	router.GET("/", func(c *gin.Context) {
		c.File(staticDir + "/index.html")
	})

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
