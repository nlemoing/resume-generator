package main

type PersonalDetails struct {
	Name string
	Email string
	Phone string
	GitHub string
	LinkedIn string
	Website string
}

type Description struct {
	Bulleted bool
	Contents []string
}

type SectionItems struct {
	Title string
	Subtitle string
	Subheading string
	Location string
	Date string
	Description Description
}

type Section struct {
	Title string
	Items []SectionItems
	Description Description
}

type Resume struct {
	Details PersonalDetails
	Sections []Section
	SideSections []Section
}