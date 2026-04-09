const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;
const LAT = 52.37; // Amsterdam latitude
const LON = 4.9; // Amsterdam longitude

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

app.get('/', async (req, res) => {
  const end = new Date();
  const start = new Date();
  start.setMonth(start.getMonth() - 4);

  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${LAT}&longitude=${LON}&start_date=${formatDate(start)}&end_date=${formatDate(end)}&daily=temperature_2m_max&timezone=auto`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const labels = data.daily.time;
    const temps = data.daily.temperature_2m_max;

    res.send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Weather Last 4 Months</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <h1>Daily Max Temperature - Last 4 Months</h1>
  <canvas id="chart" width="800" height="400"></canvas>
  <script>
    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ${JSON.stringify(labels)},
        datasets: [{
          label: 'Temperature (°C)',
          data: ${JSON.stringify(temps)},
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false
        }]
      },
      options: {
        scales: {
          x: { display: true },
          y: { display: true }
        }
      }
    });
  </script>
</body>
</html>`);
  } catch (err) {
    res.status(500).send('Error fetching weather data');
  }
});

app.listen(PORT, () => {
  console.log(`Weather app running on http://localhost:${PORT}`);
});
