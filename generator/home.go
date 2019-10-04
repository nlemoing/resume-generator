package main

import (
	"text/template"
)

type Home struct {
	Page
	Introduction string
}

func generateHomepage() error {

	var home Home
	if err := ReadJson("data/home.json", &home); err != nil {
		return err
	}

	homeTemplate, err := template.New("").ParseFiles("templates/html/main.html", "templates/html/home/index.html")
	if err != nil {
		return err
	}

	err = TemplateToFile(home, homeTemplate, "main.html", "static/index.html")
	if err != nil {
		return err
	}

	return nil
}