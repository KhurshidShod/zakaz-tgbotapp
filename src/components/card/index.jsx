import styles from "./Card.module.scss";

const Card = () => {
  return (
    <div className={styles.card}>
      <div className={styles.card__image}>
        <img src="http://telegra.ph//file/8cc0d9a58c68c695b2076.jpg" alt="" />
      </div>
      <div className={styles.card__text}>
        <h1>Burger</h1>
        <p>Delicious hamburger with all the fixings.</p>
      </div>
      <div className={styles.card__infos}>
        <p>Narxi: <b>109.000</b></p>
        <p>Mavjud: <b>5</b></p>
      </div>
    </div>
  );
};

export default Card;
