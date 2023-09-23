import { Fragment, useEffect } from "react";
import HomePage from "./pages/home";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
  const tele = window.Telegram.WebApp;
  useEffect(() => {
    tele.ready();
    tele.enableClosingConfirmation();
  });
  return <HomePage />;
}

export default App;
