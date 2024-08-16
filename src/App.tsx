import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import ProjectPage from "./pages/ProjectPage";
import ProjectNavbar from "./components/design/ProjectNavbar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProjectNavbar />}>
        <Route index element={<ProjectPage />} />
      </Route>
    </Routes>
  );
}

export default App;
