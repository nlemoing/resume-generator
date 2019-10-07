package main

import (
	"text/template"
	"path/filepath"
	"os/exec"
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

	var files []string
	files, _ = filepath.Glob("templates/html/resume/*")	
	files = append([]string{"templates/html/main.html"}, files...)
	htmlTemplate := template.New("")
	htmlTemplate.Funcs(template.FuncMap{"mod": func(i, j int) int { return i % j }})
	htmlTemplate, err = htmlTemplate.ParseFiles(files...)
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

	cmd := exec.Command("./make_pdf.sh")
	if err := cmd.Run(); err != nil {
		return err
	}
	
	return nil
}