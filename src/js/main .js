function convertPokemonToHtml(pokemon) {
    return `
        <li class="pokemon">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="details">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
                </ol>
                <img 
                    src=${pokemon.image}
                    alt=${pokemon.name}
                />
            </div>
        
        </li>
    `;
}


pokeAPI.getPokemon().then((pokemons) => {
    for(let pokemon of pokemons) {
        const html = convertPokemonToHtml(pokemon);
        const list = document.querySelector('.pokemons');
        list.innerHTML += html;
    }
});
