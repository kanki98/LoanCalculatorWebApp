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
      tablicaOtplateKredita.innerHTML = "";
  
      // Napravi i dodaj red koji sadrzi zaglavlje
      const zaglavlje = document.createElement("tr");
      zaglavlje.innerHTML = `
        <th>Period</th>
        <th>Datum dospijeća</th>
        <th>Otplatni obrok</th>
        <th>Glavnica</th>
        <th>Kamata</th>
        <th>Stanje kredita</th>
      `;
      tablicaOtplateKredita.appendChild(zaglavlje);
      
      function formatNumber(number) {
        return number.toLocaleString('hr-HR', { minimumFractionDigits: 2 });
      }
      // Izračunaj plan otplate
    const planOtplate = izracunajPlanOtplateKredita();
      

    // Popuni tablicu podacima iz plana otplate
    planOtplate.forEach(rata, index => {
    const red = document.createElement("tr");
    const date = new Date();
    date.setMonth(date.getMonth() + index);
    const formattedDate = date.toLocaleDateString('hr-HR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
      red.innerHTML = `
        <td>${rata.mjesec}</td>
        <td>${formattedDate}</td> // Zamijeni s točnim formatiranjem datuma
        <td>${formatNumber(rata.anuitet)}</td>
        <td>${formatNumber(rata.udioGlavnice)}</td>
        <td>${formatNumber(rata.udioKamate)}</td>
        <td>${formatNumber(rata.stanjeKredita)}</td>
      `;
      tablicaOtplateKredita.appendChild(red);
    });
  }
}