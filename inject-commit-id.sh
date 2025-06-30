#!/bin/bash
# Replace the commit id placeholder in index.html with the latest commit hash
COMMIT_ID=$(git rev-parse --short HEAD)
sed -i.bak "s/COMMIT_ID_PLACEHOLDER/$COMMIT_ID/g" index.html
