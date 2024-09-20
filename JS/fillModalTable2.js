function osvjeziModalnuTablicu2() {
    const kreditPodaci = JSON.parse(localStorage.getItem("kreditPodaci2"));
    
    // ako su podaci o kreditu dostupni, popuni tablicu
    if (kreditPodaci) {
        const tablicaOtplateKredita = document.getElementById("gotovinskiKredit-tablica");
        const tbody = tablicaOtplateKredita.querySelector("tbody");
        tbody.innerHTML = "";
        
        // Izračunaj plan otplate
        const planOtplate = izracunajPlanOtplateKredita(kreditPodaci);
        console.log(planOtplate);
        
        // Formatiranje brojeva koji će se prikazati u tablici da bi imali format npr. 10.000,00
        function formatNumber(number) {
            return number.toLocaleString("hr-HR", {style:"currency", currency:"EUR"});
          }

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
                <td data-label='Otplatni obrok'>${(formatNumber(Number(rata.anuitet)))}</td>
                <td data-label='Glavnica'>${formatNumber(Number(rata.udioGlavnice))}</td>
                <td data-label='Kamata' >${formatNumber(Number(rata.udioKamate))}</td>
                <td data-label='Stanje kredita' >${formatNumber(Number(rata.stanjeKredita))}</td>
            `;
            tbody.appendChild(red);
        });    
    }
}