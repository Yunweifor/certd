# Lego Binary Files

This directory contains the local lego binary files used by the Docker build process.

## Setup Instructions

To use local lego binary files instead of downloading from GitHub, copy your local files to this directory with the following names:

### Required Files

1. **AMD64 (x86_64) Architecture:**
   ```
   lego_v4.22.2_linux_amd64.tar.gz
   ```

2. **ARM64 (aarch64) Architecture:**
   ```
   lego_v4.22.2_linux_arm64.tar.gz
   ```

### Copy Commands

From your host machine, run these commands to copy the files:

```bash
# Copy AMD64 version
cp /home/y/Documents/augment-projects/soft/lego_v4.22.2_linux_amd64.tar.gz packages/ui/lego-binaries/

# Copy ARM64 version (assuming similar path structure)
cp /home/y/Documents/augment-projects/soft/lego_v4.22.2_linux_arm64.tar.gz packages/ui/lego-binaries/
```

### Verification

After copying, verify the files are in place:

```bash
ls -la packages/ui/lego-binaries/
```

You should see:
```
lego_v4.22.2_linux_amd64.tar.gz
lego_v4.22.2_linux_arm64.tar.gz
```

## How It Works

- The Dockerfile copies both architecture files into the Docker image at `/app/tools/lego/`
- The application's TypeScript code automatically detects the runtime architecture and extracts the appropriate file
- This eliminates the need for internet access during Docker builds
- Both architectures are supported in multi-platform builds

## File Sources

These files should be downloaded from the official lego releases:
https://github.com/go-acme/lego/releases/tag/v4.22.2

Make sure the files match the exact version specified in the Dockerfile (`LEGO_VERSION=4.22.2`).
