import React, { Component } from "react"
import axios from 'axios';
import './pokedex.css';
import Pokemon from "./pokemon";

import missingNo from '../../missingNo';

class Pokedex extends Component {
constructor() {
        super()
        this.pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';
        this.speciesUrl = 'https://pokeapi.co/api/v2/pokemon-species/';

        // The state of the pokemon being displayed
        this.state = missingNo;
        this.setMissingNo = this.setMissingNo.bind(this);
    }

    setMissingNo() {
        this.setState(missingNo);
    }

    nextPokemon() {
        ((this.state.id + 1) < 802) ?
        this.fetchPokemon(this.state.id+1) :
        this.setMissingNo();
    }

    prevPokemon() {
        ((this.state.id - 1) > 0) ?
        this.fetchPokemon(this.state.id-1) :
        this.setMissingNo();
    }

    fetchPokemon(path) {
        const species = this.speciesUrl + path + '/';
        const pokemon = this.pokemonUrl + path + '/';
        axios.get(species)
        .then(species_res => {
            const { flavor_text_entries, genera, name, id } = species_res.data;
            const genus = genera.filter(g => g.language.name === 'en' )[0].genus;
            const flavorText = flavor_text_entries.filter(ft => ft.language.name === 'en')[0].flavor_text;
            // get other stat info
            axios.get(pokemon)
            .then(poke_res => {
                const { height, sprites, stats, types, weight} = poke_res.data;
                this.setState( {
                    id,
                    name,
                    desc: { genus, flavorText},
                    weight,
                    height,
                    img: sprites.front_default,
                    types,
                    stats,
                    input: ''
                })
            })         
        }).catch(e => {
            console.log(e);
            this.setMissingNo();
        });
    }

    updateInput = (e) => { this.setState({ input: e.target.value })};

    componentDidMount() {
        this.fetchPokemon(1);
    }

    render() {
        console.log(this.input);
        const { id, name, desc, weight, height, img, types, stats } = this.state;
        return (
            <div className="pokedex">
                <div className="pokedexControlls">
                    <button onClick={() => this.prevPokemon()}>Previous</button>
                        <input 
                            onChange={ this.updateInput } 
                            value={this.state.input} 
                            placeholder="Search by pokemon name or number"
                            onKeyPress={e => {if(e.key === 'Enter') this.fetchPokemon(e.target.value.toLowerCase())}} 
                        />
                    <button onClick={()=> this.nextPokemon()}>Next</button>
                </div>
                {/* Display entry if ID >0 and < 803 */}
                <Pokemon id={id}
                    name={name}
                    desc={desc}
                    weight={weight}
                    height={height}
                    img={img}
                    types={types}
                    stats={stats} />

            </div>
    )}
}

export default Pokedex;