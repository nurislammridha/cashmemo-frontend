import "react-app-polyfill/ie11"; // For IE 11 support
import "react-app-polyfill/stable";
import "core-js";
import "./polyfill";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import Store from "./redux/store/Store";
import { icons } from "./assets/icons";

React.icons = icons;

require("./services/axios.js");
let store = Store();
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>{" "}
    <ToastContainer />
  </StrictMode>,
  rootElement
);
serviceWorker.unregister();
