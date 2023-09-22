import { useState } from "react";
import Card from "../../components/card";
import styles from "./HomePage.module.scss";
import { productData } from "../../assets/data/products";

const HomePage = () => {
  const localProds = localStorage.getItem("cart");
  const [prods, setProds] = useState(JSON.parse(localProds) || []);
  const addToCart = (id) => {
    const newProds = [...prods, productData.find((prod) => prod.id === id)];
    setProds(newProds);
    localStorage.setItem("cart", JSON.stringify(newProds));
  };
  const changeQuant = (type, id) => {
    // const newProds = prods.map((prod) => {
    //   if (prod.id === id) {
    //     if (type === "plus") {
    //       prod.quantity++;
    //     } else {
    //       if (prod.quantity === 1) {
    //         localStorage.setItem("cart", JSON.stringify(prods.filter((prod) => prod.id !== id)))
    //         return prods.filter((prod) => prod.id !== id);
    //       } else {
    //         prod.quantity--;
    //       }
    //     }
    //   }
    //   return prod;
    // });
    let newProds;
    prods.map((prod) => {
      if (type === "minus") {
        if (prod.id === id) {
          if (prod.quantity === 1) {
            newProds = prods.filter((prod) => prod.id !== id);
          } else {
            newProds = prods.map((prod) => {
              if (prod.id === id) {
                prod.quantity--;
              }
              return prod;
            });
          }
        }
      } else {
        newProds = prods.map((prod) => {
          if (prod.id === id) {
            prod.quantity++;
          }
          return prod;
        });
      }
    });
    setProds(newProds);
    localStorage.setItem("cart", JSON.stringify(newProds));
  };
  console.log(prods);
  return (
    <div className={styles.homepage}>
      <p>Updated</p>
      <div className={styles.homepage__cards}>
        {productData.map((prod) => (
          <Card
            key={prod.id}
            cart={prods}
            changeQuant={changeQuant}
            addToCart={addToCart}
            {...prod}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
