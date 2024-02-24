import { useDispatch, useSelector } from "react-redux";
import { getCart } from "./cartSlice";
import CartItem from "./CartItem";
import { X } from "@phosphor-icons/react";
import PropTypes from "prop-types";

function Cart({ cartOpen, setCartOpen }) {
  const cart = useSelector(getCart);
  if (cart.length > 0) {
    setCartOpen(true);
  } else {
    setCartOpen(false);
  }

  return (
    <div className={`cartOverview ${cartOpen ? "cartOverview--open" : ""}`}>
      <button onClick={() => setCartOpen(false)} className="cartOverview__btn">
        <X className="cartOverview__btn--icon" />
      </button>
      <ul className="cart">
        {cart.map((item) => (
          <CartItem item={item} key={item.productId} />
        ))}
      </ul>

      <div>
        <button>Comandă</button>
        <button>Golește coșul</button>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cartOpen: PropTypes.bool.isRequired,
  setCartOpen: PropTypes.func.isRequired,
};

export default Cart;
