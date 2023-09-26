import styles from "./Card.module.scss";
import Slider from "react-slick";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import { PiDotFill } from "react-icons/pi";
import PropTypes from "prop-types";

const Card = ({
  name,
  about,
  photos,
  price,
  quantity,
  count,
  type,
  id,
  cart,
  addToCart,
  increment,
  decrement,
  preview,
}) => {
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
  return (
    <div className={styles.card}>
      <div className={styles.card__image}>
        <span>
          {cart.find((prod) => prod.id === id)
            ? cart.find((prod) => prod.id === id).quantity
            : quantity}
        </span>
        <Slider {...settings}>
          {photos
            .split("|")
            .filter((prod) => prod !== "None")
            .map((img) => (
              <div onClick={() => preview(id)} key={img}>
                    <img src={img.replace("http", "https")} alt="" />
              </div>
            ))}
        </Slider>
      </div>
      <div onClick={() => preview(id)} className={styles.card__text}>
        <h1>{name}</h1>
        <p>
          <i>{about}</i>
        </p>
      </div>
      <div onClick={() => preview(id)} className={styles.card__infos}>
        <p>
          Narxi: <b>{price}</b>
        </p>
        <p>
          Mavjud: <b>{count}</b>
        </p>
      </div>
      <div className={styles.card__bottom}>
        <div>
          {cart.find((prod) => prod.id === id) ? (
            <div className={styles.card__bottom_plusMinus}>
              <button onClick={() => decrement(id)}>-</button>
              <p>{cart.find((prod) => prod.id === id).quantity}</p>
              <button onClick={() => increment(id)}>+</button>
            </div>
          ) : (
            <button onClick={() => addToCart(id)}>Savatga qo'shish</button>
          )}
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  name: PropTypes.string,
  about: PropTypes.string,
  photos: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  count: PropTypes.number,
  type: PropTypes.string,
  id: PropTypes.number,
  cart: PropTypes.array,
  addToCart: PropTypes.func,
  increment: PropTypes.func,
  decrement: PropTypes.func,
  preview: PropTypes.func,
};

export default Card;
