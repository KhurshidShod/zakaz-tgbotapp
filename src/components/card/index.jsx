import styles from "./Card.module.scss";
import Slider from "react-slick";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import { PiDotFill } from "react-icons/pi";

const Card = ({
  name,
  description,
  image,
  price,
  quantity,
  count,
  category,
  id,
  cart,
  addToCart,
  increment,
  decrement,
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
          {image.map((img) => (
            <div key={img}>
              <img src={img} alt="" />
            </div>
          ))}
        </Slider>
      </div>
      <div className={styles.card__text}>
        <h1>{name}</h1>
        <p>
          <i>{description}</i>
        </p>
      </div>
      <div className={styles.card__infos}>
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

export default Card;
