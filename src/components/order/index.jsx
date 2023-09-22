import styles from './Order.module.scss'

const OrderTab = () => {
  return (
    <div className={styles.order}>
      <div className={styles.order__wrapper}>
        <div className={styles.order__wrapper_top}>
          <h3>Buyurtmalaringiz</h3>
          <hr />
        </div>
        <div className={styles.order__wrapper_orders}>
          <div className={styles.order__wrapper_orders_order}>
            <div>
              <img src="https://telegra.ph//file/8cc0d9a58c68c695b2076.jpg" alt="" />
              <div>
                <h5>Coke <span>1x</span></h5>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <h4>2000000</h4>
          </div>
          <div className={styles.order__wrapper_orders_order}>
            <div>
              <img src="https://telegra.ph//file/8cc0d9a58c68c695b2076.jpg" alt="" />
              <div>
                <h5>Coke <span>1x</span></h5>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <h4>2000000</h4>
          </div>
          <div className={styles.order__wrapper_orders_order}>
            <div>
              <img src="https://telegra.ph//file/8cc0d9a58c68c695b2076.jpg" alt="" />
              <div>
                <h5>Coke <span>1x</span></h5>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <h4>2000000</h4>
          </div>
          <hr />
        </div>
        <div className={styles.order__wrapper_comment}>
          <input type="text" placeholder='Izoh...' name="" id="" />
        </div>
      </div>
    </div>
  )
}

export default OrderTab