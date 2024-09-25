# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the necessary files to the container
COPY dist ./dist
COPY express-server-backend/package*.json ./express-backend/
COPY express-server-backend/server.js ./express-backend/
COPY express-server-backend/db ./express-backend/db
COPY express-server-backend/routes ./express-backend/routes

# Install the dependencies for the Express backend
RUN cd express-backend && npm install

# Expose port 80
EXPOSE 80

CMD ["node", "express-backend/server.js"]

# run this in your terminal: docker build -t trails-survey-main .