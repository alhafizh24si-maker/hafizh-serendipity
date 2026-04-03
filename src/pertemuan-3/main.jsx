import { createRoot } from "react-dom/client";
import "./tailwind.css";
import ZakatKalkulator from "./ZakatKalkulator";
// import TailwindCSS from "./TailwindCSS";


createRoot(document.getElementById("root"))
    .render(
        <div>
            <ZakatKalkulator/>
            {/* <TailwindCSS/> */}
        </div>
        
    )