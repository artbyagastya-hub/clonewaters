function enterSite() {
  var el = document.getElementById("ageGate");
  if (el) el.classList.add("hidden");
  localStorage.setItem("cw_age", "1");
}

function leaveSite() {
  window.location.href = "https://www.google.com";
}

if (localStorage.getItem("cw_age") === "1") {
  var ageEl = document.getElementById("ageGate");
  if (ageEl) ageEl.classList.add("hidden");
}

document.getElementById("ageYes").addEventListener("click", enterSite);
document.getElementById("ageNo").addEventListener("click", leaveSite);
