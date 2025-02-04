#!/bin/sh

# Create a JSON file with environment variable names and values
cat <<EOF > ./dist/x3lohxbw1rmkrea5tx67is34u4x2pa.json
{
  "LINK_REDIRECT_TO_URL_ON_SURVEY_SUBMISSION": "${LINK_REDIRECT_TO_URL_ON_SURVEY_SUBMISSION}"
}
EOF

# Start the main application (for example, an Nginx server)
exec node express-backend/server.js