require('dotenv').config()

import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from "body-parser";
import fs from 'fs';

const app = express()
const port = process.env.PORT || 4200

// Gebruik template engine handlebars voor DYNAMISCHE content
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Hierdoor kan ik CSS en JS bestanden aan de client side uitlezen
app.use(express.static('public'));

// Gebruik body-parser om te lezen wat er in POST requests van de form staat
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route. Luistert naar alle GET requests op /
app.get('/', (req, res) => {

    fs.readFile('aBoyOffspringFromJayCalled.json', 'utf8', function (err,) {
        if (err) throw err;

        res.render('home')
    })
})

let resultaten;

app.post('/', (req, res) => {
    console.log(req.body)

    resultaten = JSON.stringify(req.body)

    fs.writeFile('aBoyOffspringFromJayCalled.json', resultaten, 'utf8', () => {
    });

    res.render('home', {
        resultaten: resultaten
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

