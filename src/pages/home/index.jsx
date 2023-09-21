import { useState } from "react";
import Card from "../../components/card";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  const [prods, setProds] = useState([]);
  return (
    <div className={styles.homepage}>
      <p>Updated</p>
      <div className={styles.homepage__cards}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default HomePage;
