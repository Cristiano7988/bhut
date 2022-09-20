import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const message = {
  type: "",
  text: "",
  show: false,
};

class CarList extends Component {
  constructor() {
    super();
    this.state = {
      cars: [],
      message,
    };
    this.deleteCar = this.deleteCar.bind(this);
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
  deleteCar(e) {
    const { id, title } = e.target.dataset;
    if (window.confirm(`Deseja excluir o produto "${title}"? `)) {
      fetch(`http://api-test.bhut.com.br:3000/api/cars/${id}`, {
        method: "DELETE",
      })
        .then((r) => (r.ok ? r.json() : false))
        .then((r) =>
          r
            ? this.setState({
                cars: this.state.cars.filter((car) => car._id !== r._id),
                message: {
                  type: "success",
                  text: `Produto "${r.title}" excluído!`,
                  show: true,
                },
              })
            : this.setState({
                message: {
                  type: "fail",
                  text: `Não foi possível excluir "${title}"!`,
                  show: true,
                },
              })
        )
        .catch((e) =>
          this.setState({
            message: {
              type: "fail",
              text: `Não foi possível excluir "${title}"!`,
              show: true,
            },
          })
        )
        .then(() => setTimeout(() => this.setState({ message }), 4000));
    }
  }
  render() {
    return (
      <div className="carList">
        <h1>Carros Disponíveis</h1>
        {this.state.cars.length ? (
          <ul>
            {this.state.cars.map(({ _id, title }) => {
              return (
                <li key={_id}>
                  <span>{title}</span>
                  <div className="icons">
                    <Link className="icon" to={"/car/" + _id + "/edit"}>
                      <FaEdit />
                    </Link>
                    <Link className="icon" to={"/car/" + _id}>
                      <FaEye />
                    </Link>
                    <Link
                      data-id={_id}
                      data-title={title}
                      className="icon delete"
                      children={<FaTrash />}
                      onClick={this.deleteCar}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div>Nenhum produto cadastrado</div>
        )}
        {this.state.message.show && (
          <div className={this.state.message.type}>
            {this.state.message.text}
          </div>
        )}
      </div>
    );
  }
}

export default CarList;
