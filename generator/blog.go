package main

import (
	"text/template"
	"io/ioutil"
)

type Blog struct {
	Page
	Articles []Article
}

type Article struct {
	Page
	Subtitle string
	BodyPath string
	Date string
}

func (a Article) BodyFromPath(path string) (string, error) {
	data, err := ioutil.ReadFile(path)
	if err != nil {
		return "", err
	}

	return string(data), nil
}

func generateBlog() error {
	
	var blog Blog
	if err := ReadJson("data/blog.json", &blog); err != nil {
		return err
	}

	blogTemplate, err := template.New("").ParseFiles("templates/html/main.html", "templates/html/blog/index.html")
	if err != nil {
		return err
	}

	err = TemplateToFile(blog, blogTemplate, "main.html", "static/blog/index.html")
	if err != nil {
		return err
	}

	return nil
}