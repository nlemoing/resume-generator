package main

import (
	"text/template"
	"os"
	"io/ioutil"
	"encoding/json"
	"path/filepath"
)

var BASE_PATH = "/home/nlemoing/web"

func generateResumeFromTemplate(r Resume, t *template.Template, outputPath string) error {
	outputFile, err := os.Create(outputPath)
	if err != nil {
		return err
	}
	
	err = t.Execute(outputFile, r)
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

	texTemplate := template.New("texTemplate").Delims("<", ">")
	texTemplateData, err := ioutil.ReadFile(filepath.Join(BASE_PATH, "templates/resume.tex"))
	if err != nil {
		panic(err)
	}
	texTemplate, err = texTemplate.Parse(string(texTemplateData))
	if err != nil {
		panic(err)
	}

	err = generateResumeFromTemplate(resumeParsedData, texTemplate, filepath.Join(BASE_PATH, "data/resume.tex"))
	if err != nil {
		panic(err)
	}

}