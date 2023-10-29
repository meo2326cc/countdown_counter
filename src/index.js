import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import 'bootstrap/js/dist/dom/data.js'
import * as sass from 'sass';
import "./all.scss";
import  App  from "./App.js";

const rootElement = document.getElementById("root");
rootElement.setAttribute('class','d-flex justify-content-center align-items-center vh-100')
const root = createRoot(rootElement);

root.render(<App/>);

