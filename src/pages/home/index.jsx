import { useRef, useState } from "react";
import Card from "../../components/card";
import styles from "./HomePage.module.scss";
import { productData } from "../../assets/data/products";
import Slider from "react-slick";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { PiDotFill } from "react-icons/pi";
import { AiOutlineCloseCircle } from 'react-icons/ai'

const HomePage = () => {
  const localProds = localStorage.getItem("cart");
  const [cat, setCat] = useState("all");
  const [prods, setProds] = useState(JSON.parse(localProds) || []);
  const [prevProd, setPrevProd] = useState(null)
  const increment = (id) => {
    let newProds = prods.map((prod) => {
      if (prod.id === id) {
        if (prod.quantity >= prod.count) {
          prod.quantity += 0;
        } else {
          prod.quantity += 1;
        }
      }
      return prod;
    });
    setProds(newProds);
    localStorage.setItem("cart", JSON.stringify(newProds));
  };
  const decrement = (id) => {
    let prod = prods.find((prod) => prod.id === id);
    let newProds;
    if (prod.quantity === 1) {
      newProds = prods.filter((prod) => prod.id !== id);
    } else {
      newProds = prods.map((prod) => {
        if (prod.id === id) {
          prod.quantity -= 1;
        }
        return prod;
      });
    }
    setProds(newProds);
    localStorage.setItem("cart", JSON.stringify(newProds));
  };
  const addToCart = (id) => {
    const newProds = [
      ...prods,
      { ...productData.find((prod) => prod.id === id), quantity: 1 },
    ];
    setProds(newProds);
    localStorage.setItem("cart", JSON.stringify(newProds));
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    swipeToSlide: true,
    nextArrow: <GrFormNext color="white" />,
    prevArrow: <GrFormPrevious color="white" />,
    customPaging: () => <li>{<PiDotFill />}</li>,
  };
  const preview = (id) => {
    setPrevProd(productData.find(prod => prod.id === id))
  }

  const sliderRef = useRef();
  return (
    <div className={styles.homepage}>
    <div className={styles.pay__btn}>
      <p>Buyurtma berish</p>
    </div>
      <div className={`${styles.homepage__prev} ${prevProd ? styles.prevOpened : null }`}>
        <div className={styles.homepage__prev_wrapper}>
        <span onClick={() => setPrevProd(null)}><AiOutlineCloseCircle /></span>
          <div className={styles.prev__img}>
            <Slider {...settings}>
              {prevProd?.image.map(img => <div key={img}><img src={img} alt="" /></div>)}
            </Slider>
          </div>
          <div className={styles.prev__desc}>
            <p>{prevProd?.description}</p>
          </div>
        </div>
      </div>
      <div className={styles.homepage__cats}>
        <span
          ref={sliderRef}
          style={{
            left: cat === "all" ? "5px" : cat === "young" ? "100px" : "195px",
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
              increment={increment}
              decrement={decrement}
              key={prod.id}
              cart={prods}
              preview={preview}
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
                increment={increment}
                decrement={decrement}
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
                increment={increment}
                decrement={decrement}
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
