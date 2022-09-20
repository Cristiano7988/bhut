import { useState } from "react";
import { useParams } from "react-router-dom";

const defaultMessage = {
  type: "",
  show: false,
  text: "",
};

const Car = (props) => {
  const { id } = useParams();
  const [car, setCar] = useState({});
  const [message, setMessage] = useState(defaultMessage);

  const getCar = () => {
    setMessage(defaultMessage);

    fetch(`http://api-test.bhut.com.br:3000/api/cars/${id}`)
      .then((r) => (r.ok ? r.json() : false))
      .then((r) =>
        r
          ? (delete r._id, delete r.__v, setCar(r))
          : setMessage({
              type: "fail",
              text: "Não foi possível carregar os dados deste produto",
              show: true,
            })
      )
      .catch((e) =>
        setMessage({
          type: "fail",
          text: "Não foi possível carregar os dados deste produto",
          show: true,
        })
      );
  };

  const handleChange = (e) => {
    let newCar = {};
    newCar[e.target.name] = e.target.value;

    setCar({
      ...car,
      ...newCar,
    });
    setMessage(defaultMessage);
  };

  const handleSubmit = (e) => {
    fetch("http://api-test.bhut.com.br:3000/api/cars/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(car),
    })
      .then((r) => (r.ok ? r.json() : false))
      .then((r) =>
        r
          ? setMessage({
              text: "Produto Atualizado com Sucesso!",
              show: true,
              type: "success",
            })
          : setMessage({
              text: "Infelizmente não foi possível atualizar este produto!",
              show: true,
              type: "fail",
            })
      )
      .catch((e) =>
        setMessage({
          text: "Infelizmente não foi possível atualizar este produto!",
          show: true,
          type: "fail",
        })
      );
    e.preventDefault();
  };

  return (
    <div className="car">
      <h1>
        {props.type === "edit" && <span>Editar</span>} {car.title}
      </h1>
      {props.type === "edit" ? (
        <form onSubmit={handleSubmit}>
          {Object.keys(car).map((field, id) => (
            <div key={id}>
              <label className="car-item" htmlFor={field}>
                {field}:
              </label>
              <input
                id={field}
                name={field}
                type={field === "age" ? "number" : "text"}
                onChange={handleChange}
                value={car[field]}
                required
              />
            </div>
          ))}
          {car.title && <button type="submit">Atualizar</button>}
        </form>
      ) : (
        Object.keys(car).map((field, id) => {
          return (
            field !== "title" && (
              <ul key={id}>
                <li id={field}>
                  <span className="car-item">{field}:</span> {car[field]}
                </li>
              </ul>
            )
          );
        })
      )}
      {!car.title && <button onClick={getCar}>Carregar dados</button>}
      <br />
      {message.show && <div className={message.type}>{message.text}</div>}
    </div>
  );
};

export default Car;
