import { useReducer, useState } from "react";

const initialState = {
  inputs: {
    lastName: "",
    firstName: "",
    email: "",
    cod: "",
    productName: "",
    feedback: "",
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

//// DE SCHIMBAT CHEIA PTR MAILUL IZEI//////////
function Review() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  // const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [formKey, setFormKey] = useState(Date.now());

  const validateInput = (id, value) => {
    let error = "";
    switch (id) {
      case "lastName":
      case "firstName":
      case "cod":
      case "feedback":
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
      default:
        error = "";
    }
    dispatch({ type: "setError", field: id, error });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch({ type: "setInput", field: id, value: value });
    validateInput(id, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isFormValid = true;
    let newErrors = {}; // Local object to track errors

    Object.keys(state.inputs).forEach((key) => {
      const value = state.inputs[key];
      if (!value.trim()) {
        newErrors[key] = "Acest câmp este obligatoriu.";
        isFormValid = false;
      } else {
        // Apply specific field validation here as needed
        if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors[key] = "Adresa de email nu este validă.";
          isFormValid = false;
        }
      }
    });

    // Update state with new errors if any
    if (!isFormValid) {
      Object.entries(newErrors).forEach(([field, error]) => {
        dispatch({ type: "setError", field, error });
      });
      return; // Prevent form submission if not valid
    }

    console.log("errors", state.errors);

    if (Object.values(state.errors).every((error) => error === "")) {
      console.log("Form submitted", state.inputs);
    }

    if (isFormValid) {
      console.log("Form data:", state.inputs);
      const formData = new FormData(e.target);
      Object.entries(state.inputs).forEach(([key, value]) => {
        formData.append(key, value);
      });
      console.log(formData);
      formData.append("access_key", "be6eeaf9-8feb-4de2-be37-79c3273c0ada");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());

      if (res.success) {
        console.log("Success", res);
        setSubmissionMessage("Review-ul a fost trimis cu succes!");
      } else {
        console.log("Error", res);
        setSubmissionMessage("A apărut o eroare, review-ul a putut fi trimis!");
      }

      dispatch({ type: "resetForm" });

      setFormKey(Date.now());

      setTimeout(() => {
        setSubmissionMessage("");
      }, 5000);
    }
  };

  return (
    <div className="review">
      <h1 className="review__heading">
        <span>Ai încercat un produs?</span>
        <span>Spune-ne cum ți s-a părut!</span>
      </h1>

      <p className="review__intro">
        La Iziapharm, credem cu tărie că succesul nostru se bazeaza pe
        satisfacția și încrederea pe care ni le acordați, și tocmai de aceea,
        părerea dumneavoastră este esențială pentru noi. Fie că este vorba
        despre o experiență pozitivă, o sugestie de îmbunătățire, sau chiar o
        provocare cu care v-ați confruntat în testarea produselor, fiecare voce
        este auzită.
      </p>

      <form key={formKey} className="review__form" onSubmit={handleSubmit}>
        <p className="review__form--text">
          <span>*</span>
          <span>- câmpuri obligatorii</span>
        </p>

        <label htmlFor="lastName" className="review__form--label">
          Nume<span>*</span>
          {state.errors.lastName && (
            <span className="error-message">{state.errors.lastName}</span>
          )}
        </label>
        <input
          id="lastName"
          type="text"
          className="review__form--input"
          autoComplete="true"
          onChange={handleChange}
        />

        <label htmlFor="firstName" className="review__form--label">
          Prenume<span>*</span>
          {state.errors.firstName && (
            <span className="error-message">{state.errors.firstName}</span>
          )}
        </label>
        <input
          id="firstName"
          type="text"
          className="review__form--input"
          autoComplete="true"
          onChange={handleChange}
        />

        <label htmlFor="email" className="review__form--label">
          Email<span>*</span>
          {state.errors.email && (
            <span className="error-message">{state.errors.email}</span>
          )}
        </label>
        <input
          id="email"
          type="email"
          className="review__form--input"
          autoComplete="true"
          onChange={handleChange}
        />

        <label htmlFor="cod" className="review__form--label">
          Codul produsului<span>*</span>
          {state.errors.cod && (
            <span className="error-message">{state.errors.cod}</span>
          )}
        </label>
        <input
          id="cod"
          className="review__form--input"
          autoComplete="true"
          onChange={handleChange}
        />

        <label htmlFor="productName" className="review__form--label">
          Numele produsului
        </label>
        <input
          id="productName"
          type="text"
          className="review__form--input"
          autoComplete="true"
          onChange={handleChange}
        />

        <label htmlFor="feedback" className="review__form--label">
          Feedback<span>*</span>
          {state.errors.feedback && (
            <span className="error-message">{state.errors.feedback}</span>
          )}
        </label>
        <textarea
          id="feedback"
          type="text"
          className="review__form--input"
          onChange={handleChange}
          rows={10}
        />

        <button type="submit" className="review__form--btn">
          Trimite Feedback
        </button>
        {submissionMessage && (
          <div className="submission-message">{submissionMessage}</div>
        )}
      </form>
    </div>
  );
}

export default Review;
