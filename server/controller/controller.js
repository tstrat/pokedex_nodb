/**
 * The controller is responsible for holding all the functionality and protocol
 * of what to do when a request hits any given endpoint that this app is
 * listening for.  I have broken it up from top to bottom as:
 * 
 *  Data:
 *      trainerLists and prototype for object creation
 *  REST:
 *      GET
 *      POST
 *      PUT / PATCH
 *      DELETE
 */



 /* ========    DATA / PROTOTYPES ========= */
const trainerList = [];

const trainerPrototype = {
    name: '',
    pokemon: [],
    badges: [],
    gymLeader: false,
    bio: '',
    img: '',
}

function uniqueId() {
    num = () => Math.floor(Math.random() * 9000 + 1000);
    return num();
}

function findTrainerById(trainerId) {
    const search = trainerList.findIndex(el => el.id === trainerId);
    return search;
}

/**
 * Match this object to trainer structure and return a trainer with
 * only the expected key:value pairs.
 * @param {Trainer} obj Potential new trainer object
 */
function createTrainerObj(obj, currentTrainer) {
    currentTrainer = currentTrainer || trainerPrototype;
    
    const { name, id, pokemon, badges, gymLeader, bio, img } = obj;
    if (!name && !currentTrainer.name) {
        return null;
    }

    const newObj = {
        name: name || currentTrainer.name,
        id: id || currentTrainer.id || uniqueId(),
        pokemon: pokemon || [],
        badges: badges || [],
        gymLeader: gymLeader || false,  // cant be a gym leader unless I say :P
        bio: bio || currentTrainer.bio,
        img: img || currentTrainer.img,
    }
    return newObj;
}

/**
 * Match this object to pokemon structure and return a pokemon with
 * only the expected key:value pairs.
 * @param {Trainer} obj Potential new pokemon object
 */
createPokemonObj = (pokeObj) => {
    const { name, id, img } = pokeObj;
    if (!name || !id) {  // I am requiring both for sanity
        return null;
    }
    return {
        name,
        id,
        img: img || ''
    }
}



/* ========    REST     ========= */



/**
 * Return the trainer object with the given id param.
 * @param {Request} req The client request obj
 * @param {Response} res The server response obj
 */
const getTrainer = (req, res) => {
    const reqId = parseInt(req.params.id);
    const index = findTrainerById(reqId);
    const trainer = trainerList[index];

    (trainer) ?
    res.json(trainer) :
    res.status(404).send(`Trainer cannot be found`);

}

/**
 * Given a req.body that is valid (just needs a name property)
 * create a new trainer profile and add it to the list.
 * @param {Request} req The client request obj
 * @param {Response} res The server response obj
 */
const addTrainer = (req, res) => {
    const trainer = createTrainerObj(req.body); // doTheyCuddleBoolean for Christian
    if (!trainer) {
        res.status(401).send("Bad Request Data");
        return;
    }
    trainerList.push(trainer);
    res.json(trainerList);
}

/**
 * Given the paramater 'ID', update the trainer with that id
 * to have the new values passed in req.body
 * @param {Request} req The client request object
 * @param {Response} res The response object to the client
 */
const updateTrainer = (req, res) => {
    const reqId = parseInt(req.params.id);
    const index = findTrainerById(reqId);
    const updated = createTrainerObj(req.body, trainerList[index]);

    if (!updated) {
        res.status(404).send(`Trainer cannot be found`);
        return;
    }

    if (updated.gymLeader) {
        res.status(403).json(trainerList);
        return;
    }

    trainerList.splice(index, 1, updated);
    res.json(trainerList[index]);
}

/**
 * Given the paramater 'ID', remove the trainer with that id
 * from the trainerList array and return the updated list.
 * @param {Request} req The client request object
 * @param {Response} res The response object to the client
 */
const removeTrainer= (req,res) => {
    const reqId = parseInt(req.params.id);
    const index = findTrainerById(reqId);
    const trainer = trainerList[index];
    if (trainer) {
        if (!trainer.gymLeader) {
            trainerList.splice(index,1);
            res.json(trainerList);
        }
        else {
            res.status(403).json(trainerList);
        }
    } else {
        res.status(404).send(`Trainer with id: ${reqId} not found.  Try again`);
    }
}


/**
 * Given the paramater 'ID', update the trainer with that id
 * to append the new pokemon information to their pokemon list.
 * If list length is 6, no new pokemon can be added.
 * 
 * @param {Request} req The client request object
 * @param {Response} res The response object to the client
 */
const addToTrainerPokemonList = (req,res) => {
    const reqId = parseInt(req.params.id);
    const index = findTrainerById(reqId);
    const trainer = trainerList[index];
    if (trainer.gymLeader) {
        res.status(403).json(trainerList);
        return;
    }
    if (trainer.pokemon.length < 6) {
        const pokemon = createPokemonObj(req.body)
        if (!pokemon){
            res.status(400).send("Bad Input");
            return;
        }
        trainer.pokemon.push(pokemon);
        res.json(trainer); // show trainers updated list
    } else {
        // list is full
        res.status(202).send("Trainers list is full! Cannot add anymore pokemon!");
    }
}

/**
 * Given the paramater 'ID', and the query "INDEX",
 * find the trainer with id and remove the pokemon at
 * index from that trainer's pokemon list.
 * 
 * @param {Request} req The client request object
 * @param {Response} res The response object to the client
 */
const removeFromTrainerPokemonList = (req,res) => {
    let { id } = req.params;
    let { index } = (req.query);
    id = parseInt(id);
    index = parseInt(index);
    const trainerIndex = findTrainerById(id);

    if (trainerIndex < 0) {
        res.status(404).send(`Trainer not found id:${trainerIndex}`);
        return;
    }

    if (trainerList[trainerIndex].gymLeader) {
        res.status(403).json(trainerList);
        return;
    }
    const arr = trainerList[trainerIndex].pokemon;
    if (index < 0 || index > arr.length-1){
        res.status(404).send(`Failed to find pokemon to remove for trainer id:${id}`);
        return;
    }
    arr.splice(index,1);
    res.json(trainerList[trainerIndex]);
}


/*
    Exporting the REST methods
*/
module.exports = {
    getTrainerList : (req, res) => {
        if (req.query.id) {
            req.params.id = req.query.id;
            getTrainer(req,res);
        } else {
            res.json(trainerList);
        }
    },
    getTrainer,
    addTrainer,
    updateTrainer,
    addToTrainerPokemonList,
    removeTrainer,
    removeFromTrainerPokemonList,
}

