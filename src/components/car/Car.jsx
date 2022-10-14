import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Message from "../Message";
import RandomImage from "../../dados/RandomCarImage";
import FetchData from "../../tools/FetchData";

const Car = ({ type }) => {
  const { id } = useParams();
  const [car, setCar] = useState({});
  const [message, setMessage] = useState({});

  useEffect(() => {
    if (car.title || message.show) return;

    FetchData({ id })
      .then((r) => {
        if(r) return (delete r._id, delete r.__v, setCar(r))
        
        throw new Error("Não foi possível carregar os dados deste produto")
      })
      .catch(({ message }) =>
        setMessage({
          type: "fail",
          text: message,
          show: true,
        })
      );
  });
  
  const handleChange = (e) => {
    let newCar = {};
    newCar[e.target.name] = e.target.value;

    setCar({
      ...car,
      ...newCar,
    });
    setMessage({});
  };

  const handleSubmit = (e) => {
    FetchData({ id, config: {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(car),
    }})
      .then(r =>{
        if(!r) throw new Error("Infelizmente não foi possível atualizar este produto!")

        setMessage({
          text: "Produto Atualizado com Sucesso!",
          show: true,
          type: "success",
        })
      })
      .catch(({ message }) => 
        setMessage({
          text: message,
          show: true,
          type: "fail",
        })
      );
    e.preventDefault();
  };

  return (
    <div className="car">
      <h1>
        {type === "edit" && <span>Editar</span>} {car.title}
      </h1>
      {type === "edit" ? (
        <form onSubmit={handleSubmit}>
          {Object.keys(car).map((field, id) => (
            <div className="car-field" key={id}>
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
        car.title && (
          <div className="car-card">
            <div
              className="car-image"
              style={{
                backgroundImage: `url(${RandomImage()})`,
              }}
            />
            <ul>
              {Object.keys(car).map((field, id) => {
                return (
                  field !== "title" && (
                    <li key={id} id={field}>
                      <b className="car-item">{field}:</b> {car[field]}
                    </li>
                  )
                );
              })}
            </ul>
          </div>
        )
      )}
      {<Message content={message} />}
    </div>
  );
};

export default Car;
