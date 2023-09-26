import { Fragment, useEffect, useRef, useState } from "react";
import Card from "../../components/card";
import styles from "./HomePage.module.scss";
import Slider from "react-slick";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { PiDotFill } from "react-icons/pi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import request from "../../helpers/request";
import OrderTab from "../../components/order";
import CardLoading from "../../components/cardloading";
import Ordered from "../../components/ordered";
import { LuBaby } from "react-icons/lu";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";

const HomePage = () => {
  const [cat, setCat] = useState("young");
  const [prods, setProds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [prevProd, setPrevProd] = useState(null);
  const [orderOpen, setOrderOpen] = useState(false);
  const [orderedOpen, setOrderedOpen] = useState(false);
  const [genderFilter, setGenderFilter] = useState("male");

  const sliderRef = useRef();

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

  useEffect(() => {
    setLoading(true);
    request
      .get("addviewproduct/")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);
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
  const preview = (id) => {
    setPrevProd(products.find((prod) => prod.id === id));
    document.body.classList.add("fixed");
  };
  const clearCart = () => {
    setProds([]);
  };
  const openOrdered = () => {
    setOrderedOpen(true);
    document.body.classList.add("fixed");
    setTimeout(() => {
      setOrderOpen(false);
      document.body.classList.remove("fixed");
      setOrderedOpen(false);
      document.body.classList.remove("fixed");
    }, 5000);
  };

  return (
    <div className={styles.homepage}>
      <Ordered open={orderedOpen} />
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
              {prevProd?.photos
                .toString()
                .split("|")
                .filter((img) => img !== "None")
                .map((img) => (
                  <div key={img}>
                    <img src={img.replace("http", "https")} alt="" />
                  </div>
                ))}
            </Slider>
          </div>
          <div className={styles.prev__desc}>
            <p>{prevProd?.about}</p>
          </div>
        </div>
      </div>
      <div className={styles.homepage__cats}>
        <span
          ref={sliderRef}
          style={{
            left: cat === "young" ? "15px" : "135px",
          }}
        ></span>
        <button
          onClick={() => {
            setCat("young");
          }}
        >
          <LuBaby size={18} />
          Bolalar
        </button>
        <button
          onClick={() => {
            setCat("adult");
          }}
        >
          <BsFillPersonFill size={18} />
          Kattalar
        </button>
      </div>
      {cat === "young" ? (
        <div className={styles.homepage__cards}>
          {loading ? (
            <div className={styles.homepage__cards_wrapper}>
              {Array(4)
                .fill(0)
                .map(() => (
                  <CardLoading />
                ))}
            </div>
          ) : products.filter((prod) => prod.type === "young kids").length ? (
            <div className={styles.homepage__cards_wrapper}>
              {products
                .filter((prod) => prod.type === "young kids")
                .map((prod) => (
                  <Card
                    key={prod.id}
                    cart={prods}
                    preview={preview}
                    increment={increment}
                    decrement={decrement}
                    addToCart={addToCart}
                    {...prod}
                  />
                ))}
            </div>
          ) : (
            <div>
              <p>Afsuski, bu kategoriyada mahsulotlar mavjud emas</p>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.homepage__cards}>
          <select
            name=""
            id=""
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option value="male">
              <FaMale /> Erkaklar
            </option>
            <option value="female">
              <FaFemale /> Ayollar
            </option>
          </select>
          {loading ? (
            <div className={styles.homepage__cards_wrapper}>
              {Array(4)
                .fill(0)
                .map(() => (
                  <CardLoading />
                ))}
            </div>
          ) : products.filter((prod) => prod.type === genderFilter).length ? (
            <div className={styles.homepage__cards_wrapper}>
              {products
                .filter((prod) => prod.type === genderFilter)
                .map((prod) => (
                  <Card
                    key={prod.id}
                    cart={prods}
                    preview={preview}
                    increment={increment}
                    decrement={decrement}
                    addToCart={addToCart}
                    {...prod}
                  />
                ))}
            </div>
          ) : (
            <div>
              <p>Afsuski, bu kategoriyada mahsulotlar mavjud emas</p>
            </div>
          )}
        </div>
      )}
      <OrderTab
        orderOpen={orderOpen}
        cart={prods}
        openOrdered={openOrdered}
        clearCart={clearCart}
        closeOrder={() => {
          setOrderOpen(false);
          document.body.classList.remove("fixed");
        }}
      />
    </div>
  );
};

export default HomePage;
