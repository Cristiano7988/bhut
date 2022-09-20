import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaEye } from 'react-icons/fa';

class CarList extends Component {
  constructor() {
    super();
    this.state = {
      cars: [],
    };
  }
  componentDidMount() {
    this.getCars("cars");
  }
  getCars(endpoint) {
    fetch(`http://api-test.bhut.com.br:3000/api/${endpoint}`)
      .then((r) => (r.ok ? r.json() : false))
      .then((r) => this.setState({ cars: r }))
      .catch((e) => console.log("Error", e));
  }
  render() {
    return (
      <div className="carList">
        <h1>Carros Disponíveis</h1>
        <ul>
          {this.state.cars.map(({ _id, title }) => {
            return (
              <li key={_id}>
                <span>{title}</span>
                <div className="icons">
                  <Link className="icon" to={"/car/" + _id + "/edit"}><FaEdit /></Link>
                  <Link className="icon" to={"/car/" + _id}><FaEye /></Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default CarList;
