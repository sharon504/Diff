import { Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import { User } from "./components/components.js";
import { ProjectsPage, ProfilePage } from "./pages/pages.js";
import viteLogo from "/vite.svg";

function App() {
  return (
    <div className="w-screen h-screen">
      <Routes>
        <Route path="/user/profile" element={<ProfilePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </div>
  );
}

export default App;
