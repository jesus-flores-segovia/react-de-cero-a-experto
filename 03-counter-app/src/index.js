import reactDom from "react-dom";
import FirstApp from "./FirstApp";
import CounterApp from "./CounterApp";
import "./index.css";

const divRoot = document.querySelector("#root");

//reactDom.render(<FirstApp author={{name:"Jesús", surname: "Flores"}} greetings2="Hello World"/>, divRoot);
reactDom.render(<CounterApp />, divRoot);
