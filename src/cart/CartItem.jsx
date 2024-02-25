import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { getCurrentQuantityById } from "./cartSlice";
import { useContext, useEffect } from "react";
import { OrderContext } from "../App";

function CartItem({ item }) {
  const { productId, name, quantity, totalPrice, prescription } = item;

  const currentQuantity = useSelector(getCurrentQuantityById(productId));
  const { setNeedsPrescription } = useContext(OrderContext);

  useEffect(() => {
    if (prescription) {
      setNeedsPrescription(true);
    } else {
      setNeedsPrescription(false);
    }
  }, [prescription, setNeedsPrescription]);

  return (
    <li className="cart__item">
      <p className="cart__item--quantity">
        {quantity}&times; {name}
      </p>

      <p className="cart__item--price">{totalPrice} RON</p>
      {prescription && (
        <p className="cart__item--prescription">
          - Necesită prescripție medicală!
        </p>
      )}

      <UpdateItemQuantity
        classname="cart__quantity"
        productId={productId}
        currentQuantity={currentQuantity}
      />
      <DeleteItem productId={productId} />
    </li>
  );
}

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CartItem;
