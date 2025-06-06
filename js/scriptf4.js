console.log("hoi script.js");

//////////////////Fetch and Store APIs und aktuelles Datum//////////////////

//Aktuelles Datum
const today = new Date();
const formattedDate = `${String(today.getDate()).padStart(2, "0")}.${String(today.getMonth() + 1).padStart(2, "0")}.${today.getFullYear()}`;
const currentMonthYear = today.toISOString().slice(0, 7);

// Datum für HTML 
const dateElement = document.getElementById("current-date");
if (dateElement) {
  dateElement.textContent = today.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/* //Testdaten für Clean-Up -> wenn aktiv kann kurz austesten, ob Funktion funktioniert//
localStorage.setItem("quote_GoT_12.05.2025", JSON.stringify({ sentence: "Winter is coming." }));
localStorage.setItem("quote_advice_10.05.2025", JSON.stringify({ slip: { advice: "Be kind." } }));
localStorage.setItem("quote_southpark_15.05.2025", JSON.stringify({ quote: "Respect my authoritah!" }));
localStorage.setItem("quote_dates", JSON.stringify(["12.05.2025", "10.05.2025", "15.05.2025"]));
localStorage.setItem("quote_last_cleared_month", "2025-05");*/


// Lösche alle Quotes bei Monatswechsel -> bei jedem Aufruf wird überprüft, neuer Monat & Quotes gelösch oder nicht

const lastClearedMonth = localStorage.getItem("quote_last_cleared_month");

function deleteQuotesFromLastMonth() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("quote_")) {
      const parts = key.split("_");
      const datePart = parts[parts.length - 1]; 
      const [d, m, y] = datePart.split(".");
      if (!d || !m || !y) continue; 

      const keyMonthYear = `${y}-${m}`;

      if (keyMonthYear !== currentMonthYear) {
        localStorage.removeItem(key);
        i--;
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
  const quote_3 = quotes_3[0];

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


//////////////////Break the Cookie////////////////////////////

 async function breakCookie(id) {
  const cookieIds = ["leftcookie", "middlecookie", "rightcookie"];
  const container = document.getElementById("cookie-container");
  const cookie = document.getElementById(id);
  if (!cookie || !container) return;

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
  const paperWidth = Math.min(
    quoteText.length * 8 + 100,
    window.innerWidth * 0.6
  );
  paper.style.width = `${paperWidth}px`;

  // Schritt 4: Warte auf Rendering, um tatsächliche Breite zu bekommen
  requestAnimationFrame(() => {
    const paperActualWidth = paper.offsetWidth;

    // Linke Hälfte links vom Zettel positionieren
    leftHalf.style.left = `calc(50% - ${paperActualWidth / 2}px)`;
    leftHalf.style.transform = `translate(-100%, -50%) rotate(-20deg)`;

    // Rechte Hälfte rechts vom Zettel positionieren
    rightHalf.style.left = `calc(50% + ${paperActualWidth / 2}px)`;
    rightHalf.style.transform = `translate(0%, -50%) rotate(20deg)`;

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
}

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Script läuft – Fortune Cookie Animation Etappe 1");

  const cookieIds = ["leftcookie", "middlecookie", "rightcookie"];
  const openedCookie = localStorage.getItem("openedCookie");

  if (openedCookie) {
    // Hide other cookies
    cookieIds.forEach((cookieId) => {
      if (cookieId !== openedCookie) {
        const cookie = document.getElementById(cookieId);
        if (cookie) cookie.style.visibility = "hidden";
      }
    });
    // Call breakCookie for the opened cookie
    await breakCookie(openedCookie);
  }

  cookieIds.forEach((id) => {
    const cookie = document.getElementById(id);
    if (!cookie) return;
    cookie.addEventListener("click", async () => {
      localStorage.setItem("openedCookie", id);
      await breakCookie(id);
    });
  });

    

 //////////////////////Burgermenu///////////////////////////////////////////
function smoothScroll(target) {
  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 600;
  let start = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const ease = (t) => t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t; // easeInOutQuad
    const timeFraction = Math.min(progress / duration, 1);
    const easedProgress = ease(timeFraction);
    window.scrollTo(0, startPosition + distance * easedProgress);
    if (progress < duration) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

const burger = document.getElementById("burger");
const navLinks = document.getElementById("nav-links");

if (burger && navLinks) {
  // Burger Menü toggeln
  burger.addEventListener("click", () => {
    burger.classList.toggle("active");  // Icon zum X
    navLinks.classList.toggle("show");  // Menü öffnen/schließen
  });

  // Nur die zwei Links "Calender" und "Cookie Time" abgreifen
  const specialLinks = navLinks.querySelectorAll('a[href="#Calender"], a[href="#fortunecookies"]');

  specialLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();  // Standard-Sprung verhindern

      // Menü schließen
      burger.classList.remove("active");
      navLinks.classList.remove("show");

      // Sanft scrollen zur Sektion mit eigener Animation
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        smoothScroll(targetElement);
      }
    });
  });
}
});