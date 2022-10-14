import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Message from "../Message";
import FetchData from "../../tools/FetchData";

class CarList extends Component {
  constructor() {
    super();
    this.state = {
      cars: [],
      message: {},
    };
  }
  componentDidMount() {
    FetchData({})
      .then((cars) => {
        if (!cars.length) throw new Error("Não há carros disponíveis!");

        this.setState({ cars });
      })
      .catch(({ message }) =>
        this.setState({
          message: {
            text: message,
            show: true,
            type: "fail",
          },
        })
      );
  }
  deleteCar(e, title, id) {
    if (!window.confirm(`Deseja excluir o produto "${title}"? `)) return;

    FetchData({ id, config: { method: "DLETE" } })
      .then(({ title, _id }) => {
        if (!_id) throw new Error(`Não foi possível excluir "${title}"!`);

        this.setState({
          cars: this.state.cars.filter((car) => car._id !== _id),
          message: {
            type: "success",
            text: `Produto "${title}" excluído!`,
            show: true,
          },
        });
      })
      .catch(({ message }) =>
        this.setState({
          message: {
            type: "fail",
            text: message,
            show: true,
          },
        })
      )
      .then(() => setTimeout(() => this.setState({ message: {} }), 4000));
  }
  render() {
    const { cars, message } = this.state;

    const links = [
      {
        url: "/edit",
        icon: <FaEdit />,
      },
      {
        icon: <FaEye />,
      },
      {
        className: "delete",
        icon: <FaTrash />
      }
    ];

    return (
      <div className="carList">
        <h1>Carros Disponíveis</h1>
        {message.type !== "fail" && (
          <ul>
            {cars.map(({ _id, title }) => (
              <li key={_id}>
                <span>{title}</span>
                <div
                  className="icons"
                  children={
                    links.map(({className = "", url = "", icon}, index) => (
                      <Link
                        key={index}
                        children={icon}
                        className={"icon " + className}
                        to={(className !== "delete") && "/car/" + _id + url}
                        onClick={(e) => (className === "delete") && this.deleteCar(e, title, _id)}
                      />
                    ))
                  }
                />
              </li>
            ))}
          </ul>
        )}
        {<Message content={message} />}
      </div>
    );
  }
}

export default CarList;
