import { useEffect } from "react";
import HomePage from "./pages/home";
import "./App.css";

function App() {
  const tele = window.Telegram.WebApp;
  useEffect(() => {
    tele.ready();
    tele.enableClosingConfirmation();
  });
  return <HomePage />;
}

export default App;
