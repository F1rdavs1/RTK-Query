import React from "react";
import "./App.css";
import CustomRouter from "./routes";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <CustomRouter />
    </>
  );
};

export default App;
