package main

import (
	"text/template"
)

type Description struct {
	Bulleted bool
	Contents []string
}

type SectionItems struct {
	Title string
	Subtitle string
	Subheading string
	Location string
	Date string
	Description Description
}

type Section struct {
	Title string
	Items []SectionItems
	Description Description
}

type Resume struct {
	Sections []Section
	SideSections []Section
	Page
}

func generateResume() error {

	var resumeParsedData Resume
	if err := ReadJson("data/resume.json", &resumeParsedData); err != nil {
		return err
	}

	texTemplate, err := template.New("").Delims("<", ">").ParseGlob("templates/tex/*")
	if err != nil {
		return err
	}

	htmlTemplate, err := template.New("").ParseFiles("templates/html/main.html", "templates/html/resume/index.html")
	if err != nil {
		return err
	}

	err = TemplateToFile(resumeParsedData, texTemplate, "main.tex", "output/resume.tex")
	if err != nil {
		return err
	}

	err = TemplateToFile(resumeParsedData, htmlTemplate, "main.html", "static/resume/index.html")
	if err != nil {
		return err
	}
	
	return nil
}