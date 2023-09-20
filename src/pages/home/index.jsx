import Card from "../../components/card";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <div className={styles.homepage}>
      <div className={styles.homepage__cards}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default HomePage;
