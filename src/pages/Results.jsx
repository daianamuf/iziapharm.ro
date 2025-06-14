const results = [
  {
    id: 1,
    before: "/assets/images/results/before1.jpeg",
    after: "/assets/images/results/after1.jpeg",
    description: `
      Rezultate vizibile în alopecia areată – tratament personalizat preparat în laboratorul Iziapharm

      🧴 Cremă magistrală preparată în farmacie, cu ingrediente active selectate special pentru stimularea regenerării firului de păr și calmarea inflamației locale.

      📷 În imaginile de mai jos puteți observa evoluția unui caz de alopecie areată tratat local:
      ✔️ Pata de alopecie s-a redus semnificativ  
      ✔️ Firul de păr a început să crească uniform în zona afectată  
      ✔️ Pielea este sănătoasă, fără semne de inflamație sau iritație

      💡 Fiecare formulă este adaptată pacientului, în funcție de vârstă, stadiul afecțiunii și toleranța pielii.  
      📍 Preparate cu grijă în laboratorul nostru – fără conservanți inutili, fără substanțe agresive.
    `,
  },
  {
    id: 2,
    before: "/assets/images/results/before2.jpeg",
    after: "/assets/images/results/after2.jpeg",
    description: `Tratarea unui hemangiom superficial – formulă personalizată preparată în laboratorul Iziapharm

🧴 Cremă magistrală formulată special pentru a reduce inflamația locală, a calma pielea sensibilă și a contribui la retragerea progresivă a leziunii vasculare.

📷 În imaginile de mai jos puteți observa evoluția unei leziuni de tip hemangiom tratate local:
✔️ Leziunea a devenit vizibil mai plată și mai puțin inflamată
✔️ Culoarea s-a estompat semnificativ, semn al reducerii vascularizării excesive
✔️ Zona afectată prezintă o piele mai calmă și uniformă`,
  },
  {
    id: 3,
    before: "/assets/images/results/before3.jpeg",
    after: "/assets/images/results/after3.jpeg",
    description: `Reducere semnificativă a unui hemangiom infantil localizat pe obraz – tratament topic personalizat

🧴 Cremă preparată în laboratorul farmaceutic Iziapharm, formulată special pentru pielea delicată a bebelușilor, cu rol antiinflamator, vasoconstrictor și de protecție cutanată.

📷 Evoluția prezentată în imagini demonstrează eficiența tratamentului aplicat local:
✔️ Leziunea cutanată s-a redus vizibil ca dimensiune
✔️ Culoarea intens roșie s-a estompat semnificativ
✔️ Zona din jurul hemangiomului este acum mai calmă și mai uniformă`,
  },
  {
    id: 4,
    before: "/assets/images/results/before4.jpeg",
    after: "/assets/images/results/after4.jpeg",
    description: `Evoluție vizibilă după aplicarea unui tratament topic personalizat – formulă creată în laboratorul Iziapharm

🧴 Cremă preparată pe bază de substanțe active cu efect calmant, vasoconstrictor și regenerant, adaptată pentru pielea sensibilă a bebelușilor.

📷 În imaginile de mai jos se observă o ameliorare clară:
✔️ Volumul formațiunii s-a redus considerabil, iar suprafața este vizibil mai plată
✔️ Culoarea intensă s-a estompat, semn că iritația și vascularizația locală au scăzut
✔️ Zona este mai uniformă și mai puțin inflamată`,
  },
];

export default function Rezultate() {
  return (
    <div className="results-page">
      <h1 className="results-heading">Rezultate Clienți</h1>
      <div className="results-grid">
        {results.map((res) => (
          <div
            className="result-card"
            key={res.id}
          >
            <div className="result-images">
              <div>
                <p className="label">Înainte</p>
                <img
                  src={res.before}
                  alt="Înainte"
                  className="result-img"
                />
              </div>
              <div>
                <p className="label">După</p>
                <img
                  src={res.after}
                  alt="După"
                  className="result-img"
                />
              </div>
            </div>
            <div className="result-description">
              {res.description.split("\n").map((line, index) => (
                <p
                  key={index}
                  className="result-decription__line"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
