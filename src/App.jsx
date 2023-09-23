import { Fragment, useEffect } from "react";
import HomePage from "./pages/home";
import "./App.css";
import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.min.css";

window.Telegram.WebApp;

function App() {
  const tele = window.Telegram.WebApp;
  console.log(window);
  useEffect(() => {
    tele.ready();
    tele.enableClosingConfirmation();
  });
  return (
    <Fragment>
      <ToastContainer
        position="top-center"
        autoClose={7500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <HomePage />
    </Fragment>
  );
}

export default App;
