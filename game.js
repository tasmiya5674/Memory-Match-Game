const categories = {
    fruits: ['🍎', '🍌', '🍉', '🍇', '🍓', '🍒', '🥭', '🍍'],
    emojis: ['😀', '😂', '😍', '😎', '😜', '🤩', '😭', '😡'],
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'],
    planets: ['🌍', '🌕', '🪐', '🌞', '⭐', '☄️', '🌑', '🌟']
};

let gameCards = [], flippedCards = [], score = 0, timer;

function startGame(category) {
    document.getElementById('landing-page').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');

    gameCards = [...categories[category], ...categories[category]].sort(() => Math.random() - 0.5);

    document.getElementById('game-board').innerHTML = gameCards.map((emoji, index) => 
        `<div class="card" onclick="flipCard(this, '${emoji}')" data-index="${index}"></div>`
    ).join('');

    score = 0;
    document.getElementById('score').innerText = score;
    startTimer();
}

function flipCard(card, emoji) {
    if (flippedCards.length < 2 && !card.classList.contains('matched')) {
        card.innerText = emoji;
        flippedCards.push({ card, emoji });

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    if (flippedCards[0].emoji === flippedCards[1].emoji) {
        flippedCards.forEach(({ card }) => card.classList.add('matched'));
        score += 10;
    } else {
        flippedCards.forEach(({ card }) => card.innerText = '');
    }
    
    document.getElementById('score').innerText = score;
    flippedCards = [];
}

function startTimer() {
    let timeLeft = 30;
    document.getElementById('timer').innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            alert('Game Over! Your score: ' + score);
            resetGame();
        }
    }, 1000);
}

function resetGame() {
    clearInterval(timer);
    document.getElementById('landing-page').classList.remove('hidden');
    document.getElementById('game-container').classList.add('hidden');
    document.getElementById('game-board').innerHTML = '';
}
