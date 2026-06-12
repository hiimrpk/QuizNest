function toggleMenu() {
  
  document.getElementById("sideMenu").style.left = "0";
  
  document.getElementById("overlay").style.display = "block";
  
}

function closeMenu() {
  
  document.getElementById("sideMenu").style.left = "-280px";
  
  document.getElementById("overlay").style.display = "none";
  
}