package main

import (
	"text/template"
	"os"
	"io/ioutil"
	"encoding/json"
	"regexp"
	"bytes"
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

var emptylineRegex *regexp.Regexp = regexp.MustCompile("\n([\t ]*\n)+")
func TemplateToFile(data interface{}, t *template.Template, name string, outputPath string) error {

	var b bytes.Buffer
	err := t.ExecuteTemplate(&b, name, data)
	if err != nil {
		return err
	}
	output := emptylineRegex.ReplaceAll(b.Bytes(), []byte("\n"))
	outputFile, err := os.Create(outputPath)
	if err != nil {
		return err
	}
	defer outputFile.Close()
	_, err = outputFile.Write(output)
	if err != nil {
		return err
	}
	return nil
}