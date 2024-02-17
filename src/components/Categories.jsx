import {
  ArrowRight,
  FirstAid,
  Heartbeat,
  OrangeSlice,
  PawPrint,
  Stethoscope,
  Sun,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const categoryIcons = {
  adult: Heartbeat,
  dermatologie: Sun,
  cosmetice: OrangeSlice,
  medical: Stethoscope,
  ginecologie: FirstAid,
  animal: PawPrint,
};

const categories = [
  {
    id: 1,
    label: "adult",
    name: "Sănătatea adultului",
    treatments: [
      "Terapie de înlocuire a hormonilor bioidentici",
      "Tratament pentru fertilitate",
      "Medicamente pentru tiroidă",
      "Tulburare de somn",
      "Managementul durerii",
    ],
  },
  {
    id: 2,
    label: "dermatologie",
    name: "Dermatologie",
    treatments: ["Căderea părului", "Eczemă", "Psoriazis", "Urticarie"],
  },
  {
    id: 3,
    label: "cosmetice",
    name: "Cosmetice naturale",
    treatments: ["Îngrijirea pielii", "Anti-îmbătrânire", "Pete pigmentare"],
  },
  {
    id: 4,
    label: "medical",
    name: "Personal medical",
    treatments: [
      "Medici/Chirurgi",
      "Dentisți",
      "Farmaciști",
      " Medici veterinari",
    ],
  },
  {
    id: 5,
    label: "ginecologie",
    name: "Ginecologie",
    treatments: [
      "Antifungice/Antiseptice",
      "Substituție hormonală",
      "Simptome postmenopauzale",
    ],
  },
  {
    id: 6,
    label: "animal",
    name: "Sănătatea animalelor",
    treatments: [
      "Infecții oculare",
      "Infecții auriculare",
      "Anxietate",
      "Tratamente personalizate",
    ],
  },
];

function Categories() {
  return (
    <div className="treatments__section">
      <section className="categories">
        {categories.map((group) => {
          const IconComponent = categoryIcons[group.label];
          return (
            <div className="group" key={group.id}>
              {IconComponent && <IconComponent className="group__icon" />}
              <h3 className="group__heading">{group.name}</h3>
              <div className="group__content">
                {group.treatments.map((treatment, index) => (
                  <p key={index} className="group__text">
                    {treatment}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </section>
      <Link
        to="/produse"
        className="treatments__section--btn underline_animation_hover--green "
      >
        Produse <ArrowRight />
      </Link>
    </div>
  );
}

export default Categories;
