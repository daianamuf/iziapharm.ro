import { useNavigate, useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  const navigate = useNavigate();
  console.log(error);

  return (
    <div className="error">
      <h1 className="error__heading">A apărut o eroare!</h1>
      <p className="error__message">{error.data || error.message}</p>
      <button className="error__btn" onClick={() => navigate(-1)}>
        Mergi înapoi
      </button>
    </div>
  );
}

export default Error;
