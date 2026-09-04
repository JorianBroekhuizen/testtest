# World Date App + Zonnestelsel Vernietiger

This is a simple Node.js web application that displays the current date and time for a few sample countries. It also ships a small browser game: **Zonnestelsel Vernietiger** (Solar System Destroyer).

## Requirements

- [Node.js](https://nodejs.org/) installed on your system

## Running the App

```bash
node server.js
```

Then open `http://localhost:3000` in your browser to see the dates and times.

## Zonnestelsel Vernietiger (game)

Open `http://localhost:3000/zonnestelsel` (of open `public/zonnestelsel.html` rechtstreeks in een browser, het bestand heeft geen afhankelijkheden).

- **Alles trekt aan alles**: het stelsel is een echte N-body-simulatie. Zon, planeten en meteoren trekken elkaar aan; de banen ontstaan uit de zwaartekracht in plaats van vaste cirkels. Planeten verstoren elkaar, kunnen botsen (de lichtste versplintert, de zwaarste neemt de impuls over), in de zon vallen of weggeslingerd worden. De camera volgt de zon.
- **Per hemellichaam instellen**: kies een planeet of de zon via de keuzelijst of door erop te klikken. *Zwaartekracht* versterkt alleen de aantrekking op alle andere lichamen. *Gewicht* is de massa: het lichaam trekt harder, wordt groter en sterker en is lastiger te verplaatsen door inslagen en botsingen. De baan zelf verandert niet door gewicht (equivalentieprincipe). Zet de zwaartekracht van de zon op 0 en zie het stelsel uit elkaar vliegen.
- **Draaien en kantelen (3D)**: sleep horizontaal om te draaien en verticaal om de camera te kantelen, van bovenaanzicht tot bijna zijaanzicht. Schuif "Kanteling" en knoppen Bovenaanzicht / 3D doen hetzelfde. Scroll om te zoomen. De tijdsnelheid (0 tot 3×) regelt de hele simulatie.
- **Meteoor**: kies de meteoor-modus (toets `2`, of houd `Shift` ingedrukt / gebruik de rechtermuisknop) en sleep als een katapult om een meteoor af te schieten. Een stippellijn toont het voorspelde pad onder de zwaartekracht van zon en planeten. Langzame schoten vallen in de zon of raken gevangen, snelle slingeren eromheen.
- **Willekeurige meteoor** (`M`): schiet vanaf de rand een meteoor op een planeet af.
- **Gruis**: bij een inslag spat gruis van de planeet dat onder de zwaartekracht van die planeet in een baan blijft hangen. De baansnelheid volgt uit de massa (v = √(GM/r)) en gruis dat buiten de invloedssfeer van de planeet raakt (2× de Hill-straal) wordt door de zon meegetrokken. Standaard houden alleen de gasreuzen gruis vast, net als in het echt; schroef de zwaartekracht van de Aarde op en ook zij houdt een ring vast.
- Planeten hebben een levensbalk. Grotere en snellere meteoren doen meer schade, en elke inslag geeft de planeet een duwtje. Bij 0 ontploft de wereld en blijft er een puinring achter die in de oude baan blijft draaien.
- `Spatie` pauzeert, `R` reset alles, pijltjestoetsen draaien en kantelen.
