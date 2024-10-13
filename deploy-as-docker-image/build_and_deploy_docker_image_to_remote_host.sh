#!/bin/bash

# Default values for options
SSH_PORT=22 # Default SSH port
PLATFORM="linux/amd64" # Default platforms

# Function to display usage information
usage() {
    echo "Usage: $0 -h <remote_host> -d <remote_path> -i <image_name> -k <ssh_key_file> -u <ssh_username> [-p <ssh_port>] [-t <platform>]"
    echo "Example: $0 -h remote_ip -d /path/to/remote/directory -i my-image:latest -k ~/.ssh/id_rsa -u username [-p 2222] [-t linux/amd64,linux/arm64]"
    exit 1
}

# Parse options using getopts
while getopts "h:d:i:k:u:p:t:" opt; do
  case ${opt} in
    h )
      REMOTE_HOST=$OPTARG
      ;;
    d )
      REMOTE_PATH=$OPTARG
      ;;
    i )
      IMAGE_NAME=$OPTARG
      ;;
    k )
      SSH_KEY_FILE=$OPTARG
      ;;
    u )
      SSH_USERNAME=$OPTARG
      ;;
    p )
      SSH_PORT=$OPTARG
      ;;
    t )
      PLATFORM=$OPTARG
      ;;
    \? )
      usage
      ;;
  esac
done

# Check if mandatory options are provided
if [ -z "$REMOTE_HOST" ] || [ -z "$REMOTE_PATH" ] || [ -z "$IMAGE_NAME" ] || [ -z "$SSH_KEY_FILE" ] || [ -z "$SSH_USERNAME" ]; then
    usage
fi

# Build the Docker image using buildx with configurable platforms
echo "Building the Docker image for platform(s): $PLATFORM"
docker buildx build \
    --load \
    --platform "$PLATFORM" \
    -t "$IMAGE_NAME:latest" \
    -f deploy-as-docker-image/Dockerfile .
if [ $? -ne 0 ]; then
    echo "Error: Failed to build Docker image."
    exit 1
fi

# Test SSH connection and provide feedback
ssh -i "$SSH_KEY_FILE" -p "$SSH_PORT" "$SSH_USERNAME@$REMOTE_HOST" "echo 'SSH connection successful'" &> /dev/null

if [ $? -ne 0 ]; then
    echo "Error: SSH connection to $REMOTE_HOST failed!"
    exit 1
else
    echo "SSH connection to $REMOTE_HOST was successful!"
fi

# Ensure the remote directory exists
ssh -i "$SSH_KEY_FILE" -p "$SSH_PORT" "$SSH_USERNAME@$REMOTE_HOST" "mkdir -p $REMOTE_PATH"
if [ $? -ne 0 ]; then
    echo "Error: Failed to create directory on remote host."
    exit 1
fi

# Save the Docker image as a tarball
docker save -o "$IMAGE_NAME.tar" "$IMAGE_NAME:latest"
if [ $? -ne 0 ]; then
    echo "Error: Failed to save Docker image."
    exit 1
fi

# Copy the Docker image to the remote host
scp -i "$SSH_KEY_FILE" -P "$SSH_PORT" "$IMAGE_NAME.tar" "$SSH_USERNAME@$REMOTE_HOST":"$REMOTE_PATH"
if [ $? -ne 0 ]; then
    echo "Error: Failed to copy Docker image to remote host."
    exit 1
fi

# Load the Docker image on the remote host
ssh -i "$SSH_KEY_FILE" -p "$SSH_PORT" "$SSH_USERNAME@$REMOTE_HOST" "docker load -i $REMOTE_PATH/$IMAGE_NAME.tar"
if [ $? -ne 0 ]; then
    echo "Error: Failed to load Docker image on remote host."
    exit 1
fi

# Clean up the tarball on the remote host
ssh -i "$SSH_KEY_FILE" -p "$SSH_PORT" "$SSH_USERNAME@$REMOTE_HOST" "rm $REMOTE_PATH/$IMAGE_NAME.tar"
if [ $? -ne 0 ]; then
    echo "Error: Failed to remove Docker tarball on remote host."
    exit 1
fi

# Clean up the tarball on the local host
rm $IMAGE_NAME.tar
if [ $? -ne 0 ]; then
    echo "Error: Failed to remove Docker tarball on local host."
    exit 1
fi

echo "Deployment complete!"
