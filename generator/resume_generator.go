package main

import (
	"text/template"
	"os"
)


func generateResumeFromTemplate(r Resume, t *template.Template, tname string, outputPath string) error {
	outputFile, err := os.Create(outputPath)
	if err != nil {
		return err
	}
	
	err = t.ExecuteTemplate(outputFile, tname, r)
	if err != nil {
		return err
	}

	return nil
}

func generateResume() error {

	var resumeParsedData Resume
	if err := ReadJson("data/resume.json", &resumeParsedData); err != nil {
		return err
	}

	texTemplate := template.New("").Delims("<", ">")
	texTemplate, err := texTemplate.ParseGlob("templates/tex/*")
	if err != nil {
		return err
	}

	htmlTemplate, err := template.New("").ParseFiles("templates/html/main.html", "templates/html/content/resume.html")
	if err != nil {
		return err
	}

	err = generateResumeFromTemplate(resumeParsedData, texTemplate, "main.tex", "output/resume.tex")
	if err != nil {
		return err
	}

	err = generateResumeFromTemplate(resumeParsedData, htmlTemplate, "main.html", "static/resume/index.html")
	if err != nil {
		return err
	}
	
	return nil
}