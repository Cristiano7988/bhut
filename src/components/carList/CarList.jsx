import React, { Component } from "react";

class CarList extends Component {
  constructor() {
    super();
    this.state = {
        cars: []
    }
  }
  componentDidMount() {
    this.getCars("cars");
  }
  getCars(endpoint) {
    fetch(`http://api-test.bhut.com.br:3000/api/${endpoint}`)
      .then((r) => (r.ok ? r.json() : false))
      .then((r) => this.setState({cars: r}))
      .catch((e) => console.log("Error", e));
  }
  render() {
    return <div>
        {this.state.cars.map(({_id, title, brand, price, age}) => {
            return <ul key={_id}>
              <li><b>{title}</b></li>
              <li>Marca: {brand}</li>
              <li>Ano: {age}</li>
              <li>Preço: {price}</li>
            </ul>
        })}
    </div>;
  }
}

export default CarList;
