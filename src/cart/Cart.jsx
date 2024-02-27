import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Leaf, X } from "@phosphor-icons/react";
import { clearCart, getCart, getTotalCartPrice } from "./cartSlice";
import { OrderContext } from "../App";
import CartItem from "./CartItem";

function Cart({ cartOpen, setCartOpen }) {
  const [showMessage, setShowMessage] = useState(false);
  const cart = useSelector(getCart);
  const { needsPrescription, modalOpen, setModalOpen } =
    useContext(OrderContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalCartPrice = useSelector(getTotalCartPrice);

  const handleNoClick = () => {
    setShowMessage(false);
  };

  const handleOrderClick = () => {
    if (needsPrescription) {
      setShowMessage(true);
    } else {
      navigate("/comanda");
      setCartOpen(false);
    }
  };

  const handleYesClick = () => {
    navigate("/comanda");
    setCartOpen(false);
  };

  useEffect(() => {
    setCartOpen(cart.length > 0);
  }, [cart, setCartOpen]);

  useEffect(() => {
    if (showMessage) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [setModalOpen, showMessage]);

  return (
    <>
      <div
        className={`cartOverview ${cartOpen ? "cartOverview--open" : ""} ${
          modalOpen ? "blur" : ""
        } `}
      >
        <button
          onClick={() => setCartOpen(false)}
          className="cartOverview__btn"
        >
          <X className="cartOverview__btn--icon" />
        </button>
        <ul className="cart">
          {cart.map((item) => (
            <CartItem item={item} key={item.productId} />
          ))}
        </ul>

        <p className="cartOverview__total">TOTAL: {totalCartPrice} RON</p>
        <div className="cartOverview__btns">
          <button
            className="cartOverview__btn--order"
            onClick={handleOrderClick}
          >
            <Leaf className="cartOverview__btn--order-icon" /> Comandă
          </button>
          <button
            className="cartOverview__btn--delete underline_animation_hover--green"
            onClick={() => dispatch(clearCart())}
          >
            Golește coșul
          </button>
        </div>
      </div>

      {showMessage && (
        <div className="cart__message">
          <p className="cart__message--text">
            Comanda dumneavoastră conține produse care necesită o rețetă
            medicală! Continuați comanda?
          </p>
          <div className="cart__message--choices">
            <Link
              className="cart__message--btn"
              to={"/comanda"}
              onClick={handleYesClick}
            >
              DA
            </Link>
            <button className="cart__message--btn" onClick={handleNoClick}>
              NU
            </button>
          </div>
        </div>
      )}
    </>
  );
}

Cart.propTypes = {
  cartOpen: PropTypes.bool.isRequired,
  setCartOpen: PropTypes.func.isRequired,
};

export default Cart;
