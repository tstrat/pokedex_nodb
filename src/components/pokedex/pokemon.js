import React, { Component } from "react"
import Stat from './stat';

function Pokemon(props) {
    const { id, name, desc, weight, height, img, types, stats } = props;
    const statList = stats.map((s,i) => <Stat {...s} key={i}/>);
    return (
        <div>
            <div className="pokemonName">{name.charAt(0).toUpperCase()+name.slice(1)}</div>
            <div className="pokemonInfo">
                <img src={img} alt={`image of ${name}`}></img>
                <div>{weight / 10}kg</div>
                <div>{height / 10}m</div>
            </div>
            <div className="pokemonDescription">
                <div>{desc.genus}</div>
                <p>{desc.flavorText}</p>
            </div>
            <div className="pokemonStats">
                {statList}
            </div>
        </div>
    )
}

export default Pokemon;