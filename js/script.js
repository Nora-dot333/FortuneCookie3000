console.log("hoi script.js");

/////////////////////Animaton bzw. Event CTA-Buttons/////////////////////////

//////////////////Fetch and Store APIs und aktuelles Datum//////////////////

// Was wir brauchen aus den Daten:
//Link zu Quotes South Park, Game of Thrones und Advice Slip API
// Aktuelles Datum

//Aktuelles Datum (Aktueller Tag)
const today = new Date();
const day = String(today.getDate()).padStart(2, "0");
const month = String(today.getMonth() + 1).padStart(2, "0");
const year = today.getFullYear();
const formattedDate = `${day}.${month}.${year}`;
const currentMonthYear = `${year}-${month}`;

//Datum soll in HTML angezeigt werden können
const dateElement = document.getElementById("current-date");
if (dateElement) {
  dateElement.textContent = formattedDate;
}

/* //Testdaten für Clean-Up)//
localStorage.setItem("quote_GoT_12.05.2025", JSON.stringify({ sentence: "Winter is coming." }));
localStorage.setItem("quote_advice_10.05.2025", JSON.stringify({ slip: { advice: "Be kind." } }));
localStorage.setItem("quote_southpark_15.05.2025", JSON.stringify({ quote: "Respect my authoritah!" }));
localStorage.setItem("quote_dates", JSON.stringify(["12.05.2025", "10.05.2025", "15.05.2025"]));
localStorage.setItem("quote_last_cleared_month", "2025-05");*/

// Letztes Löschdatum aus localStorage (Monat-Jahr)
const lastClearedMonth = localStorage.getItem("quote_last_cleared_month");

// Funktion: Lösche alle Quotes, die nicht zum aktuellen Monat gehören
function deleteQuotesFromLastMonth() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("quote_")) {
      const parts = key.split("_");
      const datePart = parts[parts.length - 1]; // z.B. "01.05.2025"
      const [d, m, y] = datePart.split(".");
      if (!d || !m || !y) continue; // Falls kein richtiges Datum

      const keyMonthYear = `${y}-${m}`;

      if (keyMonthYear !== currentMonthYear) {
        localStorage.removeItem(key);
        i--; // Da localStorage kürzer wird
      }
    }
  }

  // gespeicherte Daten Array bereinigen
  let storedDates = JSON.parse(localStorage.getItem("quote_dates")) || [];
  storedDates = storedDates.filter((dateStr) => {
    const [d, m, y] = dateStr.split(".");
    return `${y}-${m}` === currentMonthYear;
  });
  localStorage.setItem("quote_dates", JSON.stringify(storedDates));
}

// Prüfen, ob Löschung nötig ()
if (lastClearedMonth !== currentMonthYear) {
  deleteQuotesFromLastMonth();
  localStorage.setItem("quote_last_cleared_month", currentMonthYear);
}

//Überprüfung, ob am heutigen Datum bereits Quotes abgespeichert
function quotesAreValidForToday() {
  const storedDates = JSON.parse(localStorage.getItem("quote_dates")) || [];
  if (!storedDates.includes(formattedDate)) return false;

  try {
    const quote1 = JSON.parse(
      localStorage.getItem(`quote_GoT_${formattedDate}`)
    );
    const quote2 = JSON.parse(
      localStorage.getItem(`quote_advice_${formattedDate}`)
    );
    const quote3 = JSON.parse(
      localStorage.getItem(`quote_southpark_${formattedDate}`)
    );

    if (!quote1 || !quote2 || !quote3) return false;

    // Gültigkeitschecks
    if (!quote1.sentence) return false;
    if (!quote2.slip?.advice) return false;
    if (!quote3.quote) return false;

    return true; // alle vorhanden & valide
  } catch (e) {
    return false; // Parsing-Fehler => ungültig
  }
}

///Hilfsfunktion
async function loadQuote(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(error);
    return false;
  }
}
///Hauptfunktion Fetch and Store APIs

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
    localStorage.setItem(`quote_GoT_${formattedDate}`, JSON.stringify(quote_1));
    console.log("Game of Thrones gespeichert:", quote_1);
  }

  if (quote_2) {
    localStorage.setItem(
      `quote_advice_${formattedDate}`,
      JSON.stringify(quote_2)
    );
    console.log("Advice gespeichert:", quote_2);
  }

  if (quote_3) {
    const quote_3 = quotes_3[0];
    localStorage.setItem(
      `quote_southpark_${formattedDate}`,
      JSON.stringify(quote_3)
    );
    console.log("South Park gespeichert:", quote_3);
  }

  // Datum in Array speichern (wenn noch nicht vorhanden)
  let storedDates = JSON.parse(localStorage.getItem("quote_dates")) || [];

  if (!storedDates.includes(formattedDate)) {
    storedDates.push(formattedDate);
    localStorage.setItem("quote_dates", JSON.stringify(storedDates));
  }
}

// Prüfen, ob Quotes für heute vorhanden
if (!quotesAreValidForToday()) {
  loadandStoreQuotes();
} else {
  // Quotes wurden heute gültig gespeichert = lade sie aus LocalStorage
  const quote1 = localStorage.getItem(`quote_GoT_${formattedDate}`);
  const quote2 = localStorage.getItem(`quote_advice_${formattedDate}`);
  const quote3 = localStorage.getItem(`quote_southpark_${formattedDate}`);

  console.log("Quote GoT:", quote1);
  console.log("Quote Advice:", quote2);
  console.log("Quote South Park:", quote3);
}

/*Hole aktuelles Datum aus Local Storage
const savedDate = localStorage.getItem("quotes_saved_date");

// Prüfen, ob Quotes schon für heute gespeichert wurden
if (savedDate !== formattedDate) {
  loadandStoreQuotes();
   } else {
  // Quotes wurden heute bereits gespeichert – lade sie aus localStorage
  const quote1 = localStorage.getItem("quote_GoT");
  const quote2 = localStorage.getItem("quote_advice");
  const quote3 = localStorage.getItem("quote_southpark");

  console.log("Quote GoT:", quote1);
  console.log("Quote Advice:", quote2);
  console.log("Quote South Park:", quote3);  
} */

///////////////////////////////Cookie Breaks ////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  console.log("Script läuft – Fortune Cookie Animation Etappe 1");

  const cookieIds = ["leftcookie", "middlecookie", "rightcookie"];
  const container = document.getElementById("cookie-container");

  cookieIds.forEach((id) => {
    const cookie = document.getElementById(id);

    cookie.addEventListener("click", async () => {
      console.log(`Geklickt: ${id}`);

      // Alle anderen Cookies ausblenden
      cookieIds.forEach((otherId) => {
        if (otherId !== id) {
          const otherCookie = document.getElementById(otherId);
          if (otherCookie) otherCookie.style.visibility = "hidden";
        }
      });

      // Klone das Cookie-Bild als neues Element zur Animation
      const animatedCookie = cookie.cloneNode(true);
      animatedCookie.style.position = "absolute";
      animatedCookie.style.top = "50%";
      animatedCookie.style.left = "50%";
      animatedCookie.style.transform = "translate(-50%, -50%)";
      animatedCookie.style.zIndex = "10";
      animatedCookie.style.width = "30%"; // gleiche Größe wie Original
      container.appendChild(animatedCookie);

      // Animation je nach Cookie-ID zuweisen
      if (id === "leftcookie") {
        animatedCookie.style.animation = "leftToCenter 0.7s ease forwards";
      } else if (id === "rightcookie") {
        animatedCookie.style.animation = "rightToCenter 0.7s ease forwards";
      } else if (id === "middlecookie") {
        animatedCookie.style.animation = "middlePop 0.6s ease forwards";
      }

      // Originale Cookies entfernen/verstecken
      cookie.style.visibility = "hidden";

      //Warte auf Animationsende
      await new Promise((resolve) => setTimeout(resolve, 700));

      // Entferne das animierte Cookie-Bild
      animatedCookie.remove();

      // Zeige die zerbrochenen Hälften
      /*const leftHalf = document.createElement("img");
      leftHalf.src = "img/FortuneCookieLeft.svg";
      leftHalf.alt = "Linke Hälfte";
      leftHalf.className = "cookie-half animate-left";

      const rightHalf = document.createElement("img");
      rightHalf.src = "img/FortuneCookieRight.svg";
      rightHalf.alt = "Rechte Hälfte";
      rightHalf.className = "cookie-half animate-right"; */

      const leftHalf = document.createElement("img");
      leftHalf.src = "img/FortuneCookieLeft.svg";
      leftHalf.alt = "Linke Hälfte";
      leftHalf.className = "cookie-half";

      const rightHalf = document.createElement("img");
      rightHalf.src = "img/FortuneCookieRight.svg";
      rightHalf.alt = "Rechte Hälfte";
      rightHalf.className = "cookie-half";

      container.appendChild(leftHalf);
      container.appendChild(rightHalf);

      console.log("Cookie zerbrochen!");

      // Schritt 1: Hole das zugehörige Quote aus dem LocalStorage
      let quoteText = "";
      if (id === "leftcookie") {
        const quote = JSON.parse(
          localStorage.getItem(`quote_GoT_${formattedDate}`)
        );
        quoteText = quote?.sentence || quote?.character?.name || "Zitat fehlt.";
      } else if (id === "middlecookie") {
        const quote = JSON.parse(
          localStorage.getItem(`quote_advice_${formattedDate}`)
        );
        quoteText = quote?.slip?.advice || "Zitat fehlt.";
      } else if (id === "rightcookie") {
        const quote = JSON.parse(
          localStorage.getItem(`quote_southpark_${formattedDate}`)
        );
        quoteText = quote?.quote || "Zitat fehlt.";
      }

      // Schritt 2: Erstelle den Zettel (fortune-paper)
      const paper = document.createElement("div");
      paper.className = "fortune-paper";
      paper.textContent = ""; // zuerst leer
      container.appendChild(paper);

      // Schritt 3: Setze Breite dynamisch basierend auf Textlänge
      // (nur grobe Schätzung, du kannst statisch lassen, wenn gewünscht)
      const paperWidth = Math.min(
        quoteText.length * 8 + 100,
        window.innerWidth * 0.6
      );
      paper.style.width = `${paperWidth}px`;

      // Schritt 4: Positioniere Cookie-Hälften passend weiter auseinander
      /*const cookieHalfOffset = leftHalf.offsetWidth / 2 || 100;
      const cookieHalfrightOffset = 115;
      leftHalf.style.left = `calc(50% - ${
        paperWidth / 2 + cookieHalfOffset
      }px)`;
      rightHalf.style.right = `calc(50% - ${
        paperWidth / 2 + cookieHalfrightOffset
      }px)`; */

      // Schritt 4: Warte auf Rendering, um tatsächliche Breite zu bekommen
      requestAnimationFrame(() => {
        const paperActualWidth = paper.offsetWidth;

        // Linke Hälfte links vom Zettel positionieren
        leftHalf.style.left = `calc(50% - ${paperActualWidth / 2}px)`;
        leftHalf.style.transform = `translate(-100%, -50%) rotate(-20deg)`;

        // Rechte Hälfte rechts vom Zettel positionieren
        rightHalf.style.left = `calc(50% + ${paperActualWidth / 2}px)`;
        rightHalf.style.transform = `translate(0%, -50%) rotate(20deg)`;

        /* // Schritt 4: Setze CSS-Variable --offset dynamisch für Animation
      const offset = Math.min(paperWidth / 2 + 290, 390); // max 120px
      const offsetr = Math.min(paperWidth / 2 + 50);

      leftHalf.style.setProperty("--offset", `${offset}px`);
      rightHalf.style.setProperty("--offset", `${offsetr}px`); */

        // Start Animation
        leftHalf.classList.add("animate-left");
        rightHalf.classList.add("animate-right");

        // Schritt 5: Quote erscheint 1.5s nach Zettel-Erscheinen
        setTimeout(() => {
          const quoteTextElem = document.createElement("div");
          quoteTextElem.className = "fortune-text";
          quoteTextElem.textContent = quoteText;
          paper.appendChild(quoteTextElem);
        }, 50);
      });
    });
  });
});
