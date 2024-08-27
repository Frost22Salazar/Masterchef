// server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/recipes', (req, res) => {
  const recipes = JSON.parse(fs.readFileSync('receitasData.json', 'utf-8'));
  res.json(recipes);
});

app.post('/recipes', (req, res) => {
  const recipes = JSON.parse(fs.readFileSync('receitasData.json', 'utf-8'));
  const newRecipe = {
    id: Date.now(), // Gera um ID único com base na data/hora atual
    ...req.body
  };
  recipes.push(newRecipe);
  fs.writeFileSync('receitasData.json', JSON.stringify(recipes, null, 2));
  res.status(201).json({ message: 'Recipe added successfully!' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
