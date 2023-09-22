import { useRef, useState } from "react";
import Card from "../../components/card";
import styles from "./HomePage.module.scss";
import { productData } from "../../assets/data/products";
import { Tabs, Tab } from "react-bootstrap";

const HomePage = () => {
  const localProds = localStorage.getItem("cart");
  const [cat, setCat] = useState("all");
  const [prods, setProds] = useState(JSON.parse(localProds) || []);
  const addToCart = (id) => {
    const newProds = [...prods, {...productData.find((prod) => prod.id === id), quantity: 1}];
    setProds(newProds);
    localStorage.setItem("cart", JSON.stringify(newProds));
  };
  const changeQuant = (type, id) => {
    let newProds;
    prods.map((prod) => {
      if (type === "minus") {
        if (prod.id === id) {
          if (prod.quantity === 1) {
            newProds = prods.filter((prod) => prod.id !== id);
          } else {
            newProds = prods.map((prod) => {
              if (prod.id === id) {
                prod.quantity-=1;
              }
              return prod;
            });
          }
        }
      } else {
        newProds = prods.map((prod) => {
          if (prod.id === id) {
            if (prod.quantity >= prod.count) {
              prod.quantity += 0;
            } else {
              prod.quantity += 1;
            }
          }
          return prod;
        });
      }
    });
    setProds(newProds);
    localStorage.setItem("cart", JSON.stringify(newProds));
  };
  const sliderRef = useRef();
  console.log(prods);
  return (
    <div className={styles.homepage}>
      <div className={styles.homepage__cats}>
        <span
          ref={sliderRef}
          style={{
            left: cat === "all" ? "5px" : cat === "young" ? "125px" : "240px",
          }}
        ></span>
        <button
          onClick={() => {
            setCat("all");
          }}
        >
          Barchasi
        </button>
        <button
          onClick={() => {
            setCat("young");
          }}
        >
          Bolalar
        </button>
        <button
          onClick={() => {
            setCat("adult");
          }}
        >
          Kattalar
        </button>
      </div>
      {cat === "all" ? (
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
      ) : cat === "young" ? (
        <div className={styles.homepage__cards}>
          {productData
            .filter((prod) => prod.category === "young kids")
            .map((prod) => (
              <Card
                key={prod.id}
                cart={prods}
                changeQuant={changeQuant}
                addToCart={addToCart}
                {...prod}
              />
            ))}
        </div>
      ) : (
        <div className={styles.homepage__cards}>
          {productData
            .filter((prod) => prod.category === "adults")
            .map((prod) => (
              <Card
                key={prod.id}
                cart={prods}
                changeQuant={changeQuant}
                addToCart={addToCart}
                {...prod}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
