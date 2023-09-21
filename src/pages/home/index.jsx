import { useState } from "react";
import Card from "../../components/card";
import styles from "./HomePage.module.scss";
import { productData } from "../../assets/data/products";

const HomePage = () => {
  const [prods, setProds] = useState([]);
  return (
    <div className={styles.homepage}>
      <p>Updated</p>
      <div className={styles.homepage__cards}>
        {productData.map((prod) => <Card {...prod} />)}
      </div>
    </div>
  );
};

export default HomePage;
