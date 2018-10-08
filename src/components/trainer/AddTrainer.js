import React from "react"

import '../style/addTrainer.css';

function AddTrainer(props){
    const { newTrainer } = props;
    return (
        <div className="addTrainerForm">
            <div className="row">
                <h2>Name :</h2>
                <input value={newTrainer.name} onChange={e=>props.updateForm('name', e.target.value)}/>
            </div>
            <div className="row">
                <h2>Bio :</h2>
                <textarea value={newTrainer.bio} onChange={e=>props.updateForm('bio', e.target.value)}></textarea>
            </div>
            <div>
                <h2>ImageURL :</h2>
                <input value={newTrainer.img} onChange={e=>props.updateForm('img', e.target.value)}/>
            </div>
            <h2>Badges</h2>
            {/* selector? */}
            <div>
                <button onClick={props.clear}>Clear</button>
                <button onClick={props.addTrainer}>Submit</button>
            </div>
        </div>
    )
}

export default AddTrainer;