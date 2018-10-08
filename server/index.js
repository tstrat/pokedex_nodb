const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller/controller');

const app = express();
app.use(bodyParser.json());

const baseURL = '/api/v1';

// All the trainers
app.get(baseURL + '/trainers', controller.getTrainerList);
app.post(baseURL + '/trainers', controller.addTrainer);

// Single Trainer
app.get(baseURL + '/trainers/:id', controller.getTrainer);
app.put(baseURL + '/trainers/:id', controller.updateTrainer);
app.patch(baseURL + '/trainers/:id', controller.updateTrainer);
app.delete(baseURL + '/trainers/:id', controller.removeTrainer);

// Single trainer's pokemon list
app.post(baseURL + '/trainers/:id/pokemon', controller.addToTrainerPokemonList);
app.delete(baseURL + '/trainers/:id/pokemon/', controller.removeFromTrainerPokemonList);

const PORT = 4000;
app.listen(PORT, () =>{
    console.log(`Listening on port: ${PORT}`);
});