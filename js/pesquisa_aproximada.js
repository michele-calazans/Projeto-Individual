function myFunction() {
    // Declare variables
    var input, filter, div, h1, i, txtValue, sp, box;
    input = document.getElementById('pesquisa');
    filter = input.value.toUpperCase();
    div = document.getElementById("container");
    h1 = div.getElementsByTagName('h1');
    box = document.getElementsByClassName("card");
  
    // Loop through all h1st items, and hide those who don't match the search query
    for (i = 0; i < h1.length; i++) {
      sp = h1[i].getElementsByTagName("span")[0];
      txtValue = sp.textContent || sp.innerText;

      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        box[i].style.display = "";
      }else {
        box[i].style.display = "none";
      }
    }
}