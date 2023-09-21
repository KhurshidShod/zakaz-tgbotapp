import styles from "./Card.module.scss";
import Slider from "react-slick";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import { PiDotFill } from "react-icons/pi";

const Card = () => {
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
        <span>0</span>
        <Slider {...settings}>
          <div>
            <img
              src="http://telegra.ph//file/8cc0d9a58c68c695b2076.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              src="http://telegra.ph//file/8cc0d9a58c68c695b2076.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              src="http://telegra.ph//file/8cc0d9a58c68c695b2076.jpg"
              alt=""
            />
          </div>
        </Slider>
      </div>
      <div className={styles.card__text}>
        <h1>Burger</h1>
        <p>Delicious hamburger with all the fixings.</p>
      </div>
      <div className={styles.card__infos}>
        <p>
          Narxi: <b>109.000</b>
        </p>
        <p>
          Mavjud: <b>5</b>
        </p>
      </div>
      <div className={styles.card__infos}>
        <p>
          Narxi: <b>109.000</b>
        </p>
        <p>
          Mavjud: <b>5</b>
        </p>
      </div>
      <div className={styles.card__infos}>
        <button></button>
      </div>
    </div>
  );
};

export default Card;
