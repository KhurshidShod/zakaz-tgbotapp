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
    const newProds = [...prods, productData.find((prod) => prod.id === id)];
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
  const sliderRef = useRef()
  console.log(prods);
  return (
    <div className={styles.homepage}>
      <div className={styles.homepage__cats}>
        <span ref={sliderRef}></span>
        <button onClick={(e) => {
          sliderRef.current.style.right = `${window.innerWidth - 16 - e.currentTarget.getBoundingClientRect().right}px`
        }}>Barchasi</button>
        <button onClick={(e) => {
          sliderRef.current.style.right = `${window.innerWidth - 16 - e.currentTarget.getBoundingClientRect().right}px`
        }}>Bolalar</button>
        <button onClick={(e) => {
          sliderRef.current.style.right = `${window.innerWidth - 16 - e.currentTarget.getBoundingClientRect().right}px`
        }}>Kattalar</button>
      </div>
      {cat === "all" ? (
        <div className={styles.homepage__cards}>
          <h1>All</h1>
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
          <h1>Young</h1>
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
          <h1>Adult</h1>
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
