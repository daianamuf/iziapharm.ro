import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

function UpdateItemQuantity({ productId, currentQuantity, classname }) {
  const dispatch = useDispatch();

  return (
    <div className={classname}>
      <button
        className="btn__update"
        onClick={() => dispatch(decreaseItemQuantity(productId))}
      >
        -
      </button>
      <span className="text__quantity">{currentQuantity}</span>
      <button
        className="btn__update"
        onClick={() => dispatch(increaseItemQuantity(productId))}
      >
        +
      </button>
    </div>
  );
}

UpdateItemQuantity.propTypes = {
  productId: PropTypes.string.isRequired,
  currentQuantity: PropTypes.number.isRequired,
  classname: PropTypes.string.isRequired,
};

export default UpdateItemQuantity;
