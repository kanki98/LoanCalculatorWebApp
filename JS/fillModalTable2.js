function osvjeziModalnuTablicu2() {
    const kreditPodaci = JSON.parse(localStorage.getItem("kreditPodaci2"));
    console.log("Kredit podaci " + kreditPodaci);
    // ako su podaci o kreditu dostupni, popuni tablicu
    if (kreditPodaci) {
        const tablicaOtplateKredita = document.getElementById("gotovinskiKredit-tablica");
        const tbody = tablicaOtplateKredita.querySelector("tbody");
        tbody.innerHTML = "";
        console.log("Tablica je : ", tbody);
        //formatiranje outputa
        
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
                <td data-label='Otplatni obrok'>${(rata.anuitet) + " €"}</td>
                <td data-label='Glavnica'>${(rata.udioGlavnice) + " €"}</td>
                <td data-label='Kamata' >${(rata.udioKamate) + " €"}</td>
                <td data-label='Stanje kredita' >${(rata.stanjeKredita) + " €"}</td>
            `;
            tbody.appendChild(red);
        });    
    }
}