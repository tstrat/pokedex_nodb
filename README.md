# No-Database Project
<img src=https://s3.amazonaws.com/devmountain/www/img/dm_white_logo.png height="50px" />

This project aims to use the api from <a href="pokeapi.co">PokeApi</a> in order to display a basic pokedex and then maintain a trainer portfolio with teams of pokemon.  This project does not use a back-end database and needs to stand up a temporary one in order to preserve any requests made locally.  The pokedex section will be hitting the pokeapi directly so it can work regardless of the local server.

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


