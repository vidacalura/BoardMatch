package utils

import (
	"database/sql"
	"log"
	"os"

	"github.com/joho/godotenv"
)

func ConectarDB(db *sql.DB) *sql.DB {
	if db != nil {
		return db
	}

	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}

	db, err = sql.Open("mysql", os.Getenv("connection_string"))
	if err != nil {
    	log.Fatal(err)
	}

	if err = db.Ping(); err != nil {
		log.Fatal(err)
	}

	return db
}