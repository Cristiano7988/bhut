import React from "react";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import CarList from "./components/CarList";
import CreateCar from "./components/CreateCar";
import Car from "./components/Car";
import Header from "./components/Header";
import Footer from "./components/Footer/Footer";

const Rotas = () => {
  return (<Router basename="/">
    <Header />

    <Routes>
      <Route element={<CarList />} path="/" />
      <Route element={<CreateCar />} path="/create" />
      <Route path="/car">
        <Route element={<Car />} path=":id" />
        <Route element={<Car type="edit" />} path=":id/edit" />
        <Route path="*" element={<div>Nenhum resultado a ser exibido</div>} />
      </Route>
      <Route path="*" element={<div>Página não encontrada</div>}  />
    </Routes>

    <Footer />
  </Router>
)};

export default Rotas;
