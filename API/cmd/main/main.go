package main

import (
	"github.com/gin-gonic/gin"

	routes "github.com/vidacalura/BoardMatch/routes"
)

func main() {
	r := routes.NovoRouter()


	
	r.Run()
}