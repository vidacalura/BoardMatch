package routes 

import (
	"github.com/gin-gonic/gin"

	services "github.com/vidacalura/BoardMatch/internals/services"
	utils "github.com/vidacalura/BoardMatch/internals/utils"
)

func NovoRouter() *gin.Engine {
	services.DB = utils.ConectarDB()
	r := gin.Default()

	email := r.Group("/api/email-list")
	{
		email.POST("/", services.RegistrarEmail)
	}

	return r
}