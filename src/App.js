import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { routes } from "./routes";
import Home from "./westlake-components/Home";
import ProtectedRoute from "./westlake-components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "./scss/volt.scss";
import "react-datetime/css/react-datetime.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  console.log(routes);

  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      <Routes>
        {routes.map(({ path, component: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
