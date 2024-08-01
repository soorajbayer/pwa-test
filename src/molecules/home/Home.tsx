import React from "react";
import Navbar from "../../atoms/navbar/Navbar";
import "./home.scss";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="App"></div>
    </div>
  );
};

export default Home;
