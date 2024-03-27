import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Debug from "./pages/Debug.jsx";
import SurveyPage from "./pages/surveyPage";

//Note we can create a settings file to ensure we are allowed to debug
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/debug" element={<Debug />} />
        <Route path="/survey" element={<SurveyPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
