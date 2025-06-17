const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();

const API_KEY = '0e30b7dbdcmsh56c7caa489ef330p1a0eebjsn63f006b772e6';
const API_HOST = 'bhagavad-gita3.p.rapidapi.com';

app.use(express.static(path.join(__dirname, 'public')));

// Proxy route for chapters
app.get('/api/chapters', async (req, res) => {
  try {
    const response = await fetch(`https://${API_HOST}/v2/chapters/?limit=18`, {
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chapters' });
  }
});

// Proxy route for verses of a chapter
app.get('/api/chapters/:chNum/verses', async (req, res) => {
  try {
    const response = await fetch(`https://${API_HOST}/v2/chapters/${req.params.chNum}/verses/`, {
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch verses' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
