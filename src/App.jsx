// import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import "./App.css";
import { useEffect } from "react";

function App() {
  const tele = window.Telegram.WebApp;

  useEffect(() => {
    tele.ready();
  });
  return <HomePage />;
}

export default App;
