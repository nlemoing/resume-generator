package main

import (
	"text/template"
	"os"
	"io/ioutil"
	"encoding/json"
)

func ReadJson(path string, output interface{}) error {
	
	data, err := ioutil.ReadFile(path)
	if err != nil {
		return err
	}

	if err = json.Unmarshal(data, &output); err != nil {
		return err
	}
	
	return nil
}

func TemplateToFile(data interface{}, t *template.Template, name string, outputPath string) error {
	outputFile, err := os.Create(outputPath)
	if err != nil {
		return err
	}
	
	err = t.ExecuteTemplate(outputFile, name, data)
	if err != nil {
		return err
	}

	return nil
}