import React, { Component } from "react";
import Message from "../message";
import car from "../../dados/CarDefault"; 
import FetchData from "../../tools/FetchData";

class CreateCar extends Component {
  constructor() {
    super();
    this.state = {
      message: {},
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
      message: {},
    });
  }
  handleSubmit(e) {
    FetchData({
      config: {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(this.state.car)
      }
    })
      .then((r) => {
        if (!r) throw new Error("Infelizmente o anúncio não foi enviado!")
     
        this.setState({
          message: {
            text: `"${r.title}" anunciado com sucesso!`,
            show: true,
            type: "success",
          },
          car,
        })
      })
      .catch(({ message }) =>
        this.setState({
          message: {
            text: message,
            show: true,
            type: "fail",
          },
          car,
        })
      );
    e.preventDefault();
  }
  render() {
    const { message, car } = this.state

    return (
      <div className="car-create">
        <h1>Desapegue, anuncie agora!</h1>
        <form onSubmit={this.handleSubmit}>
          {Object.keys(car).map((field, id) => 
            <div className="car-item-wrapper" key={id}>
              <label className="car-item" htmlFor={field}>{field}:</label>
              <input
                id={field}
                name={field}
                type={field === "age" ? "number" : "text"}
                onChange={this.handleChange}
                value={car[field]}
                required
              />
            </div>
          )}
          <div className="car-item-wrapper" style={{textAlign: "right", position: "relative"}}>
            <button type="submit">Anunciar</button>
          </div>
        </form>
        {<Message content={message} />}
      </div>
    );
  }
}

export default CreateCar;
