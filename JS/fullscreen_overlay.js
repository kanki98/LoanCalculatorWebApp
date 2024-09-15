function modalOperations(modalId, btnId, spanId ) {
    // Get the modal
  var modal = document.getElementById(modalId);

  // Get the button that opens the modal
  var btn = document.getElementById(btnId);

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName(spanId)[0];

  // When the user clicks the button, open the modal 
  btn.onclick = function() {
    modal.style.display = "block";
    console.log("Stisnuo si na mene da se pokažem");
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
    console.log("Stisnuo si na mene da nestanem");
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}
