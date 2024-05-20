const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');

// Sample database of teams
let teams = [];
app.use(express.json());
app.use(cors());

// Get all teams
app.get('/teams', (req, res) => {
  res.send(teams);
});

// Get a specific team by index
app.get('/teams/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index < 0 || index >= teams.length) {
    return res.status(404).json({ message: 'Team not found' });
  }
  res.json(teams[index]);
});

// Create a new team
app.post('/teams', (req, res) => {
  const { name, sport, players } = req.body;
  const newTeam = { name, sport, players };
  teams.push(newTeam);
  res.status(201).json(newTeam);
});

// Update an existing team by index
app.put('/teams/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index < 0 || index >= teams.length) {
    return res.status(404).json({ message: 'Team not found' });
  }
  const { name, sport, players } = req.body;
  teams[index] = { name, sport, players };
  res.json(teams[index]);
});

// Delete an existing team by index
app.delete('/teams/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index < 0 || index >= teams.length) {
    return res.status(404).json({ message: 'Team not found' });
  }
  teams.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
