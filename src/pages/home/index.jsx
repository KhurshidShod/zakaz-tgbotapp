import { useEffect, useRef, useState } from "react";
import Card from "../../components/card";
import styles from "./HomePage.module.scss";
import { productData } from "../../assets/data/products";
import Slider from "react-slick";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { PiDotFill } from "react-icons/pi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import request from "../../helpers/request";
import OrderTab from "../../components/order";

const HomePage = () => {
  const [cat, setCat] = useState("all");
  const [prods, setProds] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    request.get("addviewproduct/").then((res) => {
      setProducts(res.data);
    });
  }, []);
  const [prevProd, setPrevProd] = useState(null);
  const [orderOpen, setOrderOpen] = useState(false);
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
  };
  const addToCart = (id) => {
    const newProds = [
      ...prods,
      { ...products.find((prod) => prod.id === id), quantity: 1 },
    ];
    setProds(newProds);
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
    setPrevProd(productData.find((prod) => prod.id === id));
    document.body.classList.add("fixed");
  };

  const sliderRef = useRef();
  return (
    <div className={styles.homepage}>
      <div
        onClick={() => {
          setOrderOpen(true);
          document.body.classList.add("fixed");
        }}
        style={{ display: prods.length ? "flex" : "none" }}
        className={styles.pay__btn}
      >
        <p>Buyurtma berish</p>
      </div>
      <div
        className={`${styles.homepage__prev} ${
          prevProd ? styles.prevOpened : null
        }`}
      >
        <div className={styles.homepage__prev_wrapper}>
          <span
            onClick={() => {
              setPrevProd(null);
              document.body.classList.remove("fixed");
            }}
          >
            <AiOutlineCloseCircle />
          </span>
          <div className={styles.prev__img}>
            <Slider {...settings}>
              {prevProd?.image.map((img) => (
                <div key={img}>
                  <img src={img} alt="" />
                </div>
              ))}
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
          {products.length ? (
            products.map((prod) => (
              <Card
                increment={increment}
                decrement={decrement}
                key={prod.id}
                cart={prods}
                preview={preview}
                addToCart={addToCart}
                {...prod}
              />
            ))
          ) : (
            <div>
              <p>Afsuski, mahsulotlar mavjud emas</p>
            </div>
          )}
        </div>
      ) : cat === "young" ? (
        <div className={styles.homepage__cards}>
          {products.filter((prod) => prod.type === "young kids").length ? (
            products
              .filter((prod) => prod.type === "young kids")
              .map((prod) => (
                <Card
                  key={prod.id}
                  cart={prods}
                  increment={increment}
                  decrement={decrement}
                  addToCart={addToCart}
                  {...prod}
                />
              ))
          ) : (
            <div>
              <p>Afsuski, bu kategoriyada mahsulotlar mavjud emas</p>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.homepage__cards}>
          {products.filter((prod) => prod.type === "adults").length ? (
            products
              .filter((prod) => prod.type === "adults")
              .map((prod) => (
                <Card
                  key={prod.id}
                  cart={prods}
                  increment={increment}
                  decrement={decrement}
                  addToCart={addToCart}
                  {...prod}
                />
              ))
          ) : (
            <div>
              <p>Afsuski, bu kategoriyada mahsulotlar mavjud emas</p>
            </div>
          )}
        </div>
      )}
      <OrderTab orderOpen={orderOpen} cart={prods} closeOrder={() => {
        setOrderOpen(false)
        document.body.classList.remove('fixed')
      }} />
    </div>
  );
};

export default HomePage;
