import styles from "./Card.module.scss";
import Slider from "react-slick";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import { PiDotFill } from "react-icons/pi";

const Card = ({ name, description, image, quantity, count, category }) => {
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
          {image.map(img => (
            <div key={img}>
              <img src={img} alt="" />
            </div>
          ))}
        </Slider>
      </div>
      <div className={styles.card__text}>
        <h1>{name}</h1>
        <p>{description}</p>
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
      <div className={styles.card__bottom}>
        <div><button>Xardi qilish</button></div>
        <p>Mavjud: {count}</p>
      </div>
    </div>
  );
};

export default Card;
