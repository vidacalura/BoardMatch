package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/gin-contrib/cors"

	routes "github.com/vidacalura/BoardMatch/internals/routes"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}

	r := routes.NovoRouter()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
        AllowMethods:     []string{"PUT", "GET", "POST", "DELETE"},
        AllowHeaders: 	  []string{"*"},
        AllowCredentials: true,
	}))
	
	r.Run("0.0.0.0:" + os.Getenv("PORT"))
}