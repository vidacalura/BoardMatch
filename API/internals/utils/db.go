package utils

import (
	"database/sql"
	"log"
	"os"

	"github.com/joho/godotenv"
)

func ConectarDB() *sql.DB {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}

	db, err := sql.Open("mysql", os.Getenv("DSN"))
	if err != nil {
    	log.Fatal(err)
	}

	if err = db.Ping(); err != nil {
		log.Fatal(err)
	}

	return db
}