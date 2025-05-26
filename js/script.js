console.log("hoi script.js");

/////////////////////Animaton bzw. Event CTA-Buttons/////////////////////////

//////////////////Fetch and Store APIs und aktuelles Datum//////////////////

// Was wir brauchen aus den Daten:
//Link zu Quotes South Park, Game of Thrones und Advice Slip API
// Aktuelles Datum

//Aktuelles Datum (Aktueller Tag)
const today = new Date();
const formattedDate = today.toLocaleDateString("de-DE"); // deutscher Stil
console.log(formattedDate);

// Speichere das Datum des letzten Speicherns im Local Storage
localStorage.setItem("quotes_saved_date", formattedDate);

///Hilfsfunktion
async function loadQuote(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(error);
    return false;
  }
  ///Hauptfunktion Fetch and Store APIs
}
async function loadandStoreQuotes() {
  const quote_1 = await loadQuote(
    "https://api.gameofthronesquotes.xyz/v1/random"
  ); //GameofThrones
  const quote_2 = await loadQuote("https://api.adviceslip.com/advice"); //AdviceSlip
  const quotes_3 = await loadQuote(
    "https://southparkquotes.onrender.com/v1/quotes/3"
  ); //SouthPark
  const quote_3 = await quotes_3[0];

  if (quote_1) {
    localStorage.setItem("quote_GoT", JSON.stringify(quote_1));
    console.log("Game of Thrones gespeichert:", quote_1);
  }

  if (quote_2) {
    localStorage.setItem("quote_advice", JSON.stringify(quote_2));
    console.log("Advice gespeichert:", quote_2);
  }

  if (quote_3) {
    const quote_3 = quotes_3[0];
    localStorage.setItem("quote_southpark", JSON.stringify(quote_3));
    console.log("South Park gespeichert:", quote_3);
  }
}

//Hole aktuelles Datum aus Local Storage
const savedDate = localStorage.getItem("quotes_saved_date");

// Prüfen, ob Quotes schon für heute gespeichert wurden
if (savedDate !== formattedDate) {
  loadandStoreQuotes();
} else {
  // Quotes wurden heute bereits gespeichert – lade sie aus localStorage
  const quote1 = localStorage.getItem("quote_got");
  const quote2 = localStorage.getItem("quote_advice");
  const quote3 = localStorage.getItem("quote_southpark");

  console.log("Quote GoT:", quote1);
  console.log("Quote Advice:", quote2);
  console.log("Quote South Park:", quote3);
}

///////////////////////////////Cookie Breaks ////////////////////////////////
