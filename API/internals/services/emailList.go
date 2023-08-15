package services 

import (
	"database/sql"
	"io/ioutil"
	"encoding/json"
	"log"
	"net/http"	
	"os"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"

	models "github.com/vidacalura/BoardMatch/internals/models"
)

var DB *sql.DB

func RegistrarEmail(c *gin.Context) {
	var emailReq models.EmailRequest

	err := c.BindJSON(&emailReq)
	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{ "error": "Dados incorretos ou insuficientes." })
		return
	}

	if !emailEhValido(emailReq.Email) {
		c.IndentedJSON(http.StatusBadRequest, gin.H{ "error": "Este email é inválido. Favor inserir um email válido." })
		return
	}

	// Insere email no banco
	_, err = DB.Exec("INSERT INTO EmailList (email, data_cad) VALUES(?, NOW());", emailReq.Email)
	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{ "error": "Erro ao registrar email no banco de dados. Tente novamente mais tarde." })
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{ "message": "Email registrado com sucesso!" })
}

func emailEhValido(email string) bool {
	APIEndpoint := "https://api.emailable.com/v1/verify?email=" + email +
		"&api_key=" + os.Getenv("emailable_key")

	resp, err := http.Get(APIEndpoint)
	if err != nil {
		log.Println(err)
		return false
	}

	defer resp.Body.Close()
	resBody, err := ioutil.ReadAll(resp.Body)

	var res models.ResEmailable
    if err := json.Unmarshal(resBody, &res); err != nil {
        log.Println(err)
		return false
    }

	if res.State == "undeliverable" ||
	res.State == "unknown" {
		return false
	}

	return true
}