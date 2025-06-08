console.log("hoi script.js");

//////////////////Aktuelles Datum & Fetch and Store APIs //////////////////

const today = new Date();
const formattedDate = `${String(today.getDate()).padStart(2, "0")}.${String(
  today.getMonth() + 1
).padStart(2, "0")}.${today.getFullYear()}`;
const currentMonthYear = today.toISOString().slice(0, 7);

const dateElement = document.getElementById("current-date");
if (dateElement) {
  dateElement.textContent = today.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// Funktion: Lösche alle Quotes bei Monatswechsel -> bei jedem Aufruf wird überprüft, neuer Monat & Quotes gelösch oder nicht

/* //Testdaten für Clean-Up -> wenn aktiv kann kurz austesten, ob Funktion funktioniert//
localStorage.setItem("quote_GoT_12.05.2025", JSON.stringify({ sentence: "Winter is coming." }));
localStorage.setItem("quote_advice_10.05.2025", JSON.stringify({ slip: { advice: "Be kind." } }));
localStorage.setItem("quote_southpark_15.05.2025", JSON.stringify({ quote: "Respect my authoritah!" }));
localStorage.setItem("quote_dates", JSON.stringify(["12.05.2025", "10.05.2025", "15.05.2025"]));
localStorage.setItem("quote_last_cleared_month", "2025-05");*/

const lastClearedMonth = localStorage.getItem("quote_last_cleared_month");

function clearOldQuotesFromLocalStorage() {
  const validPrefix = "quote_";
  const validDates = [];

  Object.keys(localStorage).forEach((key) => {
    if (
      !key.startsWith(validPrefix) ||
      key === "quote_last_cleared_month" ||
      key === "quote_dates"
    )
      return;

    const datePart = key.split("_").pop();
    const [d, m, y] = datePart.split(".");
    if (!d || !m || !y) return;

    const itemMonthYear = `${y}-${m}`;
    if (itemMonthYear === currentMonthYear) {
      validDates.push(datePart);
    } else {
      localStorage.removeItem(key);
    }
  });

  localStorage.setItem("quote_dates", JSON.stringify(validDates));
  localStorage.setItem("quote_last_cleared_month", currentMonthYear);
}

if (lastClearedMonth !== currentMonthYear) {
  clearOldQuotesFromLocalStorage();
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

    if (!quote1.sentence) return false;
    if (!quote2.slip?.advice) return false;
    if (!quote3.quote) return false;

    return true;
  } catch (e) {
    return false;
  }
}

//Laden und Speichern API's

async function loadQuote(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function loadAndStoreQuotes() {
  const quote_1 = await loadQuote(
    "https://api.gameofthronesquotes.xyz/v1/random"
  );
  const quote_2 = await loadQuote("https://api.adviceslip.com/advice");
  const quotes_3 = await loadQuote(
    "https://southparkquotes.onrender.com/v1/quotes/3"
  );
  const quote_3 = quotes_3 ? quotes_3[0] : null;

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
    localStorage.setItem(
      `quote_southpark_${formattedDate}`,
      JSON.stringify(quote_3)
    );
    console.log("South Park gespeichert:", quote_3);
  }

  let storedDates = JSON.parse(localStorage.getItem("quote_dates")) || [];

  if (!storedDates.includes(formattedDate)) {
    storedDates.push(formattedDate);
    localStorage.setItem("quote_dates", JSON.stringify(storedDates));
  }
}

// Prüfen, ob Quotes für heute vorhanden
if (!quotesAreValidForToday()) {
  localStorage.setItem("openedCookie", "");
  loadAndStoreQuotes();
} else {
  const quote1 = localStorage.getItem(`quote_GoT_${formattedDate}`);
  const quote2 = localStorage.getItem(`quote_advice_${formattedDate}`);
  const quote3 = localStorage.getItem(`quote_southpark_${formattedDate}`);

  console.log("Quote GoT:", quote1);
  console.log("Quote Advice:", quote2);
  console.log("Quote South Park:", quote3);
}

//////////////////Cookie Zerbrechen und Quote anzeigen////////////////////////////

async function breakCookie(id) {
  const cookieIds = ["leftcookie", "middlecookie", "rightcookie"];
  const container = document.getElementById("cookie-container");
  const cookie = document.getElementById(id);
  if (!cookie || !container) return;

  // Alle anderen Cookies ausblenden
  cookieIds.forEach((otherId) => {
    if (otherId !== id) {
      const otherCookie = document.getElementById(otherId);
      if (otherCookie) {
        otherCookie.style.visibility = "hidden";
     }
    }
  });

  // Klone das Cookie-Bild als neues Element zur Animation
  const animatedCookie = cookie.cloneNode(true);
  animatedCookie.style.position = "absolute";
  animatedCookie.style.top = "50%";
  animatedCookie.style.left = "50%";
  animatedCookie.style.transform = "translate(-50%, -50%)";
  animatedCookie.style.zIndex = "10";
  animatedCookie.style.width = "30%"; 
  container.appendChild(animatedCookie);

 const isMobile = window.innerWidth <= 768;

 if (!isMobile){
  // Animation je nach Cookie-ID zuweisen
  if (id === "leftcookie") {
    animatedCookie.style.animation = "leftToCenter 0.7s ease forwards";
  } else if (id === "rightcookie") {
    animatedCookie.style.animation = "rightToCenter 0.7s ease forwards";
  } else if (id === "middlecookie") {
    animatedCookie.style.animation = "middlePop 0.6s ease forwards";
  }
} else{
    //mobile Animationen
  if (id === "leftcookie") {
    animatedCookie.style.animation = "leftToCenterMobile 0.7s ease forwards";
  } else if (id === "rightcookie") {
    animatedCookie.style.animation = "rightToCenterMobile 0.7s ease forwards";
  } else if (id === "middlecookie") {
    animatedCookie.style.animation = "middlePopMobile 0.6s ease forwards";
  }
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
    const quote = JSON.parse(localStorage.getItem(`quote_GoT_${formattedDate}`));
    quoteText = quote?.sentence || quote?.character?.name || "Zitat kann nicht angezeigt werden.";
  } else if (id === "middlecookie") {
    const quote = JSON.parse(localStorage.getItem(`quote_advice_${formattedDate}`));
    quoteText = quote?.slip?.advice || "Zitat kann nicht angezeigt werden.";
  } else if (id === "rightcookie") {
    const quote = JSON.parse(localStorage.getItem(`quote_southpark_${formattedDate}`));
    quoteText = quote?.quote || "Zitat kann nicht angezeigt werden.";
  }

  // Schritt 2: Erstelle den Zettel (fortune-paper)
  const paper = document.createElement("div");
  paper.className = "fortune-paper";
  paper.textContent = "";
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
    leftHalf.style.transform = "translate(-100%, -50%) rotate(-20deg)";

    // Rechte Hälfte rechts vom Zettel positionieren
    rightHalf.style.left = `calc(50% + ${paperActualWidth / 2}px)`;
    rightHalf.style.transform = "translate(0%, -50%) rotate(20deg)";

    // Start Animation
    leftHalf.classList.add("animate-left");
    rightHalf.classList.add("animate-right");

    // Schritt 5: Quote erscheint 1.5s nach Zettel-Erscheinen
    setTimeout(() => {
      const quoteTextElem = document.createElement("div");
      quoteTextElem.className = "fortune-text";
      quoteTextElem.textContent = quoteText;
      paper.appendChild(quoteTextElem);
    }, 1500);
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
  let startTime = null;

  function ease(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function animationStep(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = ease(progress);
    window.scrollTo(0, startPosition + distance * easedProgress);

    if (elapsed < duration) {
      requestAnimationFrame(animationStep);
    }
  }
  requestAnimationFrame(animationStep);
}

const burger = document.getElementById("burger");
const navLinks = document.getElementById("nav-links");

if (burger && navLinks) {
  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    navLinks.classList.toggle("show");
  });

  const specialLinks = navLinks.querySelectorAll(
    'a[href="#Calender"], a[href="#fortunecookies"]'
  );

  specialLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      burger.classList.remove("active");
      navLinks.classList.remove("show");

      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        smoothScroll(targetElement);
      }
    });
  });
}
});
