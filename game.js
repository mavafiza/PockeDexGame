let cards = [];
let flippedCards = [];
let matchedCards = [];

/*---------------------      memoria      ---------------------*/

document.getElementById('start-button').addEventListener('click', startGame);

function startGame() {
    // Limpia el tablero
    document.getElementById('board').innerHTML = '';
    cards = [];
    flippedCards = [];
    matchedCards = [];

    // Obtener 15 pares aleatorios de Pokémon
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
    let pokemonIds = getRandomPokemonIds(15);
    let requests = pokemonIds.map(id => fetch(apiUrl + id).then(response => response.json()));

    Promise.all(requests)
        .then(pokemonData => {
            // Crear las cartas
            let pokemonNames = pokemonData.map(data => data.name);
            let pokemonImages = pokemonData.map(data => data.sprites.other.dream_world.front_default);
            cards = createCardPairs(pokemonNames, pokemonImages);

            // Mezclar las cartas
            shuffleCards(cards);

            // Generar el tablero
            let board = document.getElementById('board');
            cards.forEach(card => {
                let cardElement = document.createElement('div');
                cardElement.className = 'card';
                cardElement.dataset.name = card.name;

                let imgElement = document.createElement('img');
                imgElement.src = card.image;
                cardElement.appendChild(imgElement);

                cardElement.addEventListener('click', flipCard);
                board.appendChild(cardElement);
            });
        });
}

function getRandomPokemonIds(count) {
    let pokemonIds = [];
    for (let i = 0; i < count; i++) {
        pokemonIds.push(Math.floor(Math.random() * 151) + 1);
    }
    return pokemonIds;
}

function createCardPairs(names, images) {
    let cards = [];
    for (let i = 0; i < names.length; i++) {
        let card1 = { name: names[i], image: images[i] };
        let card2 = { name: names[i], image: images[i] };
        cards.push(card1, card2);
    }
    return cards;
}

function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
}

function flipCard() {
    if (flippedCards.length < 2 && !flippedCards.includes(this) && !this.classList.contains('show')) {
        this.classList.add('show');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    let card1 = flippedCards[0];
    let card2 = flippedCards[1];

    if (card1.dataset.name === card2.dataset.name) {
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);
        matchedCards.push(card1, card2);
        card1.style.visibility = 'hidden';
        card2.style.visibility = 'hidden';

        if (matchedCards.length === cards.length) {
            endGame();
        }
    } else {
        card1.classList.remove('show');
        card2.classList.remove('show');
    }

    flippedCards = [];
}


function endGame() {
    let messageElement = document.getElementById('message');
    messageElement.innerHTML = '<p id="finishedGame">¡...Lo has logrado...!</p><p id="finishedGame">¿...Quieres jugar de nuevo...?</p>';

}


/*---------------------      navbar      ---------------------*/

const links = document.querySelectorAll("nav ul li a");

const currentURL = window.location.href;

for (const link of links) {
    if (link.href === currentURL) {
        link.classList.add("current");
    }
}