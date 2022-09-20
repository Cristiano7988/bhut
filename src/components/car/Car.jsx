import { useState } from "react";
import { useParams } from "react-router-dom";

const defaultMessage = {
  type: "",
  show: false,
  text: "",
};

const randomImage = () => {
  const images = [
    "https://i.pinimg.com/564x/76/6f/b8/766fb8f2ecde74af3a7ad8ab917ad9b8.jpg",
    "https://i.pinimg.com/564x/05/90/be/0590be27179342fdf898f784a0e9e9d7.jpg",
    "https://i.pinimg.com/564x/90/e5/0f/90e50f73f180308e5ead474c0a4ad35b.jpg",
    "https://i.pinimg.com/564x/9b/f8/28/9bf828a150d2b2896eb895cf513da126.jpg",
    "https://i.pinimg.com/564x/ef/be/dd/efbedda0325b3557001773a99f704694.jpg"
  ]

  return images[Math.floor(Math.random() * (images.length - 1))]   
}

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
                backgroundImage:
                  `url(${randomImage()})`,
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
      {!car.title && <button onClick={getCar}>Carregar dados</button>}
      <br />
      {message.show && <div className={message.type}>{message.text}</div>}
    </div>
  );
};

export default Car;
