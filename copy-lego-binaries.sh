#!/bin/bash

# Script to copy local lego binary files to the Docker build context
# This script helps set up the local lego binaries for Docker builds

set -e

echo "=========================================="
echo "Copying Local Lego Binary Files"
echo "=========================================="

# Source paths (modify these if your files are in different locations)
AMD64_SOURCE="/home/y/Documents/augment-projects/soft/lego_v4.22.2_linux_amd64.tar.gz"
ARM64_SOURCE="/home/y/Documents/augment-projects/soft/lego_v4.22.2_linux_arm64.tar.gz"

# Destination directory
DEST_DIR="packages/ui/lego-binaries"

# Create destination directory if it doesn't exist
mkdir -p "$DEST_DIR"

# Check if AMD64 file exists and copy it
if [ -f "$AMD64_SOURCE" ]; then
    echo "✅ Copying AMD64 lego binary..."
    cp "$AMD64_SOURCE" "$DEST_DIR/"
    echo "   Copied: $AMD64_SOURCE -> $DEST_DIR/"
else
    echo "❌ AMD64 file not found: $AMD64_SOURCE"
    echo "   Please ensure the file exists at the specified path"
    exit 1
fi

# Check if ARM64 file exists and copy it
if [ -f "$ARM64_SOURCE" ]; then
    echo "✅ Copying ARM64 lego binary..."
    cp "$ARM64_SOURCE" "$DEST_DIR/"
    echo "   Copied: $ARM64_SOURCE -> $DEST_DIR/"
else
    echo "⚠️  ARM64 file not found: $ARM64_SOURCE"
    echo "   You may need to download it from: https://github.com/go-acme/lego/releases/tag/v4.22.2"
    echo "   Or update the ARM64_SOURCE path in this script"
fi

echo ""
echo "=========================================="
echo "Verification"
echo "=========================================="

# List the files in the destination directory
echo "Files in $DEST_DIR:"
ls -la "$DEST_DIR/"

echo ""
echo "✅ Setup complete! You can now build the Docker image."
echo ""
echo "To build the Docker image, run:"
echo "   cd packages/ui"
echo "   docker build -t certd-local ."
echo ""
echo "Or use docker-compose:"
echo "   docker-compose -f docker-compose.yaml build"
