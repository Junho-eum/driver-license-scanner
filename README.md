# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## How To Run

Start server:
```
docker compose build
```
Start frontend:
```
npm run dev
```

To dump the database to a CSV file, run:
```
node mongo_to_csv.js
```

## How To: Build Extension

To re-build the extension, run `tsc.cmd ./extension/background.ts` in the main directory. In the [Extension](chrome://extensions/) page, select `Load unpacked` and upload the `extension/` directory.

# Docker and MongoDB

To start docker

```
docker compose up -d
```

To stop docker

```
docker compose stop
```

# Input Prolific ID

To add a prolific ID to the start of the survey, you must edit the url to add:
```
http://localhost:5173/?=[ID_HERE]
```
Where [ID_HERE] is the prolific ID.
