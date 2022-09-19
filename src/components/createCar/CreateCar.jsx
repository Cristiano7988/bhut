import React, { Component } from "react";

const message = {
  text: "",
  type: "",
  show: false,
};

const car = {
  title: "",
  brand: "",
  price: "",
  age: 0,
};

class CreateCar extends Component {
  constructor() {
    super();
    this.state = {
      message,
      car,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    let newCar = {};
    newCar[e.target.name] = e.target.value;

    this.setState({
      car: {
        ...this.state.car,
        ...newCar,
      },
      message,
    });
  }
  handleSubmit(e) {
    fetch("http://api-test.bhut.com.br:3000/api/cars", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(this.state.car),
    })
      .then((r) => (r.ok ? r.json() : false))
      .then((r) =>
        r ? this.setState({
          message: {
            text: `${r.brand} anunciado com sucesso!`,
            show: true,
            type: "success",
          },
          car,
        })
        : this.setState({
          message: {
            text: "Infelizmente o anúncio não foi enviado!",
            show: true,
            type: "fail",
          },
          car,
        })
      )
      .catch((e) =>
        this.setState({
          message: {
            text: "Infelizmente o anúncio não foi enviado!",
            show: true,
            type: "fail",
          },
          car,
        })
      );
    e.preventDefault();
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {Object.keys(this.state.car).map((field, id) => 
            <div key={id}>
              <label htmlFor={field}>{field}</label>
              <input
                id={field}
                name={field}
                type={field === "age" ? "number" : "text"}
                onChange={this.handleChange}
                value={this.state.car[field]}
                required
              />
            </div>
          )}
          <button type="submit">Anunciar</button>
        </form>
        {this.state.message.show && (
          <div className={this.state.message.type}>
            {this.state.message.text}
          </div>
        )}
      </div>
    );
  }
}

export default CreateCar;
