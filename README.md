# Templated Resume Generator

This repository hosts the code required to generate my static personal site, [lemoing.ca](https://lemoing.ca).

It originally started off as a Go project. 
I was experimenting with Golang templates and wanted to see if I could use them to build my resume.
Applying to jobs every 4 months for co-op meant that my resume was updating often.
It was difficult to keep track of past versions because they were stored as Word docs or PDFs.

My idea was to store the information needed in my resume in JSON because it's structured but can also be tracked easily using git.
I could then use templates to load that JSON data into a .tex file and generate a PDF version of my resume, for example.
It would also let me build an HTML version of my resume once I got my website up and running.

First, I built the .tex resume generator. 
Then, I began building my personal site using templating and the building blocks from the resume project.
Now, the entirety of my static site is build using the Go executable found in the `generator` directory.
Generated files are stored in `static`. 
Netlify listens for commits on master and automatically publishes a new version every time I make a change to the master branch.

The code needed to generate the templates from JSON isn't very complex. 
Most of the complexity in this project is in the actual template files which describe what to do with the data once loaded.
Once the workflow was set up, it's been easy to make incremental changes to my resume, my blog articles and my homepage!
