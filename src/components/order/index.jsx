import { useEffect, useState } from "react";
import request from "../../helpers/request";
import styles from "./Order.module.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";

const OrderTab = ({ orderOpen, clearCart, closeOrder, cart, openOrdered }) => {
  const localTel = localStorage.getItem("tel");
  const [comment, setComment] = useState("");
  const [users, setUsers] = useState([]);
  const [tel, setTel] = useState(
    `+${JSON.parse(localTel || JSON.stringify("998"))}`
  );
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
  const phoneCheck = users.find((user) => user.phone_number == (tel.includes("+") ? tel.slice(4) : tel.slice(3)));
  const postOrderData = () => {
    if (tel.length >= 12 && phoneCheck) {
      cart.map((prod) => {
        request
          .post("addviewordered/", {
            user_id: 0,
            product_id: prod.id,
            product_name: prod.name,
            product_price: prod.cheap_price === 0 ? prod.price : prod.cheap_prcie,
            count_of_product: prod.quantity,
            phone_number: tel.includes("+") ? tel.slice(4) : tel.slice(3),
            ordered_date: new Date().toISOString(),
            comment: comment,
          })
          .then(() => {
            clearCart();
            openOrdered();
          })
          .catch(() => {
            toast.error("Xatolik yuz berdi. Birozdan so'ng urunib koring");
          });
      });
      localStorage.setItem("tel", tel.includes("+") ? tel.substring(1) : tel);
    } else {
      toast.error("Botda ro'yxatdan o'tgan raqamingizni kiriting.");
    }
  };
  useEffect(() => {
    request.get("addviewperson/").then((res) => setUsers(res.data));
  }, []);
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
        <div className={styles.order__wrapper_tel}>
          <p>Aloqa uchun telefon raqam:</p>
          <input
            value={tel}
            required
            type="tel"
            onChange={(e) => {
              setTel(e.target.value);
              console.log(phoneCheck);
            }}
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
