// Express-Bibliothek importieren
var express = require('express');

// Pseudo-DB-Bibliothek importieren
var { DataStore } = require('notarealdb')

// Server erstellen
var app = express()

// Pseudo-DB erstellen
var store = new DataStore('./data')

// Collection für Tiere
var animals = store.collection('animals')

// Parsen des Body in POST aktivieren
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// URL für Startseite festlegen
app.get('/', (req, res) => {
    res.send('<form method="DELETE" action="/animals/1"><input type="text" name="type"><input type="submit" value="Senden"></form>')
})

app.get('/animals', (req, res) => {
    res.json(animals)

})

app.post('/animals', (req, res) => {
    var data = req.body
    // Neues Tier in die DB hinzufügen
    animals.create(data)
    // Alles aus der DB-Collection ausgeben
    res.json(animals.list())
})

app.delete('/animals/:animalId', (req, res) => {
    var animalId = parseInt(req.params.animalId)
    console.log("delete " + animalId)
    
    // Einen Eintrag aus DB löschen
    animals.delete(animalId)
    res.json(animals.list())
})

module.exports = app;
