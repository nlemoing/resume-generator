package main

type PersonalDetails struct {
	Name string
	Email string
	Phone string
	GitHub string
	LinkedIn string
	Website string
}

type SectionItems struct {
	Title string
	Subtitle string
	Subheading string
	Location string
	Date string
	Description []string
}

type Section struct {
	Title string
	Items []SectionItems
}

type Resume struct {
	Details PersonalDetails
	Sections []Section
	SideSections []Section
}