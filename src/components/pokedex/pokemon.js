import React from "react"
import Stat from './stat';
import Type from './type';
import '../style/pokemon.css';

const colorsByType = {
    bug: '#A8B820',
    dark: '#705848',
    dragon: '#7038F8',
    fairy: '#EE99AC',
    fighting: '#C03028',
    fire: '#F08030',
    flying: '#A890F0',
    ghost: '#705898',
    grass: '#78C850',
    ground: '#E0C068',
    ice: '#98D8D8',
    electric: '#F8D030',
    normal: '#A8A878',
    poison: '#A040A0',
    psychic: '#F85888',
    rock: 'B8A038',
    steel: '#B8B8D0',
    water: '#6890F0',
}

function getStyle(type) {   
    return (type) ? {'backgroundColor': colorsByType[type.name]} : {}      
}

function Pokemon(props) {
    const { id, name, desc, weight, height, img, types, stats } = props;
    const statList = stats.map((s,i) => <Stat {...s} key={i} index={i}/>).reverse();
    const style = (types[1]) ? getStyle(types[1].type) : (types[0]) ? getStyle(types[0].type) : {};
    
    return (
        <div className="pokemon">
            <div className="pokemonName" style={style}>{name.charAt(0).toUpperCase()+name.slice(1)}</div>
            <div className="pokemonInfo">
                <div className="pokemonDisplay">
                    <img src={img} alt={`${name}`}></img>
                    <div className="col2">
                        <div>
                            {(types[1]) ?  <Type {...types[1]} style={getStyle}/> : '' }
                            <Type {...types[0]} style={getStyle}/>
                            <h3># {id}</h3>
                        </div>
                        <div>{weight / 10} kg</div>
                        <div>{height / 10} m</div>
                    </div>
                </div>
                <div className="pokemonDescription">
                    <h3>{desc.genus}</h3>
                    <p>{desc.flavorText}</p>
                </div>
                <div className="pokemonStats">
                    {statList}
                </div>
            </div>
        </div>
    )
}

export default Pokemon;