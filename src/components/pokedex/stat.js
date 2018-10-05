import React from "react"


function Stat(props){
    // console.log('props', props);
    return (
        <div> 
            {props.stat.name} - {props.base_stat}
        </div>
    )
}

export default Stat;