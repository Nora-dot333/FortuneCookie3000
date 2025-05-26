console.log("hoi script.js");
// Was wir brauchen aus den Daten:
//Link zu Quotes South Park, Game of Thrones und Advice Slip API

//Fetch APIs
/*const url = "https://southparkquotes.onrender.com/v1/quotes/3";
try {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data); // gibt die Daten der API in der Konsole aus
} catch (error) {
  console.error(error);
}*/

//Fetch API Southpark
async function loadQuote(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(error);
    return false;
  }
}

const quote_1 = loadQuote("https://api.gameofthronesquotes.xyz/v1/random"); //GameofThrones
const quote_2 = loadQuote("https://api.adviceslip.com/advice"); //AdviceSlip
const quotes_3 = loadQuote("https://southparkquotes.onrender.com/v1/quotes/3"); //SouthPark
const quote_3 = quotes_3[0];
