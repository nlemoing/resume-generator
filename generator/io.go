package main

import (
	"text/template"
	"os"
	"io/ioutil"
	"encoding/json"
	"regexp"
)

type Formatter struct {
	file *os.File
}

var emptylineRegex *regexp.Regexp = regexp.MustCompile("\n([\t\f\r\v ]*\n)+")
func (f Formatter) Write(p []byte) (n int, err error) {
	p = emptylineRegex.ReplaceAll(p, []byte("\n"))
	n, err = f.file.Write(p)
	return
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
	defer outputFile.Close()

	f := Formatter{outputFile}
	
	err = t.ExecuteTemplate(f, name, data)
	if err != nil {
		return err
	}

	return nil
}