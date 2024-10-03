function izracunajPlanOtplateKredita(kreditPodaci) {
    //dohvaćamo podatke iz local storage 
    const glavnica = kreditPodaci.glavnica;
    const godisnjaKamatnaStopa = kreditPodaci.godisnjaKamatnaStopa;
    const rokOtplate = kreditPodaci.rokOtplate;

    // zaokružujemo kamatnu stopu na 3 decimale
    const godisnjaKamatnaStopaFixed = godisnjaKamatnaStopa.toFixed(3);
     // računamo godišnji dekurzivni kamatni faktor
    const dekurzivniKamatniFaktor = 1 + (godisnjaKamatnaStopaFixed/100);

    // računamo mjesečni kamatni faktor
    const dekurzivniKamatniFaktorMj = Math.pow(dekurzivniKamatniFaktor, 1/12);

    // računamo mjesečnu kamatnu stopu preko mjesečnog kamatnog faktora
    const mjesecnaKamatnaStopa = (dekurzivniKamatniFaktorMj - 1) * 100;
    
    // Izračunavamo anuitet (konstantnu mjesečnu otplatu)
    const anuitetCalculation = 
        glavnica *  (Math.pow(dekurzivniKamatniFaktorMj, rokOtplate) * (dekurzivniKamatniFaktorMj - 1))  / (Math.pow(dekurzivniKamatniFaktorMj, rokOtplate) - 1);
  
    // Kreiramo niz koji će čuvati detalje svake rate
    const planOtplate = [];
  
    // Inicijaliziramo preostali dug, udio kamate, udio glavnice
    let stanjeKredita = glavnica;
    let udioKamate = 0;
    let udioGlavnice = 0;
    let anuitetStart  = 0;
    let ukupniUdioKamate = 0;
    let ukupniIznosOtplate = glavnica;
    // Iteriramo kroz sve rate
    for (let mjesec = 0; mjesec <= rokOtplate; mjesec++) {
        // ako je razdoblje placanja nulto tj tek je ugovoren kredit, sve osim glavnice je 0
        if(mjesec === 0) {
            udioKamate = 0;
            udioGlavnice = 0;
            stanjeKredita = glavnica;
            anuitet = anuitetStart;
        }else {
            anuitet = anuitetCalculation;
            // Izračunavamo kamatu za trenutni mjesec
            udioKamate = (stanjeKredita * mjesecnaKamatnaStopa) / 100;
            ukupniUdioKamate += udioKamate;
            // Izračunavamo otplatu glavnice za trenutni mjesec
            udioGlavnice = anuitet - udioKamate;
        
            // Ažuriramo preostali dug i pazimo o predznaku jer u zadnjim danima otplate zna biti negativan
            stanjeKredita = Math.abs(stanjeKredita - udioGlavnice);
        }
        // Spremamo podatke o rati u niz
        planOtplate.push({
          mjesec,
          anuitet: anuitet.toFixed(2),
          udioGlavnice: udioGlavnice.toFixed(2),
          udioKamate: udioKamate.toFixed(2),
          stanjeKredita: stanjeKredita.toFixed(2),
        });
      }
      // izracunaj ukupni iznos otplate
      ukupniIznosOtplate = glavnica + ukupniUdioKamate;

      // popunjavanje i formatiranje osnovnih podataka o kreditu, detaljniji ispis je u drugoj tablici
      function formatNumber(number) {
        return number.toLocaleString("hr-HR", {style:"currency", currency:"EUR"});
      }
      if(document.getElementById("anuitetStambeni")) {
            document.getElementById("anuitetStambeni").innerHTML = formatNumber(Number(anuitet.toFixed(2)));
            document.getElementById("ukupniIznosStambeni").innerHTML = formatNumber(Number(ukupniIznosOtplate.toFixed(2)));
            document.getElementById("ukupniIznosKamateStambeni").innerHTML = formatNumber(Number(ukupniUdioKamate.toFixed(2)));
            document.getElementById("kamatnaStopaStambeni").innerHTML = document.getElementById("rataStambeni-input").value + " %";
            document.getElementById("tipKamatneStopeStambeni").innerHTML = "fiksna";
      } else {
            document.getElementById("anuitetGotovinski").innerHTML = formatNumber(Number(anuitet.toFixed(2)));
            document.getElementById("ukupniIznosGotovinski").innerHTML = formatNumber(Number(ukupniIznosOtplate.toFixed(2)));
            document.getElementById("ukupnaKamataGotovinski").innerHTML = formatNumber(Number(ukupniUdioKamate.toFixed(2)));
            document.getElementById("kamatnaStopaGotovinski").innerHTML = document.getElementById("rataGotovinski-input").value + " %";
            document.getElementById("tipKamatneStopeGotovinski").innerHTML = "fiksna";
      }
    return planOtplate;
  }