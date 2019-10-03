package main

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
	Sections []Section
	SideSections []Section
	Page
}