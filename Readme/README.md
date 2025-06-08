# FortuneCookie3000

Website_FortuneCookies3000_IM_2.Semester

# Dokumentation

## Kurzbeschrieb

Unser Projekt ist eine FortuneCookie-Website, auf der man jeden Tag einmalig eines von drei Cookies auswählen kann. Sobald man ein Cookie angeklickt hat, wird bei erneutem Laden der Seite nur noch dieses geöffnete Cookie angezeigt.

Beim Laden der Seite überprüft die Website, ob für das aktuelle Datum bereits Zitate im Local Storage gespeichert sind. Falls nicht, lädt sie Zitate von drei verschiedenen APIs und speichert diese zusammen mit dem Datum im Local Storage ab. Jedes Cookie ist dabei den Quotes einer bestimmten API zugeordnet. Wenn ein Cookie ausgewählt wird, wird das zugehörige Zitat aus dem Local Storage geladen und angezeigt.

Außerdem haben wir die Idee, zukünftig einen Kalender zu integrieren. In diesem könnte man bis zu einem Monat zurückblicken, um zu sehen, ob an einem bestimmten Tag ein Cookie ausgewählt wurde und welcher Spruch an diesem Tag angezeigt wurde. Wir haben bereits mit der Vorbereitung des JavaScript-Codes begonnen, um diese Funktion auszuprobieren. Derzeit werden die Tages-Zitate für einen Monat im Local Storage gespeichert und anschließend wieder gelöscht. Wenn wir weiter daran arbeiten, würden wir wahrscheinlich dafür sorgen, dass die beiden nicht gewählten Zitate sofort aus dem Local Storage entfernt werden. Dadurch bleibt der Speicher übersichtlicher und es werden keine unnötigen Daten gespeichert.

Leider hat es aber für den fertigen Kalender noch nicht gereicht, aber vielleicht setzen wir das trotzdem noch um.

---

## Learnings & Schwierigkeiten

### Nora

Ich habe gelernt, wie man APIs nutzt, lokal Daten speichert, Benutzerinteraktionen verfolgt und eine Domain kauft und aufsetzt. Vor allem habe ich aber festgestellt, wie wichtig das logische Vorausdenken beim Programmieren ist. Wir hatten zu Beginn des Projekts den genauen Ablauf logisch aufgeschrieben. Aufgrund der fehlenden Erfahrung kamen uns dann während des Programmierens trotzdem viele Dinge noch in den Sinn, die man auch noch beachten könnte oder sollte. Zum Beispiel, dass man je nachdem auch festlegen muss, was das Programm tun soll, wenn etwas nicht funktioniert etc.

Technisch gesehen fand ich es am schwierigsten, die Animationen für das Zerbrechen der Cookies zu programmieren. Vor allem auch noch auf zwei verschiedene Weisen für Desktop und Mobile. Ich glaube, wir hatten teilweise einfach wirklich die technischen Voraussetzungen dazu noch nicht und bis ChatGPT verstanden hat, was wir wollten, sind einige Stunden verloren gegangen. Ein anderes Mal würde ich z.B. die fancy vertikale Swipe-Animation mit meinem momentanen Wissensstand weglassen und uns einfach generell nicht zu viel vornehmen.

### Alyah

Das Modul hat mich in diesem Semester positiv überrascht – vor allem, weil ich wirklich motiviert war, unser Projekt umzusetzen. Im Vergleich zum ersten Semester sind mir viele Dinge klarer geworden, insbesondere im Verständnis vom und praktischen Umgang mit Code, Figma UX Design und der Planung von Abläufen.
Wie Nora habe ich gelernt, wie man APIs nutzt, Daten lokal speichert, Nutzerinteraktionen verfolgt und eine eigene Domain einrichtet. Besonders deutlich wurde mir, wie wichtig es ist, beim Programmieren logisch zu denken. Wir haben unseren Ablauf zu Beginn strukturiert, sind während der Umsetzung jedoch immer wieder vor Herausforderungen gestanden an denen wir dann etwas länger sassen. Es war auch schwierig manchmal zu merken, wann wir etwas unnötig kompliziert gecodet haben oder wann nur etwas kleines wie eine Klammer fehlte, die den Code dann wieder zum laufen gebracht hat.
Beim nächsten Mal würde ich einige Funktionen vereinfachen und den Projektumfang simpler planen.
Insgesamt war die Website eine wertvolle Erfahrung, aus der ich viel mitgenommen habe. Gleichzeitig hätte ich mir gewünscht, noch mehr JavaScript im Detail zu lernen. Für die Zukunft hoffe ich, unabhängiger von Hilfsmitteln wie ChatGPT arbeiten zu können und ein besseres technisches Grundverständnis aufzubauen

## Ressourcen und Prompts

Bezüglich KIs haben wir eigentlich ausschließlich mit ChatGPT gearbeitet. Mit Copilot haben wir es zu Beginn versucht, aber er ist bei Anfragen immer wieder abgestürzt.

Hier die wichtigsten Prompts & Erkenntnisse:

Wir haben gemerkt, dass man bei solchen komplexen Vorgängen (HTML, CSS & JS) mit der Gratis-Version von ChatGPT an seine Grenzen stoßen kann.
Es hilft extrem, wenn man bei Anfragen zuerst wirklich auf den Punkt genau, Schritt für Schritt erklärt, was man will und dann Folgendes oder etwas Ähnliches hinzufügt:

> „Bevor du mit der Ausführung/Formulierung deiner Antwort beginnst, erkläre mir genau, was ich will, damit ich überprüfen kann, ob du mich verstanden hast.“

Dieser Zusatz half, schneller ans Ziel zu kommen, da wir so vermeintliche „Missverständnisse“ vorbeugten.

Des Weiteren half es auch, sich von ChatGPT zuerst nochmals die Logik des Codes erklären zu lassen, auch um zu überprüfen, ob er den Ablauf und den gewollten Ablauf verstanden hat.

Welche weiteren Prompts?
**Positivbeispiel**
**Prompt**: du bist informatiker und hilfst mir meinen css code zu analysieren und aufzuräumen. schaue ihn dir bitte an, schaue ob er sinn macht und logisch strukturiert ist. es sollen keine codes drin sei die sich wiederholen (ausser es ist wichtig). der code soll also zusammengefasst werden, so übersichtlich wie möglich sein und es soll kein unnötiger code drin sein. ich schicke dir zuerst mein css für die desktop ansicht, danach die media queries. hier mein css:
**Fazit**: Die Antwort darauf war gut, weil mir ChatGPT kurz und knapp unser CSS durchgegangen ist und uns gezeigt hat was alles angepasst,zusammengefasst oder gelöschr werden kann.

**Negativbeispiel**
**Prompt**: Du:
du bist informatiker und programmierst websites. du hilfst mir bei meiner website "fortune cookies 3000". Ich erkläre dir zuerst den Sinn bzw. das was passieren soll: Ich habe auf meiner Website in der <main> section 3 fortune cookies, einen links, einen in der mitte und einen rechts, alle 3 sind anwählbar. den hover effekt habe ich bereits in meinem css file erstellt. man kann einmal täglich, einer der drei cookies anklicken. beim klicken, rutsch der cookie in die mitte der section, zerbricht in zwei hälften, beide hälften gehen auseinander und es erscheint bzw. zieht in der mitte der zwei keckshälften einen weissen zettel hervor mit einem text-quote, welcher aus einer von 3 apis gefetcht wurde (south park api, game of thrones api und advice api). die cookie animation auf der desktop ansicht funktioniert soweit. jetzt geht es darum die animation responsive zu machen bzw. soll es in der mobilansicht etwas anders aussehen. das prinzip bleibt gleich, jedoch ist bei der mobilen ansicht jeweils nur ein cookie sichtbar, um die anderen zu sehen, kann man nach horiziontal hin und her swipen. die klick-animation und alle restlichen abläufe bleiben dann gleich, das aufbrechen des cookies muss allenfalls visuell noch responsive gemacht werden also dass der Zettel mit dem Quote und die beiden Cookie Hälften dem Screen entsprechend angepasst sind von der Grösse. In CSS habe ich nun einen Scroll Effekt erstellt, meine erste frage wäre hier jedoch, wie ich einen swipe effekt hinbekomme? brauche ich dazu javascript? bevor du mir antwortest, hast du alles verstanden? brauchst du allenfalls mein css?
**Fazit**: Auf diesen Prompt hat mir Chatgpt zuerst positiv geantwortet und mir gute Antworten geliefert. Als ich dann nachträglich mein JavaScript geschickt habe,hat Chatgpt komplett vergessen was er mit dem Code tun sollte und in mir einfach analysiert anstatt antworten zu liefern.

Ein weiteres Hilfsmittel war natürlich unser Figma-Projekt mit unserem UX Design für die Website.

## Code an den wir gedacht haben aber nicht fertig umsetzen konnten

Swipe Funktion
Wir haben es geschafft einen Swipe bzw. Scroll herzustellen. Leider konnten wir aus Zeitgründen die Anpassung der Animation nicht mehr machen. Es hat das Cookie nach dem öffnen immer aus dem Viewport geschossen und nach einigen Anläufen, dies zu beheben, mussten wir leider aufgeben und uns für eine andere Lösung entscheiden:

CSS:
Mobile Ansicht Swipe
/\* Cookie Wrapper damit nur ein Cookie sichtbar bei Swipe
.cookie-slider-wrapper {
width: 100vw;
overflow-x: auto;
scroll-snap-type: x mandatory;
position: relative;
overflow: hidden;
padding: 1rem;
}

/\* Horizontale Scroll-Fläche
.imgcookies {
width: 300%;
display: flex;
flex-direction: row;
gap: 3rem;
}

/\* Breite einzelner Cookies
.imgcookies img {
width: auto;
flex-shrink: 0;
scroll-snap-align: center;
}

/\* Scrollbar verstecken
.cookie-slider-wrapper::-webkit-scrollbar {
display: none;
}

Javascript:
///Swipe Animation Mobile ///////

const slider = document.querySelector(".cookie-slider-wrapper");
if (slider) {
let startX = 0;
let currentScroll = 0;
let isDragging = false;

    slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].pageX;
      currentScroll = slider.scrollLeft;
      isDragging = true;
    });

    slider.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      const x = e.touches[0].pageX;
      const walk = startX - x; // Swipe Distanz
      slider.scrollLeft = currentScroll + walk;
    });

    slider.addEventListener("touchend", (e) => {
      isDragging = false;
      snapToNearest();
    });

    function snapToNearest() {
      const cookie = slider.querySelector("img");
      if (!cookie) return;
      const gap = 48;
      const cookieWidth = cookie.offsetWidth + gap;

      const scrollLeft = slider.scrollLeft;
      const index = Math.round(scrollLeft / cookieWidth);

      slider.scrollTo({
        left: index * cookieWidth,
        behavior: "smooth",
      });
    }

}
const cookieSlider = document.querySelector(".cookie-slider-wrapper");
if (cookieSlider) {
cookieSlider.style.overflow = "hidden";
}
