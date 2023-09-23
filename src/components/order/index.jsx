import { useState } from "react";
import request from "../../helpers/request";
import styles from "./Order.module.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";

const OrderTab = ({ orderOpen, clearCart, closeOrder, cart }) => {
  const [comment, setComment] = useState("");
  const checkPrice = (price) => {
    if (price.toString().length === 4) {
      return `${price.toString().slice(0, 1)},${price.toString().slice(1)}`;
    } else if (price.toString().length === 5) {
      return `${price.toString().slice(0, 2)},${price.toString().slice(2)}`;
    } else if (price.toString().length === 6) {
      return `${price.toString().slice(0, 3)},${price.toString().slice(3)}`;
    } else if (price.toString().length === 7) {
      return `${price.toString().slice(0, 1)},${price
        .toString()
        .slice(1, 4)},${price.toString().slice(4)}`;
    } else if (price.toString().length === 8) {
      return `${price.toString().slice(0, 2)},${price
        .toString()
        .slice(2, 5)},${price.toString().slice(5)}`;
    } else if (price.toString().length === 9) {
      return `${price.toString().slice(0, 3)},${price
        .toString()
        .slice(3, 6)},${price.toString().slice(6)}`;
    }
  };
  const postOrderData = () => {
    cart.map((prod) => {
      request
        .post("addviewordered/", {
          user_id: 4,
          product_id: prod.id,
          product_name: prod.name,
          product_price: prod.price,
          count_of_product: prod.quantity,
          phone_number: 998935131004,
          ordered_date: new Date().toISOString(),
          // order_comment: comment,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => {
          closeOrder();
          toast.success(
            "Buyurtma qabul qilindi. Tez orada siz bilan bog'lanamiz"
          );
          clearCart()
        });
    });
  };
  return (
    <div className={`${styles.order} ${orderOpen ? styles.open : null}`}>
      <div className={styles.order__wrapper}>
        <div className={styles.order__wrapper_top}>
          <div>
            <h3>Buyurtmalaringiz</h3>
            <span onClick={closeOrder}>
              <AiOutlineCloseCircle />
            </span>
          </div>
          <hr />
        </div>
        <div className={styles.order__wrapper_orders}>
          {cart.map((prod) => (
            <div key={prod.id} className={styles.order__wrapper_orders_order}>
              <div>
                <img
                  src={prod.photos.split("|")[0].replace("http", "https")}
                  alt=""
                />
                <div>
                  <h5>
                    {prod.name} <span>{prod.quantity}x</span>
                  </h5>
                  <p>{prod.about}</p>
                </div>
              </div>
              <h4>{checkPrice(prod.price * prod.quantity)}</h4>
            </div>
          ))}
          <hr />
        </div>
        <div className={styles.order__wrapper_comment}>
          <input
            type="text"
            onChange={(e) => setComment(e.target.value)}
            placeholder="Izoh..."
            name=""
            id=""
          />
        </div>
        <button onClick={postOrderData}>Buyurtma berish</button>
      </div>
    </div>
  );
};

export default OrderTab;
