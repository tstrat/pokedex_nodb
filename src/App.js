import React, { Component } from 'react';
import './App.css';

import Pokedex from './components/pokedex/pokedex';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Pokedex />
      </div>
    );
  }
}

export default App;
