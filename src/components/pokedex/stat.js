import React from "react"

import '../style/stat.css';

function Stat(props){
    const { base_stat } = props;
    let statName  = props.stat.name;
    const statPercent = {width:`${Math.floor((base_stat / statMax(props.index)) * 100)}%`};
    
    statName = statString(statName);

    return (
        <div className="stat"> 
            <h3>{statName}</h3>
            <div className="stat_total">
                <div className="stat_base" style={statPercent}></div>
            </div>
        </div>
    )
}

export default Stat;

function statString(statName) {
    if (statName.includes('-')) {
        statName = statName.replace("special-", "Sp. ");
        statName = statName.slice(0,4) + statName[4].toUpperCase() + statName.slice(5);
    }
    else {
        statName = statName.charAt(0).toUpperCase()+statName.slice(1);
    }

    return statName;
}

function statMax(id) {
    switch(id) {
        case 5:
            return 255; // HP
        case 4:
            return 190; // Attack
        case 3:
            return 230; // Defense
        case 2:
            return 194; // Sp. Attack
        case 1:
            return 230; // Sp. Def
        case 0:
            return 180; // Speed
        default:
            return 255;  // just in case
    }
}