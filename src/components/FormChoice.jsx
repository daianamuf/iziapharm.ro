import { useContext, useState } from "react";
import { OrderContext } from "../App";
import PropTypes from "prop-types";

function FormChoice({ choice, setChoice }) {
  const { setChoiceOpen } = useContext(OrderContext);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (choice) {
      setChoiceOpen(false);
      setMessage("");
    } else {
      setMessage("Pentru a merge mai departe, alegeți o categorie!");
    }
  };

  const handleChange = (e) => {
    setChoice(e.target.value);
  };

  return (
    <form className="formchoice">
      <h3 className="formchoice__heading">Ce doriți să comandați?</h3>
      <div className="formchoice__choice">
        <input
          className="formchoice__input"
          id="uman"
          type="radio"
          name="choice"
          value="uman"
          onChange={handleChange}
          checked={choice === "uman"}
        />
        <label htmlFor="uman">Preparate de uz uman</label>
      </div>
      <div className="formchoice__choice">
        <input
          className="formchoice__input"
          id="vet"
          type="radio"
          name="choice"
          value="vet"
          onChange={handleChange}
          checked={choice === "vet"}
        />
        <label htmlFor="vet">Preparate de uz veterinar</label>
      </div>
      <button className="formchoice__btn" onClick={handleSubmit}>
        Continuați
      </button>
      <p className="formchoice__msg">{message}</p>
    </form>
  );
}

FormChoice.propTypes = {
  choice: PropTypes.string.isRequired,
  setChoice: PropTypes.func.isRequired,
};

export default FormChoice;
