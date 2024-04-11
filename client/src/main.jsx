import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

import ProjectsProvider from "./store/projects.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProjectsProvider>
      <Router basename="/">
        <App />
      </Router>
    </ProjectsProvider>
  </React.StrictMode>,
);
