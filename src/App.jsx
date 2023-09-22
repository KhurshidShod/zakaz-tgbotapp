// import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import "./App.css";
import { useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';

window.Telegram.WebApp;

function App() {
  const tele = window.Telegram.WebApp;
  console.log(window)
  useEffect(() => {
    tele.ready();
  });
  return(
    <HomePage />  
  );
}

export default App;
