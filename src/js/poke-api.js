const pokeAPI = {};

function convertPokeApiDetailToPokemon(poke) {
    const pokemon = new Pokemon();
    pokemon.number = poke.id;
    pokemon.name = poke.name;
    pokemon.image = poke.sprites.other.dream_world.front_default;

    pokemon.types = poke.types.map((type) => type.type.name);
    pokemon.type = poke.types[0].type.name;

    return pokemon;

}

pokeAPI.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
                .then((response) => response.json())
                .then((pokemon) => convertPokeApiDetailToPokemon(pokemon));

}


pokeAPI.getPokemon = (offset = 0,limit = 10)  => {
    const URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(URL)
            .then((response) => response.json())
            .then((data) => data.results)
            .then((pokemons) => {
                const promises = pokemons.map((pokemon) => pokeAPI.getPokemonDetails(pokemon));
                return Promise.all(promises);
            })
}