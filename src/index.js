import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter , createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/js/dist/dom/data.js'
import * as sass from 'sass';
import "./all.scss";
import  App  from "./App.js";
import HomePage from "./homepage.js";
import NotFound  from "./notfound.js";

const router = createHashRouter([
      {
      path: "/",
      element: <HomePage/>,
      },
      {
      path:':time/:start/:title',
      element:<App/>,
      },
      {
        path:'*',
        element:<NotFound/>,
  
      }
  ]);

const rootElement = document.getElementById("root");
rootElement.setAttribute('class','d-flex justify-content-center align-items-center')
const root = createRoot(rootElement);

root.render(<RouterProvider router={router}/>
);

