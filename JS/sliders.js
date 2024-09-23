function formatNumber(number) {
    
    return number.toLocaleString("hr-HR", {style:"currency", currency:"EUR"});
}

function initializeMoneySlider(sliderId, outputId, minId, maxId, numberInputId) {
    var slider = document.getElementById(sliderId);
    var output = document.getElementById(outputId);
    var minValue = document.getElementById(minId);
    var maxValue = document.getElementById(maxId);
    var numberInput = document.getElementById(numberInputId);

    minValue.innerHTML = "Min : " + formatNumber(Number(slider.min));
    maxValue.innerHTML = "Max : " + formatNumber(Number(slider.max));
    output.innerHTML = "Vaš odabir : " + (formatNumber(Number(slider.value)));
    numberInput.value = slider.value;

    slider.oninput = function() {
        output.innerHTML = "Vaš odabir : " + formatNumber(Number(this.value));
        numberInput.value = this.value;
    }
    numberInput.oninput = function() {
        slider.value = this.value;
        output.innerHTML = "Vaš odabir : " + formatNumber(Number(this.value));
    }
}

function initializeMonthSlider(sliderId, outputId, minId, maxId, numberInputId) {
    var slider = document.getElementById(sliderId);
    var output = document.getElementById(outputId);
    var minValue = document.getElementById(minId);
    var maxValue = document.getElementById(maxId);
    var numberInput = document.getElementById(numberInputId);

    minValue.innerHTML = "Min : " + slider.min + " mj.";
    maxValue.innerHTML = "Max : " + slider.max + " mj.";
    output.innerHTML = "Vaš odabir : " + slider.value + " mj.";

    slider.oninput = function() {
        output.innerHTML = "Vaš odabir : " + this.value + " mj.";
        numberInput.value = this.value;
    }
    numberInput.oninput = function() {
        slider.value = this.value;
        output.innerHTML = "Vaš odabir : " + this.value + " mj.";
    }
}

