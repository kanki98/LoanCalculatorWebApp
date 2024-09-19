function showRate(rateInputId, rateOutputId) {
    var rateInput = document.getElementById(rateInputId);
    var rateOutput = document.getElementById(rateOutputId);
   
    var rateValue = rateInput.value + " %";
    
    rateOutput.innerHTML = "Vaš odabir : " + rateValue;

    rateInput.oninput = function() {
            rateValue = this.value + " %";
            rateOutput.innerHTML = "Vaš odabir : " + rateValue;
           
    }   
}