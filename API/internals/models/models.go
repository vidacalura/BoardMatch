package models 

type EmailRequest struct {
	Email string `json:"email"`
}

type ResEmailable struct {
	State string `json:"state"`
}