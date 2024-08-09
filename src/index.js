import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import store from "./store";
import App from "./App";
import "./scss/volt.scss";
import "react-datetime/css/react-datetime.css";
import ScrollToTop from "./components/ScrollToTop";
import "./scss/global.scss";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <Provider store={store}>
    <HashRouter>
      <ScrollToTop />
      <App />
    </HashRouter>
  </Provider>
);
