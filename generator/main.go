package main

import (
	"os"
)

var BASEPATH = os.Getenv("RESUME_BASE_PATH")

func main() {
	
	os.Chdir(BASEPATH)

	err := generateResume()
	if err != nil {
		panic(err)
	}

	err = generateBlog()
	if err != nil {
		panic(err)
	}

	err = generateHomepage()
	if err != nil {
		panic(err)
	}
}