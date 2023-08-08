package routes 

import (
	"github.com/gin-gonic/gin"

	services "github.com/vidacalura/BoardMatch/internals/services"
)

func NovoRouter() *gin.Engine {
	r := gin.Default()

	email := r.Group("/api/email-list")
	{
		email.POST("/", services.RegistrarEmail)
	}

	return r
}