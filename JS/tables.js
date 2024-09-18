function handleFormSubmission(event) {
    event.preventDefault();
    // dohvati podatke iz kreditne forme
    const glavnica = parseFloat(document.getElementById("numberInput1").value);
    const godisnjaKamatnaStopa = parseFloat(document.getElementById("rataStambeni-input").value);
    const rokOtplate = parseInt(document.getElementById("numberInputMonth2").value);
  
    // pohrani kreditne podake u local storage
    localStorage.setItem("kreditPodaci", JSON.stringify({ glavnica, godisnjaKamatnaStopa, rokOtplate }));
    osvjeziModalnuTablicu();
  }


function osvjeziModalnuTablicu() {
    const kreditPodaci = JSON.parse(localStorage.getItem("kreditPodaci"));
    
    // ako su podaci o kreditu dostupni, popuni tablicu
    if (kreditPodaci) {
        const tablicaOtplateKredita = document.getElementById("stambeniKredit-tablica");
        const tbody = tablicaOtplateKredita.querySelector("tbody");
        tbody.innerHTML = "";
        
        function formatNumber(number) {
            return number.toLocaleString('hr-HR', { minimumFractionDigits: 2 });
        }
        // Izračunaj plan otplate
        const planOtplate = izracunajPlanOtplateKredita();
        console.log(planOtplate);
        
        // Popuni tablicu podacima iz plana otplate
        planOtplate.forEach((rata, index) => {
            const red = document.createElement("tr");
            const date = new Date();
            date.setMonth(date.getMonth() + index);
            const formattedDate = date.toLocaleDateString('hr-HR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            red.innerHTML = `
                <td">${rata.mjesec}</td>
                <td>${formattedDate}</td>
                <td">${formatNumber(rata.anuitet) + " €"}</td>
                <td>${formatNumber(rata.udioGlavnice) + " €"}</td>
                <td>${formatNumber(rata.udioKamate) + " €"}</td>
                <td>${formatNumber(rata.stanjeKredita) + " €"}</td>
            `;
            tablicaOtplateKredita.appendChild(red);
        });
    }
}
// data-label="Period" data-label="Datum dospijeća data-label="Otplatni obrok" data-label="Glavnica" data-label="Kamata" data-label="Stanje kredita"