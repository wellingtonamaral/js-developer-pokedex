const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  const abilities = pokeDetail.abilities.map((nameAbility) => nameAbility.ability.name)
  pokemon.abilities = abilities;

  
  const pokemonAnimated =
    pokeDetail["sprites"]["versions"]["generation-v"]["black-white"]["animated"]
      .front_default;
  pokemon.photo = pokemonAnimated || pokeDetail.sprites;

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 100) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

  return fetch(url)
  .then((response) => response.json())
  .then((jsonBody) => jsonBody.results)
  .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
  .then((detailRequests) => Promise.all(detailRequests))
  .then((pokemonsDetails) => pokemonsDetails)
}
