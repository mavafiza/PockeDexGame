function getPokemon() {
    const pokemonId = document.getElementById("pokemonId").value;
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayPokemonInfo(data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function displayPokemonInfo(pokemon) {
    const pokemonInfoDiv = document.getElementById("pokemonInfo");
    pokemonInfoDiv.innerHTML = `
        <h2>${pokemon.name}</h2>
        <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
        <h3>Habilidades:</h3>
        <ul>
        ${pokemon.abilities.map((ability) => `<li>${ability.ability.name}</li>`).join("")}
        </ul>
    `;
}


/*---------------------      navbar      ---------------------*/

const links = document.querySelectorAll("nav ul li a");

const currentURL = window.location.href;

for (const link of links) {
    if (link.href === currentURL) {
        link.classList.add("current");
    }
}