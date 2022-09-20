import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CarList from "./components/carList";
import CreateCar from "./components/createCar";
import Car from "./components/car";
import Header from "./components/header";
import Footer from "./components/footer/Footer";

const Rotas = () => {
  return (<Router>
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
