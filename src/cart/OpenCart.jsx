import { Basket } from "@phosphor-icons/react";
import PropTypes from "prop-types";

function OpenCart({ classname, onClick }) {
  return (
    <div className={classname}>
      <button onClick={onClick} className="btn__openCart">
        <Basket className="btn__openCart--icon" />
        <p className="btn__openCart--text">Vezi coșul</p>
      </button>
    </div>
  );
}

OpenCart.propTypes = {
  classname: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default OpenCart;
