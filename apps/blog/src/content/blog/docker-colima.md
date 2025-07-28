---
title: "Best Way to Install Docker on Mac"
description: "Learn how to install Docker on Mac using Colima - a lightweight, free alternative to Docker Desktop that's faster and more efficient."
pubDate: "Jul 28 2025"
image: "./images/docker-colima.png"
tags: ["docker", "mac", "colima", "containers"]
---

Docker Desktop for Mac can be resource-heavy and slow. Colima provides a lightweight, free alternative that's faster and more efficient. In this tutorial, you'll learn how to uninstall Docker Desktop and install Colima with Docker's command-line tools using Homebrew.

## Prerequisites

Before we begin, make sure you have:

- macOS (this tutorial is optimized for Mac)
- Homebrew installed ([Install Homebrew](https://brew.sh/) if you haven't already)

## Step 1: Uninstall Docker Desktop

First, let's remove Docker Desktop to avoid conflicts:

```bash
# Stop Docker Desktop if it's running
osascript -e 'quit app "Docker"'

# Remove Docker Desktop application
sudo rm -rf /Applications/Docker.app

# Remove Docker Desktop files
rm -rf ~/Library/Group\ Containers/group.com.docker
rm -rf ~/Library/Containers/com.docker.docker
rm -rf ~/.docker
```

## Step 2: Install Colima and Docker CLI

The fastest way to get Colima installed is through Homebrew:

```bash
brew install colima
```

Once Colima installs, install Docker and Docker Compose:

```bash
brew install docker docker-compose
```

## Step 3: Configure Docker Compose Plugin

Configure docker-compose as a Docker plugin so you can use `docker compose` instead of the legacy `docker-compose` script:

```bash
# Create Docker CLI plugins directory
mkdir -p ~/.docker/cli-plugins

# Symlink docker-compose to the plugins directory
ln -sfn $(brew --prefix)/opt/docker-compose/bin/docker-compose ~/.docker/cli-plugins/docker-compose
```

Test the installation:

```bash
docker compose
```

You should see the help message confirming the installation.

## Step 4: Install Docker Buildx

Install Buildx for building Docker containers:

```bash
brew install docker-buildx
```

Symlink it to the CLI plugins folder:

```bash
ln -sfn $(brew --prefix)/opt/docker-buildx/bin/docker-buildx ~/.docker/cli-plugins/docker-buildx
```

## Step 5: Start Colima

Colima works by using a virtual machine to run containers, similar to Docker for Mac. On first run, it will download and configure a VM with 2 CPUs, 2GiB memory, and 60GiB storage.

```bash
colima start
```

You'll see output similar to:

```
INFO[0000] starting colima
INFO[0000] creating and starting ...                     context=vm
INFO[0041] provisioning ...                              context=docker
INFO[0074] done
```

## Step 6: Test Your Installation

Run Docker's hello-world image to verify everything works:

```bash
docker run hello-world
```

You should see output confirming Docker is working correctly.

## Step 7: Basic Docker Operations

Let's test some basic Docker operations:

### List containers

```bash
docker ps -a
```

### List images

```bash
docker images
```

### Remove containers and images

```bash
# Remove a container (replace with your container name)
docker rm <container_name>

# Remove an image (replace with your image ID)
docker rmi <image_id>
```

## Step 8: Build Your Own Image

Create a simple test project to verify building works:

```bash
# Create project directory
mkdir docker-test && cd docker-test

# Create HTML directory and file
mkdir html
cat <<EOF > html/index.html
<h1>Hi from Docker</h1>
EOF

# Create Dockerfile
cat <<EOF > Dockerfile
FROM nginx:latest
COPY ./html /usr/share/nginx/html
EOF

# Build the image
docker build -t docker-nginx-test .

# Run the container
docker run --rm -t -p 3000:80 docker-nginx-test
```

Visit `http://localhost:3000` in your browser to see your custom page.

## Customizing Colima's Virtual Machine

You can customize the VM settings based on your needs:

### Change CPU and Memory

```bash
# Stop current VM
colima stop

# Start with custom settings
colima start --cpu 4 --memory 4
```

### Create VM with More Disk Space

```bash
colima start --cpu 4 --memory 4 --disk 100
```

### Enable Kubernetes Support

```bash
# Install kubectl first
brew install kubectl

# Start with Kubernetes
colima start --with-kubernetes
```

## Useful Colima Commands

```bash
# Check status
colima status

# Stop Colima
colima stop

# Delete Colima VM
colima delete

# View all options
colima help start
```

## Performance Benefits

Colima offers several advantages over Docker Desktop:

- **Faster startup**: Colima starts in seconds vs minutes
- **Lower resource usage**: Uses less CPU and memory
- **Free and open source**: No licensing fees
- **Command-line focused**: Better for automation and CI/CD
- **Customizable**: Full control over VM settings

## Troubleshooting

### If Docker commands fail

```bash
# Restart Colima
colima stop
colima start

# Check Docker context
docker context ls
```

### If you need to reset everything

```bash
colima delete
colima start
```

## Conclusion

Colima provides a lightweight, efficient alternative to Docker Desktop for Mac. It's faster, uses fewer resources, and gives you more control over your container environment. The setup is straightforward with Homebrew, and you get all the Docker functionality you need without the overhead of Docker Desktop.

For more information, visit [Colima's GitHub page](https://github.com/abiosoft/colima) or explore `colima help` for all available options.

Happy containerizing! 🐳
