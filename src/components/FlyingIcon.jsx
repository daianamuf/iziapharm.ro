import { Pill } from "@phosphor-icons/react";
import PropTypes from "prop-types";

function FlyingIcon({ className }) {
  return <Pill className={`pill-icon in ${className}`} />;
}

FlyingIcon.propTypes = {
  className: PropTypes.string.isRequired,
};

export default FlyingIcon;
