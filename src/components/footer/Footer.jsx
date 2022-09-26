import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Footer = () => (
  <footer>
    <Link
      className="back-button"
      to="/"
      children={<>
        <FaArrowLeft />
        <span children="Voltar" />
      </>}
    />
  </footer>
);

export default Footer;
