package main

import (
	"text/template"
	"path/filepath"
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
	Link string
	Description Description
}

type Section struct {
	Title string
	Items []SectionItems
	Description Description
	Position int
}

type Resume struct {
	Tagline []string
	Sections []Section
	SideSections []Section
	Page
}

func generateResume() error {

	var resumeParsedData Resume
	if err := ReadJson("data/resume.json", &resumeParsedData); err != nil {
		return err
	}
	ii := len(resumeParsedData.Sections)
	jj := len(resumeParsedData.SideSections)
	for i := 0; i < ii; i++ {
		resumeParsedData.Sections[i].Position = i;
	}
	for j := 0; j < jj; j++ {
		resumeParsedData.SideSections[j].Position = j + ii;
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
	
	return nil
}