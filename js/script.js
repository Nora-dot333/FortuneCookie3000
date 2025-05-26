console.log("hoi script.js");
// Was wir brauchen aus den Daten:
//Link zu Quotes South Park, Game of Thrones und Advice Slip API

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

//Fetch APIs
const url = "https://southparkquotes.onrender.com/v1/quotes/3";
try {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data); // gibt die Daten der API in der Konsole aus
} catch (error) {
  console.error(error);
}

//Fetch API Southpark
/*const apiUrlsp = "https://southparkquotes.onrender.com/v1/quotes/3";
//Einzelnes Zitat abrufen und speichern
fetch(apiUrlsp)
  .then((response) => response.json())
  .then((data) => {
    console.log("API Response:", data);
    if (Array.isArray(data) && data.length > 0) {
      const selectedQuote = data[0]; //Erstes Zitat wählen
      localStorage.setItem("quote", JSON.stringify(selectedQuote));
      console.log("Gespeichertes Zitat:", selectedQuote);
    } else {
      console.error("Keine gültigen Zitate erhalten.");
    }
  })
  .catch((error) => console.error("Fehler beim Abrufen der API:", error));*/

// eine funktion machen loadquote
// mehrere javascripts machen
