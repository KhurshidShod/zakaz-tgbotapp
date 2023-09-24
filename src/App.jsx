import { Fragment, useEffect } from "react";
import HomePage from "./pages/home";
import "./App.css";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";

function App() {
  const tele = window.Telegram.WebApp;
  console.log(window.Telegram.WebApp.initData.user.id);
  useEffect(() => {
    tele.ready();
    tele.expand();
    tele.enableClosingConfirmation();
  });
  return (
    <Fragment>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <p>hj{JSON.stringify(window.Telegram.WebApp.initData.user.id)}</p>
      <HomePage />
    </Fragment>
  );
}

export default App;
