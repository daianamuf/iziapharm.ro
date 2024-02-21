import { Leaf } from "@phosphor-icons/react";
import PropTypes from "prop-types";

function FlyingLeaf({ className }) {
  return <Leaf className={`leaf-icon in ${className}`} />;
}

FlyingLeaf.propTypes = {
  className: PropTypes.string.isRequired,
};

export default FlyingLeaf;
