#!/bin/bash

echo "Generating license file for sam-ki-nachricht"
./node_modules/.bin/license-checker --json > licenses.json && \
python scripts/license_parser.py < licenses.json > public/license.html
