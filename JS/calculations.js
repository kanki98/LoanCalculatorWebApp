function izracunajPlanOtplateKredita() {
    const kreditPodaci = JSON.parse(localStorage.getItem("kreditPodaci"));
    //dohvaćamo podatke iz local storage 
    const glavnica = kreditPodaci.glavnica;
    const godisnjaKamatnaStopa = kreditPodaci.godisnjaKamatnaStopa;
    const rokOtplate = kreditPodaci.rokOtplate;

    // Pretvaramo godišnju kamatnu stopu u mjesečnu
    const mjesecnaKamatnaStopa = godisnjaKamatnaStopa / 12;
    const dekurzivniKamatniFaktor = 1 + (mjesecnaKamatnaStopa/100);
  
    // Izračunavamo anuitet (konstantnu mjesečnu otplatu)
    const anuitet = glavnica * (dekurzivniKamatniFaktor * Math.pow(dekurzivniKamatniFaktor, rokOtplate)) / (Math.pow(dekurzivniKamatniFaktor, rokOtplate) - 1);
  
    // Kreiramo niz koji će čuvati detalje svake rate
    const planOtplate = [];
  
    // Inicijaliziramo preostali dug, udio kamate i udio glavnice
    let stanjeKredita = glavnica;
    let udioKamate = 0;
    let udioGlavnice = 0;
  
    // Iteriramo kroz sve rate
    for (let mjesec = 1; mjesec <= rokOtplate; mjesec++) {
      // Izračunavamo kamatu za trenutni mjesec
      udioKamate = stanjeKredita * dekurzivniKamatniFaktor;
  
      // Izračunavamo otplatu glavnice za trenutni mjesec
      udioGlavnice = anuitet - udioKamate;
  
      // Ažuriramo preostali dug
      stanjeKredita -= udioGlavnice;
  
      // Spremamo podatke o rati u niz
      planOtplate.push({
        mjesec,
        anuitet: anuitet.toFixed(2),
        udioGlavnice: udioGlavnice.toFixed(2),
        udioKamate: udioKamate.toFixed(2),
        stanjeKredita: stanjeKredita.toFixed(2)
      });
    }
  
    return planOtplate;
  }