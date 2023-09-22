import styles from "./CardLoading.module.scss";

const CardLoading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loading__img}></div>
      <div className={styles.loading__title}></div>
      <div className={styles.loading__desc}></div>
      <div className={styles.loading__info}>
        <div className={styles.loading__info_left}></div>
        <div className={styles.loading__info_right}></div>
      </div>
      <div className={styles.loading__buttons}>
        <div className={styles.loading__buttons_button}></div>
      </div>
    </div>
  );
};

export default CardLoading;
