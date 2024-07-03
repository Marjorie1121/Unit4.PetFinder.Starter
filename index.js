const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 1000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// GET - / - returns homepage
app.get('/', (req, res) => {
    console.log('Serving index.html');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    res.json(pets);
});

// get pet by owner with query string
app.get('/api/v1/pets/owner', (req, res) => {
    const owner = req.query.owner; 
    const pet = pets.find(pet => pet.owner === owner);
    if (pet) {
        res.json(pet);
    } else {
        res.status(404).send('Pet not found');
    }
});

// get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    const name = req.params.name; 
    const pet = pets.find(pet => pet.name === name);
    if (pet) {
        res.json(pet);
    } else {
        res.status(404).send('Pet not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
