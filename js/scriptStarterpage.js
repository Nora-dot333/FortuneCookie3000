console.log("hoi script.js");
// Prüfen ob Nutzer bereits auf Website war und nicht bereits auf index.html ist
if (
  localStorage.getItem("visited") &&
  !window.location.href.includes("index.html")
) {
  window.location.href = "index.html";
}

// Funktion zum Speichern der Besucher-Info
function startExperience() {
  localStorage.setItem("visited", "true");
  window.location.href = "index.html";
}

// Event Listener setzen
document
  .getElementById("getStartedButton")
  .addEventListener("click", startExperience);
console.log("Event Listener für Get-Started-Button wurde gesetzt");
