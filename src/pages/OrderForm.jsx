import { Leaf } from "@phosphor-icons/react";
import { useContext, useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { getCart, getTotalCartPrice } from "../cart/cartSlice";
import { OrderContext } from "../App";
import FormChoice from "../components/FormChoice";
import readFile from "../useFileReader";

const initialState = {
  inputs: {
    lastName: "",
    firstName: "",
    email: "",
    phoneNumber: "",
    role: "",
    petName: "",
    species: "",
    gender: "",
    age: "",
    weight: "",
    orderDescription: "",
    fileUpload: "",
    medic: "",
  },
  errors: {},
};

function formReducer(state, action) {
  switch (action.type) {
    case "setInput":
      return {
        ...state,
        inputs: { ...state.inputs, [action.field]: action.value },
      };
    case "setError":
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.error },
      };
    case "resetForm":
      return initialState;
    default:
      return state;
  }
}

function OrderForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [formKey, setFormKey] = useState(Date.now());

  // const [isSubmitted, setIsSubmitted] = useState(false);
  // const [selectedFile, setSelectedFile] = useState(null);
  const [choice, setChoice] = useState("");
  const cart = useSelector(getCart);
  const { needsPrescription, choiceOpen, vet, setVet } =
    useContext(OrderContext);
  const totalCartPrice = useSelector(getTotalCartPrice);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
    if (!file) {
      dispatch({
        type: "setError",
        field: "fileUpload",
        error: "Nici un fișier selectat.",
      });
      return;
    }
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxSize = 5 * 1024 * 1024; // 5 MB in bytes

    if (!allowedTypes.includes(file.type)) {
      dispatch({
        type: "setError",
        field: "fileUpload",
        error:
          "Tipul fișierului este invalid. Doar JPEG, PNG, și PDF sunt permise.",
      });
      return;
    }

    if (file.size > maxSize) {
      dispatch({
        type: "setError",
        field: "fileUpload",
        error: "Mărimea fișierului nu ar trebui să depășeasca 5MB.",
      });
      return;
    }

    dispatch({ type: "setInput", field: "fileUpload", value: file });
    dispatch({ type: "setError", field: "fileUpload", error: "" });
  };

  useEffect(() => {
    if (choice === "vet") {
      setVet(true);
    } else {
      setVet(false);
    }
  }, [choice, setVet]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch({ type: "setInput", field: id, value });
    validateInput(id, value);
  };

  const validateInput = (id, value) => {
    let error = "";
    switch (id) {
      case "lastName":
      case "firstName":
      case "petName":
      case "species":
      case "medic":
        if (!value.trim()) {
          error = "Acest câmp este obligatoriu.";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Acest câmp este obligatoriu.";
        } else if (
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
        ) {
          error = "Adresa de email nu este validă.";
        }
        break;
      case "phoneNumber":
        if (!/^\+?(\d.*){10,}$/.test(value)) {
          error = "Numărul de telefon nu este valid.";
        } else if (!value) {
          error = "Acest câmp este obligatoriu.";
        }
        break;
      case "age":
      case "weight":
        if (!value.trim()) {
          error = "Acest câmp este obligatoriu.";
        } else if (isNaN(value) || Number(value) <= 0) {
          error = "Vă rugăm să introduceți un număr valid.";
        }
        break;
      case "orderDescription":
        if (!value.trim()) {
          error = "Vă rugăm să descrieți comanda.";
        }
        break;
      default:
        error = "";
    }
    dispatch({ type: "setError", field: id, error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isFormValid = true;

    Object.keys(state.inputs).forEach((key) => {
      validateInput(key, state.inputs[key]);
      if (state.errors[key]) {
        isFormValid = false;
      }
    });

    // Additional check for fileUpload to ensure an error is displayed if no file is selected
    if (
      !state.inputs.fileUpload ||
      state.inputs.fileUpload instanceof File === false
    ) {
      dispatch({
        type: "setError",
        field: "fileUpload",
        error: "Nici un fișier selectat.",
      });
      isFormValid = false;
    } else {
      // Ensure any previous error messages are cleared if the file is now valid
      dispatch({ type: "setError", field: "fileUpload", error: "" });
    }

    if (isFormValid) {
      
      // Proceed with form submission actions if validation passes
      setOrder(state.inputs);

      // Consider resetting the form or providing further user feedback here
      dispatch({ type: "resetForm" });
      setSubmissionMessage("Comanda a fost trimisă cu succes!");
      setFormKey(Date.now());

      setTimeout(() => {
        setSubmissionMessage("");
      }, 5000);
    }
  };

  const setOrder = async (inputs) => {
    inputs.fileUpload = await readFile(inputs.fileUpload);
    console.log(JSON.stringify(inputs));
    try {
      const response = await fetch('/.netlify/functions/orderHandler', {
        method: 'POST',
        body: JSON.stringify(inputs), 
      });
      if (!response.ok) throw new Error('Upload failed');
      const result = await response.json();
      console.log('Upload successful:', result);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  return (
    <section className="order">
      <h1 className="order__heading">Comandă</h1>
      {choiceOpen && <FormChoice choice={choice} setChoice={setChoice} />}
      {!choiceOpen && (
        <form key={formKey} className="order__form" onSubmit={handleSubmit}>
          {cart.length > 0 && (
            <>
              <ul className="order__list">
                {cart.map((item) => (
                  <li className="order__list--item" key={item.productId}>
                    <Leaf className="order__list--icon" />
                    <p className="order__list--quantity">
                      {item.quantity}&times; {item.name}
                    </p>
                    <p className="order__list--price">
                      {" "}
                      - {item.totalPrice} RON
                    </p>
                  </li>
                ))}
              </ul>
              <p className="order__list--total">TOTAL: {totalCartPrice} RON</p>
            </>
          )}

          <p className="order__form--text">
            <span>*</span>
            <span>- câmpuri obligatorii</span>
          </p>

          {vet && <h3 className="order__form--heading">Proprietar</h3>}

          <label htmlFor="lastName" className="order__form--label">
            Nume<span>*</span>
            {state.errors.lastName && (
              <span className="error-message">{state.errors.lastName}</span>
            )}
          </label>
          <input
            id="lastName"
            type="text"
            className="order__form--input"
            autoComplete="true"
            onChange={handleChange}
          />

          <label htmlFor="firstName" className="order__form--label">
            Prenume<span>*</span>
            {state.errors.firstName && (
              <span className="error-message">{state.errors.firstName}</span>
            )}
          </label>
          <input
            id="firstName"
            type="text"
            className="order__form--input"
            autoComplete="true"
            onChange={handleChange}
          />

          <label htmlFor="email" className="order__form--label">
            Email<span>*</span>
            {state.errors.email && (
              <span className="error-message">{state.errors.email}</span>
            )}
          </label>
          <input
            id="email"
            type="email"
            className="order__form--input"
            autoComplete="true"
            onChange={handleChange}
          />

          <div className="order__form--field">
            <div>
              <label htmlFor="phoneNumber" className="order__form--label">
                Telefon<span>*</span>
              </label>
              <input
                id="phoneNumber"
                type="tel"
                className="order__form--input"
                value={state.inputs.phoneNumber}
                onChange={handleChange}
                autoComplete="true"
              />
              {state.errors.phoneNumber && (
                <span className="error-message">
                  {state.errors.phoneNumber}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="role" className="order__form--label">
                În calitate de
              </label>
              <select
                id="role"
                className="order__form--input"
                onChange={handleChange}
              >
                <option value=""></option>
                <option value="pacient">Pacient</option>
                <option value="medic">Medic</option>
                <option value="clinica">Clinică</option>
                <option value="altele">Altele</option>
              </select>
            </div>
          </div>

          {vet && (
            <div className="order__form--vet">
              <h3 className="order__form--heading">Pacient</h3>

              <div className="order__form--vet-input">
                <label htmlFor="petName" className="order__form--label">
                  Nume<span>*</span>
                  {state.errors.petName && (
                    <span className="error-message">
                      {state.errors.petName}
                    </span>
                  )}
                </label>
                <input
                  id="petName"
                  type="text"
                  className="order__form--input"
                  autoComplete="true"
                  onChange={handleChange}
                />
              </div>

              <div className="order__form--vet-input">
                <label htmlFor="species" className="order__form--label">
                  Specie<span>*</span>
                  {state.errors.species && (
                    <span className="error-message">
                      {state.errors.species}
                    </span>
                  )}
                </label>
                <input
                  id="species"
                  type="text"
                  className="order__form--input"
                  autoComplete="true"
                  onChange={handleChange}
                />
              </div>

              <div className="order__form--vet-input">
                <label htmlFor="gender" className="order__form--label">
                  Sex
                </label>
                <select
                  id="gender"
                  className="order__form--input"
                  onChange={handleChange}
                >
                  <option value=""></option>
                  <option value="feminin">Femelă</option>
                  <option value="masculin">Mascul</option>
                </select>
              </div>

              <div className="order__form--vet-input">
                <label htmlFor="age" className="order__form--label">
                  Varsta (ani)<span>*</span>
                  {state.errors.age && (
                    <span className="error-message">{state.errors.age}</span>
                  )}
                </label>
                <input
                  id="age"
                  type="text"
                  className="order__form--input"
                  autoComplete="true"
                  onChange={handleChange}
                />
              </div>

              <div className="order__form--vet-input">
                <label htmlFor="weight" className="order__form--label">
                  Greutate (kg)<span>*</span>
                  {state.errors.weight && (
                    <span className="error-message">{state.errors.weight}</span>
                  )}
                </label>
                <input
                  id="weight"
                  type="text"
                  className="order__form--input"
                  autoComplete="true"
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          <label htmlFor="orderDescription" className="order__form--heading">
            Descrie comanda<span>*</span>
            {state.errors.orderDescription && (
              <span className="error-message">
                {state.errors.orderDescription}
              </span>
            )}
          </label>
          <textarea
            id="orderDescription"
            type="text"
            rows={10}
            className="order__form--input"
            onChange={handleChange}
          />

          {needsPrescription && (
            <div className="order__form--prescription">
              <label htmlFor="fileUpload" className="order__form--label">
                Încarcă rețeta (img/pdf)<span>*</span>
                {state.errors.fileUpload && (
                  <span className="error-message">
                    {state.errors.fileUpload}
                  </span>
                )}
              </label>
              <input
                className="order__form--input order__form--file"
                type="file"
                id="fileUpload"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
              />

              <label htmlFor="medic" className="order__form--label">
                Medic- nume și prenume<span>*</span>
                {state.errors.medic && (
                  <span className="error-message">{state.errors.medic}</span>
                )}
              </label>

              <input
                id="medic"
                type="text"
                className="order__form--input"
                autoComplete="true"
                onChange={handleChange}
              />
            </div>
          )}

          <button type="submit" className="order__form--btn">
            Trimite Comanda
          </button>
          {submissionMessage && (
            <div className="submission-message">{submissionMessage}</div>
          )}
        </form>
      )}
    </section>
  );
}

export default OrderForm;
