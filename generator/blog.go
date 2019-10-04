package main

import (
	"text/template"
	"io/ioutil"
	"path/filepath"
)

type Blog struct {
	Page
	Articles []Article
}

type Article struct {
	Page
	Subtitle string
	BodyPath string
	OutputPath string
	Date string
}

func (a Article) BodyFromPath() (string, error) {
	data, err := ioutil.ReadFile(a.BodyPath)
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

	articleTemplate, err := template.New("").ParseFiles("templates/html/main.html", "templates/html/article/index.html")
	if err != nil {
		return err
	}
	var out string
	for _, article := range blog.Articles {
		out = filepath.Join("static/blog", article.OutputPath)
		err = TemplateToFile(article, articleTemplate, "main.html", out)
		if err != nil {
			return err
		}
	}

	return nil
}