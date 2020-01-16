package main

type Contact struct {
	FirstName string
	LastName string
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