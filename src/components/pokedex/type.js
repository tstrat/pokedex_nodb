import React, { Component } from "react"

class Type extends Component {
    constructor() {
        
        super()
        this.state= {
            
        };
    }

    componentDidMount() {
        // make string query call for img.
    }

    render() {
        const type = (this.props.type ) ? this.props.type.name : 'Glitch';
        return (
            <div className="pokemon_type">
                <div>{type}</div>
            </div>
    )}
}

export default Type;