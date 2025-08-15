#!/bin/bash

# Usage: ./new-post.sh <category> <title> [slug]
# Example: ./new-post.sh daily "오늘의 일기" today-diary

CATEGORY=$1
TITLE=$2
SLUG=$3

if [ -z "$CATEGORY" ] || [ -z "$TITLE" ]; then
  echo "Usage: ./new-post.sh <category> <title> [slug]"
  echo "Categories: daily, dev"
  echo "Example: ./new-post.sh daily \"오늘의 일기\" today-diary"
  exit 1
fi

# Generate slug from title if not provided
if [ -z "$SLUG" ]; then
  # Generate English-only slug for better URL compatibility
  # Use current date as fallback for Korean titles
  DATE_SLUG=$(date +"%Y%m%d")
  SLUG="post-$DATE_SLUG"
  echo "⚠️  Auto-generated English slug: $SLUG"
  echo "💡 Tip: Provide English slug as 3rd parameter for custom URLs"
fi

# Generate current timestamp in ISO format
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  DATE=$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")
else
  # Linux
  DATE=$(date -u +"%Y-%m-%dT%H:%M:%S.%3NZ")
fi

# Create directory if it doesn't exist
mkdir -p "_posts/$CATEGORY"

FILE="_posts/$CATEGORY/$SLUG.md"

# Check if file already exists
if [ -f "$FILE" ]; then
  echo "Error: File $FILE already exists!"
  exit 1
fi

# Create the post file
cat > "$FILE" << EOF
---
category: "$CATEGORY"
title: "$TITLE"
preview: ""
date: "$DATE"
author:
  name: 승찬
  picture: "/assets/blog/authors/jj.jpeg"
---

Write your content here...
EOF

echo "✅ Created new post: $FILE"
echo "📝 Don't forget to add a preview description!"