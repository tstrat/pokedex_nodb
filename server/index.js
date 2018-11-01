const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller/controller');

const app = express();
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../build`));
const baseURL = '/api/v1';

app.get('/api/data', (req,res)=>(res.send("Travis")));
// All the trainers
app.get(baseURL + '/trainers', controller.getTrainerList);  
app.post(baseURL + '/trainers', controller.addTrainer);

// Single Trainer
app.get(baseURL + '/trainers/:id', controller.getTrainer);  // has query option as well
app.put(baseURL + '/trainers/:id', controller.updateTrainer);
app.patch(baseURL + '/trainers/:id', controller.updateTrainer);
app.delete(baseURL + '/trainers/:id', controller.removeTrainer);

// Single trainer's pokemon list
app.post(baseURL + '/trainers/:id/pokemon', controller.addToTrainerPokemonList);
app.delete(baseURL + '/trainers/:id/pokemon/', controller.removeFromTrainerPokemonList);

const PORT = 3000;
app.listen(PORT, () =>{
    console.log(`Listening on port: ${PORT}`);
});

const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})