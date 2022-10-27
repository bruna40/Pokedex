const loadMoreButton = document.querySelector('#load-more');
const limit = 10;
let offset = 0;
const maxRecords = 151;


function convertPokemonToHtml(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="details">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img 
                    src=${pokemon.image}
                    alt=${pokemon.name}
                />
            </div>
        
        </li>
    `;
}


function loadPokemon(offset,limit) {
    pokeAPI.getPokemon(offset, limit).then((pokemons) => {
        for(let pokemon of pokemons) {
            const html = convertPokemonToHtml(pokemon);
            const list = document.querySelector('.pokemons');
            list.innerHTML += html;
        }
    });
    
}

loadPokemon(offset,limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtrecord = offset + limit;


    if(qtrecord >= maxRecords) {
        const newList =  maxRecords - offset;
        loadPokemon(offset,newList);   
        
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemon(offset,limit);
    }
});