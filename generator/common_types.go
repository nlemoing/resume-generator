package main

import (
	"encoding/json"
	"io/ioutil"
	"text/template"
	"os"
)

type Contact struct {
	Name string
	Email string
	Phone string
	GitHub string
	LinkedIn string
	Website string
}

type Page struct {
	Title string
	Styles []string
	Scripts []string
}

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

var config map[string]string
func (p Page) Config(key string) string {
	if config == nil {
		config = make(map[string]string)
		if err := ReadJson("data/config.json", &config); err != nil {
			panic(err)
		}
	}
	if val, ok := config[key]; ok {
		return val
	}
	return ""
}

func (p Page) Details() Contact {
	var c Contact
	if err := ReadJson("data/contact.json", &c); err != nil {
		panic(err)
	}
	return c
}