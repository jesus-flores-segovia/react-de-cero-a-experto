import reactDom from "react-dom";
import FirstApp from "./FirstApp";
import "./index.css";

const divRoot = document.querySelector("#root");

reactDom.render(<FirstApp />, divRoot);
