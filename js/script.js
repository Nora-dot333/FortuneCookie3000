console.log("hoi script.js");
// Was wir brauchen aus den Daten:
//Link zu Quotes South Park, Game of Thrones und Advice Slip API

//Fetch API
const url = "https://api.adviceslip.com/advice";
try {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data); // gibt die Daten der API in der Konsole aus
} catch (error) {
  console.error(error);
}
