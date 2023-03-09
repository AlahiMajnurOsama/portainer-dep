#!/bin/bash

# Load the image digest from the file
imageDigest=$(cat image_digest.txt)

# Replace the image digest in the docker-compose.yml file
sed -i "s/portainer-ce:latest/portainer-ce@${imageDigest}/" docker-compose.yml

# Deploy the updated stack using Docker Compose
docker-compose up -d
