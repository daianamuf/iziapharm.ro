import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";
import PropTypes from "prop-types";

function DeleteItem({ productId }) {
  const dispatch = useDispatch();

  return (
    <button
      className="btn__delete"
      onClick={() => dispatch(deleteItem(productId))}
    >
      Șterge din coș
    </button>
  );
}

DeleteItem.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default DeleteItem;
