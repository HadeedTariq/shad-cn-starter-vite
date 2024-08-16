import { Outlet } from "react-router-dom";
import ProjectSidebar from "./ProjectSidebar";

const ProjectNavbar = () => {
  return (
    <div className="flex flex-col">
      <nav className="flex items-center justify-between w-full p-2 border-b-2">
        <h1>Canvast</h1>
        <p>Account</p>
      </nav>
      <div className="flex gap-1">
        <ProjectSidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default ProjectNavbar;
