function izracunajPlanOtplateKredita(kreditPodaci) {
    //const kreditPodaci = JSON.parse(localStorage.getItem("kreditPodaci"));
    console.log("Kredit podaci koji su usli u izracunaj plan otplate funkciju : " + kreditPodaci);
    //dohvaćamo podatke iz local storage 
    const glavnica = kreditPodaci.glavnica;
    const godisnjaKamatnaStopa = kreditPodaci.godisnjaKamatnaStopa;
    const rokOtplate = kreditPodaci.rokOtplate;

    console.log("glavnica iz UI je " + glavnica);
    console.log("rok otplate iz UI je " + rokOtplate);
    console.log("godisnja kamatna stopa iz UI je " + godisnjaKamatnaStopa);
    // Pretvaramo godišnju kamatnu stopu u mjesečnu
    const mjesecnaKamatnaStopaNonFixed = godisnjaKamatnaStopa / 12;
    mjesecnaKamatnaStopa = mjesecnaKamatnaStopaNonFixed.toFixed(3);
    console.log("mjesecna kamata je " + mjesecnaKamatnaStopa);
    const dekurzivniKamatniFaktor = 1 + (mjesecnaKamatnaStopa/100);
    console.log(dekurzivniKamatniFaktor);

    // Izračunavamo anuitet (konstantnu mjesečnu otplatu)
    const anuitetCalculation = glavnica *  (Math.pow(dekurzivniKamatniFaktor, rokOtplate) * (dekurzivniKamatniFaktor - 1)) / (Math.pow(dekurzivniKamatniFaktor, rokOtplate) - 1);
  
    // Kreiramo niz koji će čuvati detalje svake rate
    const planOtplate = [];
  
    // Inicijaliziramo preostali dug, udio kamate i udio glavnice
    let stanjeKredita = glavnica;
    let udioKamate = 0;
    let udioGlavnice = 0;
    let anuitetStart  = 0;
    let ukupniUdioKamate = 0;
    let ukupniIznosOtplate = glavnica;
    // Iteriramo kroz sve rate
    for (let mjesec = 0; mjesec <= rokOtplate; mjesec++) {
        console.log("Iteracija rata, trenutni korak : " + mjesec);

        // ako je razdoblje placanja nulto tj tek je ugovoren kredit, sve osim glavnice je 0
        if(mjesec === 0) {
          udioKamate = 0;
          udioGlavnice = 0;
          stanjeKredita = glavnica;
          anuitet = anuitetStart;

        console.log("Anuitet = " + anuitet); 
        console.log("udio kamate = " + udioKamate); 
        console.log("udio glavnice = " + udioGlavnice);
        console.log("stanje kredita " + stanjeKredita);
        console.log("Kraj podatak o :" + mjesec + ". mjesecu");

        }else {
            
        anuitet = anuitetCalculation;
          // Izračunavamo kamatu za trenutni mjesec
        udioKamate = (stanjeKredita * mjesecnaKamatnaStopa) / 100;
        ukupniUdioKamate += udioKamate;
        // Izračunavamo otplatu glavnice za trenutni mjesec
        udioGlavnice = anuitet - udioKamate;
    
        // Ažuriramo preostali dug i pazimo o predznaku jer u zadnjim danima otplate zna biti negativan
        stanjeKredita = Math.abs(stanjeKredita - udioGlavnice);

        console.log("Anuitet = " + anuitet); 
        console.log("udio kamate = " + udioKamate); 
        console.log("udio glavnice = " + udioGlavnice);
        console.log("stanje kredita " + stanjeKredita);
        console.log("Kraj podatak o :" + mjesec + ". mjesecu");
        }
        // Spremamo podatke o rati u niz
        planOtplate.push({
          mjesec,
          anuitet: anuitet.toFixed(2),
          udioGlavnice: udioGlavnice.toFixed(2),
          udioKamate: udioKamate.toFixed(2),
          stanjeKredita: stanjeKredita.toFixed(2),
          //ukupniUdioKamate: ukupniUdioKamate.toFixed(2),
        });
      }
      // izracunaj ukupni iznos otplate
      ukupniIznosOtplate = glavnica + ukupniUdioKamate;
      if(document.getElementById("anuitetStambeni")) {
        document.getElementById("anuitetStambeni").innerHTML= "Iznos mjesečnog anuiteta : " + anuitet.toFixed(2) + " €";
        document.getElementById("ukupniIznosStambeni").innerHTML = "Ukupni iznos otplate: " + ukupniIznosOtplate.toFixed(2) + " €";
        document.getElementById("ukupniIznosKamateStambeni").innerHTML = "Ukupni iznos kamate u otplati: " + ukupniUdioKamate.toFixed(2) + " €";
      } else {
        document.getElementById("anuitetGotovinski").innerHTML= "Iznos mjesečnog anuiteta : " + anuitet.toFixed(2) + " €";
        document.getElementById("ukupniIznosGotovinski").innerHTML = "Ukupni iznos otplate: " + ukupniIznosOtplate.toFixed(2) + " €";
        document.getElementById("ukupnaKamataGotovinski").innerHTML = "Ukupni iznos kamate u otplati: " + ukupniUdioKamate.toFixed(2) + " €";
      }
    return planOtplate;
  }