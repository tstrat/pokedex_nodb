import React, { Component } from 'react';
import axios from 'axios';

import '../style/trainerList.css';

import Trainer from './trainer';
import AddTrainer from './AddTrainer';

class TrainerList extends Component {
    constructor() {
        super()
        this.baseUrl = '/api/v1/trainers';
        this.state= {
            trainers: [],
            filterVal: '',
            newTrainer: {
                name: '',
                bio: '',
                img: '',
                badges: []
            }
        };

        this.selectTrainer = this.selectTrainer.bind(this);
    }

    componentDidMount() {
        axios.get(this.baseUrl + '/')
        .then(res => {
            this.setState({
                trainers : res.data
            });
        });
    }

    hideAllTabs = () => {
        var i, x, tablinks;
        x = document.getElementsByClassName("tab");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tabButton");
        for (i = 0; i < x.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" activeBtn", "");
        }
    }

    selectTrainer(id) {
        this.props.update(this.state.trainers[id], () => {
            this.hideAllTabs();
            document.getElementById('selectedTrainer').style.display = "block";
            document.getElementById('selectedTrainerBtn').className += " activeBtn";
        });  
    }

    showTab = (evt, showTab) => {
        this.hideAllTabs();
        document.getElementById(showTab).style.display = "block";
        evt.currentTarget.className += " activeBtn";
    }

    changeFilterVal = (e) => {this.setState({filterVal: e.target.value});}
    
    updateForm = (key, val) => {
        const updateTrainer = {name:'', bio:'', img:'', badges:[]};
        for(const k in this.state.newTrainer) {
            (key===k) ? updateTrainer[k] = val :
            updateTrainer[k] = this.state.newTrainer[k]
        }
        this.setState({
            newTrainer: updateTrainer
        })
    }
    
    clearFormInputs = () => {
        this.setState({
            newTrainer : {
                name: '',
                bio: '',
                img: '',
                badges: []
            }
        });
    }

    addTrainer = () => {
        axios.post(this.baseUrl + '/', this.state.newTrainer)
        .then(res => {
            this.setState({
                trainers : res.data,
                newTrainer : {
                    name: '',
                    bio: '',
                    img: '',
                    badges: []
                }
            });
        });
    }

    removeTrainer = (id) => {
        axios.delete(this.baseUrl+`/${id}`)
        .then(res =>
            this.setState({
                trainers: res.data
            }, () => this.selectTrainer(null))
        );
    }

    edit = () => {
        this.props.edit();
        this.componentDidMount();
    }

    render() {
        const { filterVal, trainers, newTrainer } = this.state;
        const { selected } = this.props;
        const all_trainers = trainers
            .filter(el => el.name.toLowerCase().includes(this.state.filterVal.toLocaleLowerCase()))
            .map((el, i) => 
                <Trainer 
                    {...el} 
                    key={i} 
                    index={i} 
                    selectTrainer={this.selectTrainer} 
                    display={"short"} 
            />);

        return (
            <div className="trainerList"> {/* Master container */}
                {/* Tabbing buttons */}
                <div className="controls">
                    <button 
                        className="tabButton activeBtn" 
                        onClick={e=>this.showTab(e, 'trainerContainer')}>
                        Trainers
                    </button>
                    <button 
                        id="selectedTrainerBtn" 
                        className="tabButton" 
                        onClick={e=>this.showTab(e, 'selectedTrainer')}>
                        Selected Trainer
                    </button> 
                    <button 
                        className="tabButton" 
                        onClick={e=>this.showTab(e, 'addTrainer')}>
                        Add Trainer
                    </button>
                </div>

                {/* Trainer Tab */}
                <div className="tab" id="trainerContainer">
                    <div>
                        <input 
                            value={filterVal} 
                            onChange={this.changeFilterVal}
                            placeholder="Search for a trainer" 
                        />
                    </div>
                    {
                        (all_trainers.length > 0) ? 
                            all_trainers 
                            : 
                            <div style={{padding:'5%', width: '90%', textAlign:'center' }}>
                                No Trainers Available.  Add your own!
                            </div>
                    }
                </div>

                {/* Selected Trainer Tab */}
                <div className="tab" id="selectedTrainer">
                    <Trainer 
                        {...selected} display={"long"} 
                        removePokemon={this.props.removePokemon} 
                        removeTrainer={this.removeTrainer}
                        edit={this.edit} />
                </div>

                {/* Add Trainer */}
                <div className="tab" id ="addTrainer">
                    <AddTrainer 
                        newTrainer={newTrainer} 
                        addTrainer={this.addTrainer} 
                        clear={this.clearFormInputs} 
                        updateForm={this.updateForm}/>
                </div>
            </div>

        )
    }
}

export default TrainerList;