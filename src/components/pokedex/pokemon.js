import React from "react"
import Stat from './stat';
import Type from './type';
import '../style/pokemon.css';

function Pokemon(props) {
    const { id, name, desc, weight, height, img, types, stats } = props;
    const statList = stats.map((s,i) => <Stat {...s} key={i} index={i}/>).reverse();
    return (
        <div className="pokemon">
            <div className="pokemonName">{name.charAt(0).toUpperCase()+name.slice(1)}</div>
            <div className="pokemonInfo">
                <div className="pokemonDisplay">
                    <img src={img} alt={`${name}`}></img>
                    <div className="col2">
                        <div>
                            {(types[1]) ?  <Type {...types[1]}/> : '' }
                            <Type {...types[0]} />
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