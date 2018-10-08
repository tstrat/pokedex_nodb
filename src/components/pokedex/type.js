import React, { Component } from "react"

function Type (props){
    const style = props.type  && props.style(props.type);
    const type = (props.type ) ? props.type.name : 'Glitch';
    return (
        <div className="pokemon_type" style={style}>
            <div>{type}</div>
        </div>
)
}

export default Type;