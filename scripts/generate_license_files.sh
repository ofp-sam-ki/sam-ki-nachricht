#!/bin/bash

folders=("frontend-app" "frontend-videocall" "frontend" "backend")

for folder in "${folders[@]}"; do
  echo "Generating license file for $folder"
  cd $folder && \
  license-checker --json > licenses.json && \
  cd .. && \
  python scripts/license_parser.py < $folder/licenses.json > $folder/license.html
done
