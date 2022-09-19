import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CarList from "./components/carList";

const Rotas = () => (
  <Router>
    <Routes>
      <Route element={<CarList />} path="/" />
    </Routes>
  </Router>
);

export default Rotas;
