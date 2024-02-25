import { Leaf } from "@phosphor-icons/react";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { getCart } from "../cart/cartSlice";
import { OrderContext } from "../App";

function OrderForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const cart = useSelector(getCart);
  const { needsPrescription } = useContext(OrderContext);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <section className="order">
      <h1 className="order__heading">Comandă</h1>
      <form className="order__form">
        {cart.length > 0 && (
          <ul className="order__list">
            {cart.map((item) => (
              <li className="order__list--item" key={item.productId}>
                <Leaf className="order__list--icon" />
                <p className="order__list--quantity">
                  {item.quantity}&times; {item.name}
                </p>
                <p className="order__list--price"> - {item.totalPrice} RON</p>
              </li>
            ))}
          </ul>
        )}
        <p className="order__form--text">
          <span>*</span>
          <span>- câmpuri obligatorii</span>
        </p>
        <label htmlFor="nume" className="order__form--label">
          Nume<span>*</span>
        </label>
        <input
          id="nume"
          type="text"
          className="order__form--input"
          autoComplete="true"
        />

        <label htmlFor="prenume" className="order--label">
          Prenume<span>*</span>
        </label>
        <input
          id="prenume"
          type="text"
          className="order__form--input"
          autoComplete="true"
        />

        <label htmlFor="email" className="order__form--label">
          Email<span>*</span>
        </label>
        <input
          id="email"
          type="email"
          className="order__form--input"
          autoComplete="true"
        />

        <label htmlFor="observations" className="order__form--label">
          Observații
        </label>
        <textarea
          id="observations"
          type="text"
          rows={5}
          className="order__form--input"
        />

        {needsPrescription && (
          <div>
            <label htmlFor="fileUpload" className="order__form--label">
              Încarcă rețeta - img / pdf
            </label>
            <input
              className="order__form--input order__form--file"
              type="file"
              id="fileUpload"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
            />

            <label htmlFor="medic" className="order--label">
              Medic- nume și prenume<span>*</span>
            </label>
            <input
              id="medic"
              type="text"
              className="order__form--input"
              autoComplete="true"
            />
          </div>
        )}

        <div className="order__from--submit">
          <button className="order__form--btn">Trimite Comanda</button>
          {isSubmitted && <Leaf className="order__leaf" />}
        </div>
      </form>
    </section>
  );
}

export default OrderForm;
