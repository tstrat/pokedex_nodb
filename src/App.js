import React, { Component } from 'react';
import axios from 'axios';

import './App.css';


import Pokedex from './components/pokedex/pokedex';
import TrainerList from './components/trainer/trainerList';

import pokemonLogo from './media/pokemonLogo.png';


class App extends Component {
  constructor() {
    super();

    this.baseUrl = '/api/v1/trainers';
    this.state = {
      selectedTrainer: {}
    }
  }

  updatedSelectedTrainer = (trainer, callback) => {
    if (!trainer){
      this.setState({ selectedTrainer: {} })
    } else {
      axios.get(this.baseUrl + `/?id=${trainer.id}`)
      .then(res => {
        this.setState({
          selectedTrainer : res.data
        }, callback);
      })
    }
  }

  addPokemonToSelectedTrainer = (pokemon) => {
    const { selectedTrainer } = this.state;
    if ( selectedTrainer.id ) {
      axios.post(this.baseUrl + `/${selectedTrainer.id}/pokemon`, pokemon)
      .then(res => {
        if (res.status === 202) {
          alert(res.data);
        } else {
          this.setState({
            selectedTrainer : res.data
          })
        }
      });
    }
  }

  removePokemonFromSelected = (index) => {
    const { selectedTrainer } = this.state;
    axios.delete(this.baseUrl + `/${selectedTrainer.id}/pokemon/?index=${index}`)
    .then(res =>
      this.setState({
        selectedTrainer : res.data
      })
    );
  }

  editPrompt = () => {
    const selected = this.state.selectedTrainer;
    const updates = {}
    let name, bio, img;
    
    name = prompt("Name to change to:", selected.name);
    if (name) {
      updates.name = name;
    }
    
    bio = prompt("Bio to change to:", selected.bio);
    if (bio) {
      updates.bio = bio;
    }
    
    img = prompt("Image URL to change to:", selected.img);
    if (img) {
      updates.img = img;
    }
    
    axios.patch(this.baseUrl + `/${selected.id}`, updates)
    .then(res => {
      this.setState({
        selectedTrainer : res.data
      })
    })
  }

  render() {
    return (
      <div>
        <header>
          <img src={pokemonLogo} alt="logo"/>
          <h1>A Pokedex by Travis Stratton</h1>
        </header>
        <div className="App">
          <Pokedex addPokemon={this.addPokemonToSelectedTrainer}/>
          <TrainerList 
            selected={this.state.selectedTrainer} 
            update={this.updatedSelectedTrainer} 
            removePokemon={this.removePokemonFromSelected}
            edit={this.editPrompt}/>
        </div>
        <footer>
          <article>
            <p>
                Pokemon is a trademark and copyright of Nintendo(tm) and it's associated partners 
                Gamefreak and Niantic.  This site is purely information displays
                and none of it is intended to be used in any marketing sense.
            </p>
            <p>
                Please also support <a href="https://pokeapi.co">PokeAPI</a> whose work is the basis of the pokedex information.
            </p>
          </article>
        </footer>
      </div>
    );
  }
}

export default App;
