const http = require('http');
const fs = require('fs');
const path = require('path');

const countries = [
  { code: 'US', name: 'United States', timeZone: 'America/New_York' },
  { code: 'NL', name: 'Netherlands', timeZone: 'Europe/Amsterdam' },
  { code: 'IN', name: 'India', timeZone: 'Asia/Kolkata' },
  { code: 'JP', name: 'Japan', timeZone: 'Asia/Tokyo' },
];

function getDateTime(tz) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long', timeZone: tz }).format(new Date());
}

function buildHtml() {
  const rows = countries.map(c => `<tr><td>${c.name}</td><td>${getDateTime(c.timeZone)}</td></tr>`).join('\n');
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>World Dates</title>
  <style>table { border-collapse: collapse; } td, th { border: 1px solid #ccc; padding: 8px; }</style>
</head>
<body>
  <h1>Current Date & Time by Country</h1>
  <table>
    <thead><tr><th>Country</th><th>Date/Time</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <p><a href="/zonnestelsel">☄️ Speel Zonnestelsel Vernietiger</a></p>
</body>
</html>`;
}

const GAME_PATH = path.join(__dirname, 'public', 'zonnestelsel.html');

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  if (url === '/zonnestelsel' || url === '/zonnestelsel.html') {
    fs.readFile(GAME_PATH, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('Game kon niet geladen worden.');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end(data);
    });
    return;
  }
  res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
  res.end(buildHtml());
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Game: http://localhost:${PORT}/zonnestelsel`);
});
