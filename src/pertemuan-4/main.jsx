import { createRoot } from "react-dom/client";
import "./tailwind.css";
import ServiceDashboard from "./ServiceDashboard";
// import TailwindCSS from "./TailwindCSS";


createRoot(document.getElementById("root"))
    .render(
        <div>
            <ServiceDashboard></ServiceDashboard>
        </div>
        
    )