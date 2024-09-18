function osvjeziModalnuTablicu2() {
    const kreditPodaci = JSON.parse(localStorage.getItem("kreditPodaci2"));
    console.log("Kredit podaci " + kreditPodaci);
    // ako su podaci o kreditu dostupni, popuni tablicu
    if (kreditPodaci) {
        const tablicaOtplateKredita = document.getElementById("gotovinskiKredit-tablica");
        const tbody = tablicaOtplateKredita.querySelector("tbody");
        tbody.innerHTML = "";
        //formatiranje outputa
        function formatNumber(number) {
            return number.toLocaleString('hr-HR', { minimumFractionDigits: 2, maximumFractionDigits: 3 });
        }
        // Izračunaj plan otplate
        const planOtplate = izracunajPlanOtplateKredita(kreditPodaci);
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
                <td data-label='Period'>${rata.mjesec}</td>
                <td data-label='Datum dospijeća'>${formattedDate}</td>
                <td data-label='Otplatni obrok'>${formatNumber(rata.anuitet) + " €"}</td>
                <td data-label='Glavnica'>${formatNumber(rata.udioGlavnice) + " €"}</td>
                <td data-label='Kamata' >${formatNumber(rata.udioKamate) + " €"}</td>
                <td data-label='Stanje kredita' >${formatNumber(rata.stanjeKredita) + " €"}</td>
            `;
            tablicaOtplateKredita.appendChild(red);
        });
        let anuitet = document.getElementById("numberInput3");
        let ukupniIznos = document.getElementById("rataGotovinski-input");
        let ukupnaKamata = document.getElementById("numberInputMonth4");

        anuitet.innerHTML = "Iznos mjesečnog anuiteta: " + planOtplate[planOtplate.length - 1].anuitet + " €";
        ukupniIznos.innerHTML = "Ukupni iznos otplate: " + planOtplate[planOtplate.length - 1].ukupniIznosOtplate + " €";
        ukupnaKamata.innerHTML = "Ukupni iznos kamate u otplati: " + planOtplate[planOtplate.length - 1].ukupniUdioKamate + " €";
    }
}
// data-label="Period" data-label="Datum dospijeća data-label="Otplatni obrok" data-label="Glavnica" data-label="Kamata" data-label="Stanje kredita"