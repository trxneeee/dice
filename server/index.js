// server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const CSV_PATH = './colors.csv';

// Load colors from CSV
app.get('/colors', (req, res) => {
  fs.readFile(CSV_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read file' });
    const colors = data.split('\n').map(c => c.trim()).filter(Boolean);
    res.json({ colors });
  });
});

// Save colors to CSV (overwrite)
app.post('/colors', (req, res) => {
  const { colors } = req.body;
  if (!Array.isArray(colors)) return res.status(400).json({ error: 'Invalid data' });

  const content = colors.map(color => `${color}\n`).join('');
  fs.writeFile(CSV_PATH, content, 'utf8', (err) => {
    if (err) return res.status(500).json({ error: 'Failed to write file' });
    res.json({ success: true });
  });
});

// Clear all colors from CSV
app.delete('/colors', (req, res) => {
  fs.writeFile(CSV_PATH, '', 'utf8', (err) => {
    if (err) return res.status(500).json({ error: 'Failed to clear file' });
    res.json({ success: true });
  });
});


app.listen(PORT, () => console.log(`CSV server running on http://localhost:${PORT}`));
