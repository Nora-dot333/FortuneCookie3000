console.log("hoi script.js");

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM geladen, initialisiere Event Listener");

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
  const btn = document.getElementById("getStartedButton");
  if (btn) {
    btn.addEventListener("click", startExperience);
    console.log("Event Listener für Get-Started-Button wurde gesetzt");
  } else {
    console.warn("Button nicht gefunden.");
  }
});
