function showRate(rateInputId, rateOutputId, rateDisplayId) {
    var rateInput = document.getElementById(rateInputId);
    var rateOutput = document.getElementById(rateOutputId);
    var rateDisplay = document.getElementById(rateDisplayId);

    var rateValue = rateInput.value + " %";

    rateOutput.innerHTML = "Vaš odabir : " + rateValue;
    rateDisplay.innerHTML = "Kamatna stopa: " + rateValue;

    rateInput.oninput = function() {
        rateValue = this.value + " %";
        rateOutput.innerHTML = "Vaš odabir : " + rateValue;
        rateDisplay.innerHTML = "Kamatna stopa: " + rateValue;

    }   
}