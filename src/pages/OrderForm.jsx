import { Leaf } from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCart } from "../cart/cartSlice";
import { OrderContext } from "../App";
import FormChoice from "../components/FormChoice";

function OrderForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [choice, setChoice] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const cart = useSelector(getCart);
  const { needsPrescription, choiceOpen, vet, setVet } =
    useContext(OrderContext);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    if (choice === "vet") {
      setVet(true);
    } else {
      setVet(false);
    }
  }, [choice, setVet]);

  console.log(choice);
  console.log(vet, "vet");

  return (
    <section className="order">
      <h1 className="order__heading">Comandă</h1>
      {choiceOpen && <FormChoice choice={choice} setChoice={setChoice} />}
      {!choiceOpen && (
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

          {vet && <h3 className="order__form--heading">Proprietar</h3>}

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

          <div className="order__form--field">
            <label htmlFor="gender" className="order__form--label">
              În calitate de
            </label>
            <select id="gender" className="order__form--input">
              <option value=""></option>
              <option value="pacient">Pacient</option>
              <option value="medic">Medic</option>
              <option value="clinica">Clinică</option>
              <option value="altele">Altele</option>
            </select>
          </div>

          {vet && (
            <div className="order__form--vet">
              <h3 className="order__form--heading">Pacient</h3>

              <div className="order__form--vet-input">
                <label htmlFor="numeAnimal" className="order__form--label">
                  Nume<span>*</span>
                </label>
                <input
                  id="numeAnimal"
                  type="text"
                  className="order__form--input"
                  autoComplete="true"
                />
              </div>

              <div className="order__form--vet-input">
                <label htmlFor="specie" className="order__form--label">
                  Specie<span>*</span>
                </label>
                <input
                  id="specie"
                  type="text"
                  className="order__form--input"
                  autoComplete="true"
                />
              </div>

              <div className="order__form--vet-input">
                <label htmlFor="gender" className="order__form--label">
                  Sex
                </label>
                <select id="gender" className="order__form--input">
                  <option value="">Sex</option>
                  <option value="feminin">Femelă</option>
                  <option value="masculin">Mascul</option>
                </select>
              </div>

              <div className="order__form--vet-input">
                <label htmlFor="varsta" className="order__form--label">
                  Varsta (ani)<span>*</span>
                </label>
                <input
                  id="varsta"
                  type="text"
                  className="order__form--input"
                  autoComplete="true"
                />
              </div>

              <div className="order__form--vet-input">
                <label htmlFor="greutate" className="order__form--label">
                  Greutate (kg)<span>*</span>
                </label>
                <input
                  id="greutate"
                  type="text"
                  className="order__form--input"
                  autoComplete="true"
                />
              </div>
            </div>
          )}

          <label htmlFor="observations" className="order__form--heading">
            Descrie comanda
          </label>
          <textarea
            id="observations"
            type="text"
            rows={5}
            className="order__form--input"
          />

          {needsPrescription && (
            <div className="order__form--prescription">
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

          <button className="order__form--btn">Trimite Comanda</button>
        </form>
      )}
    </section>
  );
}

export default OrderForm;
