import React from "react"
import defaultImage from '../../media/pokeball.jpg';
import '../style/trainer.css';

function Trainer(props) { 
    if (props.display === 'long') {
        // -----------------    Render the LONG info for the trainer in Selected Trainer Tab -------------- //

        if (!props.name) {
            return <div className="trainer">No Trainer Selected</div>
        }
        const pokelist = props.pokemon.map((poke,i) => 
            <div className="pokelist" key={i}>
                <div className="index"><div>{i+1}</div></div>
                <img src={poke.img} alt="pokemonImg"></img>
                <div>{poke.name}</div>
                <div># {poke.id}</div>
                <i className="fas fa-times-circle" onClick={e=>props.removePokemon(i)}></i>
            </div>
        )
        return (
            <div>
                <div className="trainer">
                    <div className="portrait"><img src={props.img || defaultImage} alt="trainer portrait"/></div>
                    <div className="trainerInfo">
                        <div className="trainerName">
                            <div>{props.name}</div>
                        </div>
                        <div className="details">
                            {(props.gymLeader) ? <div>Gym Leader</div> : <div>Rookie</div>}
                        </div>
                        <div className="bio">
                            {props.bio}
                        </div>
                    </div>
                    {!props.gymLeader ? <i className="edit fas fa-edit" onClick={e=>props.edit()}></i> : ''}
                    {!props.gymLeader ? <i className="delete fas fa-times-circle" onClick={e=>props.removeTrainer(props.id)}></i> : ''}
                </div>
                {pokelist}
            </div>
        )
    } else {
        // -----------------    Render the SHORT info for the trainer in TrainerList -------------- //
        
        return (
            <div className="trainer" onClick={e => props.selectTrainer(props.index)}>
                <div className="portrait"><img src={props.img || defaultImage} alt="trainer portrait"/></div>
                <div className="trainerInfo">
                    <div className="trainerName">
                        <div>{props.name}</div>
                    </div>
                    <div className="details">
                        {(props.gymLeader) ? <div>Gym Leader</div> : <div>Rookie</div>}
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Trainer;