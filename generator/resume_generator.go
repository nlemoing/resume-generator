package main

import (
	"text/template"
	"os"
	"io/ioutil"
	"encoding/json"
	"path/filepath"
)

var BASE_PATH = "/home/nlemoing/resume-generator"

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

func main() {
	resumeRawData, err := ioutil.ReadFile(filepath.Join(BASE_PATH, "data/resume.json"))
	if err != nil {
		panic(err)
	}

	var resumeParsedData Resume
	if err = json.Unmarshal(resumeRawData, &resumeParsedData); err != nil {
		panic(err)
	}

	texTemplate := template.New("").Delims("<", ">")
	texTemplate, err = texTemplate.ParseGlob(filepath.Join(BASE_PATH, "templates/tex/*"))
	if err != nil {
		panic(err)
	}

	err = generateResumeFromTemplate(resumeParsedData, texTemplate, "main.tex", filepath.Join(BASE_PATH, "data/resume.tex"))
	if err != nil {
		panic(err)
	}

}