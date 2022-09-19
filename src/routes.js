import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CarList from "./components/carList";
import CreateCar from "./components/createCar";
import Header from "./components/header";

const Rotas = () => (
  <Router>
    <Header />

    <Routes>
      <Route element={<CarList />} path="/" />
      <Route element={<CreateCar />} path="/create" />
      <Route path="/car">
        <Route element={<div>Detalhes sobre o carro</div>} path="1" />
        <Route element={<div>Editar carro</div>} path="1/edit" />
      </Route>
      <Route path="*" element={<div>Página não encontrada</div>}  />
    </Routes>
  </Router>
);

export default Rotas;
