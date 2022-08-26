## Author: 
### Travis Stratton

# No-Database Project
<img src=https://s3.amazonaws.com/devmountain/www/img/dm_white_logo.png height="50px" />

This project aims to use the api from <a href="pokeapi.co">PokeApi</a> in order to display a basic pokedex and then maintain a trainer portfolio with teams of pokemon.  This project does not use a back-end database and needs to stand up a temporary one in order to preserve any requests made locally.  The pokedex section will be hitting the pokeapi directly so it can work regardless of the local server.


### The Rubric...

| Requirement                                  | Points   | Max |
| -------------------------------------------- | -------- | --- |
| 1. 1 stateful component, not counting App.js | required |     |
| 2. 1 stateless functional component          | required |     |
| 3. 1 GET endpoint in Express                 | required |     |
| 4. 1 endpoint that uses `req.body`           | required |     |
| 5. each component above minimum              | 0.5      | 1   |
| 6. use a single component more than once     | 0.5      | 1   |
| 7. URL parameter                             | 0.25     | 0.5 |
| 8. Query string parameter                    | 0.25     | 0.5 |
| 9. external web API, per endpoint used       | 0.5      | 2   |
| 10. full CRUD                                | 1        | 1   |

1. Stateful components: `App.js`, `Pokedex.js`, `TrainerList.js`, `weather.js`
2. Stateless components: `pokemon.js`, `type.js`, `stat.js`, `trainer.js`
3. GET endpoint in Express:  GET `/api/v1/trainers/`
4. 1 endpoint that uses `req.body`: POST `/api/v1/trainers/`
5. components above min:  I have 4 of each type
6. Uses single component more than once: `Type.js`, `Stat.js`, `Trainer.js`
7. URL Param: `/api/v1/trainers/:id`
8. Query String: App.js(line 54) / controller.js(line 240), weather.js call
9. External API: PokeApi `pokeapi.co/api/v2/pokemon/:number` / `pokeapi.co/api/v2/pokemon-species/:number`,  WeatherAPI `https://api.openweathermap.org/data/2.5/weather?q=NAMEOFCITY`
10. Full CRUD : Show index.js and controller.js 


### Endpoints that are Useful
pokeapi.co/api/v2/pokemon-species/:number 
    
    name
    
    "flavor_text_entries"[1] // english

    "genera": [
        { // other content},
        { // ja content },
        {
            "genus": "Seed Pok\u00e9mon",
            "language": {
                "name": "en",
                "url": "https://pokeapi.co/api/v2/language/9/"
            }
        },...
    ]

pokeapi.co/api/v2/pokemon/:number 
```javascript
{
    "name": "bulbasaur",
    "species": {
        "name": "bulbasaur",
        "url": "https://pokeapi.co/api/v2/pokemon-species/1/"
    },
    "sprites": {
        "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
    },
    "stats": [
        {
            "base_stat": 45,
            "stat": {
                "name": "speed",
            }
        },
        {
            "base_stat": 65,
            "effort": 0,
            "stat": {
                "name": "special-defense",
            }
        },
        {
            "base_stat": 65,
            "effort": 1,
            "stat": {
                "name": "special-attack",
            }
        },
        {
            "base_stat": 49,
            "stat": {
                "name": "defense",
            }
        },
        {
            "base_stat": 49,
            "stat": {
                "name": "attack",
            }
        },
        {
            "base_stat": 45,
            "stat": {
                "name": "hp",
            }
        }
    ],
    "types": [
        {
            "slot": 2,
            "type": {
                "name": "poison",
                "url": "https://pokeapi.co/api/v2/type/4/"
            }
        },
        {
            "slot": 1,
            "type": {
                "name": "grass",
                "url": "https://pokeapi.co/api/v2/type/12/"
            }
        }
    ],
    "weight": 69
}
```

```Height``` and ```Weight``` are set in decimeters and decagrams respectively.  Need conversion of 10 to base meter and kg.


