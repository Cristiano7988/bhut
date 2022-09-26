import { Link } from "react-router-dom";

const Header = () => {
  const abas = [
    {
      url: "/",
      titulo: "Home"
    },
    {
      url: "/create",
      titulo: "Anunciar"
    },
  ]

  return (
    <header
      className="App-header"
      children={
        <ul
          children={
            abas.map(
              ({url, titulo}, key) => <li key={key} children={<Link to={url} children={titulo} />} />
            )
          }
        />
      }
    />
  );
};

export default Header;
