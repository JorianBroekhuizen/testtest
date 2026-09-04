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

Open `http://localhost:3000/zonnestelsel` (or open `public/zonnestelsel.html` directly in a browser, it has no dependencies).

- **Draaien en kantelen (3D)**: sleep horizontaal om het zonnestelsel te draaien en verticaal om de camera te kantelen, van bovenaanzicht tot bijna zijaanzicht. De schuif "Kanteling" en de knoppen Bovenaanzicht / 3D doen hetzelfde. Scroll om te zoomen. De planeten draaien vanzelf in hun baan; de snelheid stel je in met de schuif.
- **Meteoor**: kies de meteoor-modus (toets `2`, of houd `Shift` ingedrukt / gebruik de rechtermuisknop) en sleep als een katapult om een meteoor af te schieten. Een stippellijn toont het voorspelde pad rond de zon.
- **Willekeurige meteoor** (`M`): schiet vanaf de rand een meteoor op een planeet af.
- **Zwaartekracht**: meteoren buigen af door de zon en de planeten. Langzame schoten vallen in de zon of raken in een baan gevangen, snelle schoten slingeren eromheen. De stippellijn bij het richten toont het voorspelde pad.
- **Gruis**: bij een inslag spat gruis van de planeet dat onder de zwaartekracht van die planeet in een baan blijft hangen. De baansnelheid volgt uit de planeetmassa (v = √(GM/r)) en gruis dat buiten de Hill-straal van de planeet raakt wordt door de zon meegetrokken. Zware planeten als Jupiter houden dus veel gruis vast, Mercurius bijna niets.
- Planeten hebben een levensbalk. Grotere en snellere meteoren doen meer schade. Bij 0 ontploft de wereld en blijft er een puinring in de baan achter.
- `Spatie` pauzeert, `R` reset alles.
