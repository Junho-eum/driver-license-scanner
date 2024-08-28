# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


When we collect data, the web app will be run on a server, so everyone can interact with the same instance. But for development, you will need to follow these steps to run the web app on your own device.

## Dev

For development, please follow the instructions below.

### Step 1: Install dependencies using NPM

1. Make sure NPM is installed or install it from [here](https://www.npmjs.com/). 
2. Navigate to the directory containing this project and install the dependencies:

    ```
    npm i
    ``` 

    You may need to run `npm i --force`.

### Step 2: Install and initialize Docker
In addition to the NPM dependencies, we will be using:
- Node.js, which will run our JavaScript application.
- MongoDB, our database.
- MongoExpress, an interface used to interact with MongoDB on the web.

It would be time-consuming to install and configure all of these on your computer. Importantly, if you use **Windows**, you will need to download the Windows Subsystem for Linux (WSL) from the Microsoft Store.

1. Make sure [Docker](https://docs.docker.com/get-docker/) is installed and setup
2. Navigate to the directory containing this project and run:

    ```
    docker compose build
    ```

### Step 3: Start development

1. Start up the required development infrastructure:
    ```
    docker compose up
    ``` 
    or 
    ```
    docker compose up -d
    ```

    > Note: You can run `docker container ls` to see a list of your containers. Learn more about Docker commands [here](https://docs.docker.com/engine/reference/commandline/container_ls/).

2. Start the React frontend:
    ```
    npm run dev
    ```

### Step 4: Stop development

1. (Optional) Dump the database to a CSV file:
    ```
    node mongo_to_csv.js
    ```

2. Stop development infrastruture by running:

    ```
    docker compose stop
    ```

# Input Prolific ID

To add a prolific ID to the start of the survey, you can edit the url to add:
```
http://localhost:5173/?PROLIFIC_PID=[ID_HERE]
```
Where [ID_HERE] is the prolific ID.

# Run Production

To run the production build, use: 

```
npm run build
```

# Need More Help?

Be sure to check the wiki for additional tutorials on how to modify your survey.

Otherwise, please add an issue to this repo.