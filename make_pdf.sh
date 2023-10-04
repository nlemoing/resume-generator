#!/bin/bash

set -euo pipefail

cd output
tlmgr install fontawesome5
xelatex resume.tex
cp resume.pdf ../static/files/nlemoing_resume.pdf