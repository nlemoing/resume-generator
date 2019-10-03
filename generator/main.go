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
}