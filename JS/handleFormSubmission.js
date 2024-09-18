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


  function handleFormSubmission2(event) {
    event.preventDefault();
    // dohvati podatke iz kreditne forme
    const glavnica = parseFloat(document.getElementById("numberInput3").value);
    const godisnjaKamatnaStopa = parseFloat(document.getElementById("rataGotovinski-input").value);
    const rokOtplate = parseInt(document.getElementById("numberInputMonth4").value);
    console.log("dohvaceni anuitet iz HANDLE SUBMISSIONA jest : ",document.getElementById("anuitetGotovinski"));
    // pohrani kreditne podake u local storage
    localStorage.setItem("kreditPodaci2", JSON.stringify({ glavnica, godisnjaKamatnaStopa, rokOtplate }));
    osvjeziModalnuTablicu2();
  }