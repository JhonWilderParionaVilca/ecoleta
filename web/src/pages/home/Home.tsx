import React from "react";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";

import "./Home.css";

import logo from "../../assets/logo.svg";

interface HomeProps {
  title: String;
}

const Home: React.FC<HomeProps> = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="logo de ecoleta" />
        </header>

        <main>
          <h1>Su marketplace de recolección de residuos</h1>
          <p>
            Ayudamos a personas a encontrar puntos de recolección de forma
            eficiente
          </p>

          <Link to="/register">
            <span>
              <FiLogIn />
            </span>
            <strong>Registre un punto de recolección</strong>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Home;
