package main

import (
	"text/template"
	"io/ioutil"
	"path/filepath"
	"gopkg.in/russross/blackfriday.v2"
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

func (a Article) Body() (string, error) {
	md, err := ioutil.ReadFile(a.BodyPath)
	if err != nil {
		return "", err
	}
	html := blackfriday.Run(md)
	return string(html), nil
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
		article.Styles = append(article.Styles, "article.css")
		out = filepath.Join("static/blog", article.OutputPath)
		err = TemplateToFile(article, articleTemplate, "main.html", out)
		if err != nil {
			return err
		}
	}

	return nil
}