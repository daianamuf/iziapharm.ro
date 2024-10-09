import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const stepsOrder = [
  {
    id: 1,
    text: "În cazul în care doriți să obțineți un tratament particular recomandat de un medic, pe baza unei rețete medicale, mergeți la pagina de comandă.",
  },
  {
    id: 2,
    text: "Cum Iziapharm se ocupă atât de soluții personalizate de sănătate pentru oameni, cât și pentru animalele de companie, trebuie să alegeți tipul de formular pe care doriți să il completați. Pentru a achiziționa tratamente pentru uz uman și veterinar, va trebui să trimiteți comenzi separate. Acest lucru ne va ajuta pe noi în pregătirea cât mai eficientă a tratamentelor.",
  },
  {
    id: 3,
    text: "Deoarce considerăm că parteneriatul medic-farmacist duce la un tratament de succes, comenzile necesită încărcarea unui fișier care să conțină o prescripție medicală, alături de introducerea altor date necesare pentru individualizarea solicitărilor.",
  },
  {
    id: 4,
    text: "Odată plasată, comanda va fi analizata cu atenție, iar apoi veți primi confirmarea acesteia.",
  },
  {
    id: 5,
    text: "După confirmarea comenzii, farmacia va lua legătura cu dumneavoastră pentru a vă furniza toate detaliile necesare privind modalitățile de plată și pentru a vă informa despre momentul în care comanda va fi pregătită pentru ridicare. Scopul nostru este de a asigura o comunicare eficientă și transparentă, pentru a vă oferi cele mai bune servicii posibile.",
  },
];

const stepsProducts = [
  {
    id: 1,
    text: "Pentru a achiziționa produsele noastre, mergeți la pagina destinată produselor. Acolo veți găsi atât produse uzuale, pe care le puteți comanda oricând doriți, cât si tratamente mai complexe, care necesită eliberarea unei prescripții medicale.",
  },
  {
    id: 2,
    text: "Din gama de produse, puteți selecta și adăuga în coș articolele. Ulterior, puteți edita lista dumneavoastră direct în coș, apoi puteți plasa comanda.",
  },
  {
    id: 3,
    text: "Butonul de comandă vă va trimite astfel la un formular de comanda, care vă poate solicita și încarcarea unei rețete medicale, în funcție de produsele selectate, însă acest lucru nu este întotdeauna necesar.",
  },
  {
    id: 4,
    text: "Odată plasată, comanda va fi analizata cu atenție, iar apoi veți primi confirmarea acesteia.",
  },
  {
    id: 5,
    text: "După confirmarea comenzii, farmacia va lua legătura cu dumneavoastră pentru a vă furniza toate detaliile necesare privind modalitățile de plată și pentru a vă informa despre momentul în care comanda va fi pregătită pentru ridicare. Scopul nostru este de a asigura o comunicare eficientă și transparentă, pentru a vă oferi cele mai bune servicii posibile.",
  },
];

function OrderSteps() {
  const [directOrder, setDirectOrder] = useState(true);
  const [productsOrder, setProductsOrder] = useState(false);

  return (
    <>
      <Helmet>
        <title>
          Comandă Tratamente Personalizate și Achiziționează Produse – Farmacia
          Iziapharm
        </title>
        <meta
          name="description"
          content="Farmacia Iziapharm oferă un proces simplu de comandă pentru tratamente personalizate și produse deja create. Colaborează cu farmacistul, încarcă rețeta medicală și obține soluții pentru tine și animalul tău de companie."
        />
        <meta
          name="keywords"
          content="Farmacia Iziapharm, tratamente personalizate, opțiuni variate tratamente, farmacie București, farmacie România, medicamente, preparate farmaceutice, rețete personalizate, medicamente pentru animale, tratamente veterinare, farmacie pentru oameni și animale, farmacie cu preparate speciale, farmacie în București și România, tratament animale, tratament, farmacie cu laborator"
        />
      </Helmet>
      <section className="ordersteps">
        <h1 className="ordersteps__heading">Cum comand?</h1>
        <p className="ordersteps__description">
          Fie că doriți să achiziționați{" "}
          <Link className="ordersteps__link" to={"/produse"}>
            produsele noastre
          </Link>{" "}
          care au fost deja create în scopul de a rezolva diferitele probleme
          care apar în viața de zi cu zi, sau aveți nevoie de{" "}
          <Link className="ordersteps__link" to={"/comanda"}>
            tratamente adaptate
          </Link>{" "}
          nevoilor individuale, procesul de realizare al unei comenzi este ușor,
          menit să faciliteze comunicarea client-farmacist, pentru o cooperare
          cât mai eficientă.
        </p>

        <div className="ordersteps__info">
          <div className="ordersteps__info--btns">
            <button
              className={`ordersteps__btn ${directOrder ? "selected" : ""}`}
              onClick={() => {
                setDirectOrder(true);
                setProductsOrder(false);
              }}
            >
              Comandă directă
            </button>
            <p> sau </p>
            <button
              className={`ordersteps__btn ${productsOrder ? "selected" : ""}`}
              onClick={() => {
                setProductsOrder(true);
                setDirectOrder(false);
              }}
            >
              Achiziționarea produselor
            </button>
          </div>

          {directOrder &&
            stepsOrder.map((step) => (
              <div key={step.id} className="ordersteps__step">
                <p className="ordersteps__step--number">{step.id}</p>
                <p className="ordersteps__step--text">{step.text}</p>
              </div>
            ))}

          {productsOrder &&
            stepsProducts.map((step) => (
              <div key={step.id} className="ordersteps__step">
                <p className="ordersteps__step--number">{step.id}</p>
                <p className="ordersteps__step--text">{step.text}</p>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}

export default OrderSteps;
