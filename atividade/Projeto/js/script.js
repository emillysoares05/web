document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.querySelector(".game-container");
    const resetButton = document.getElementById("reset");

    const emojis = ["🍎", "🍌", "🍒", "🍇", "🍉", "🍓", "🍍", "🥝"];
    let cardsArray = [...emojis, ...emojis]; // Duplica os emojis para formar pares

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    // Função para embaralhar as cartas
    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // Função para criar o tabuleiro
    function createBoard() {
        gameContainer.innerHTML = ""; // Limpa o tabuleiro
        cardsArray = shuffle(cardsArray);

        cardsArray.forEach((emoji) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.emoji = emoji;
            card.innerHTML = "?";
            card.addEventListener("click", flipCard);
            gameContainer.appendChild(card);
        });
    }

    // Função para virar a carta
    function flipCard() {
        if (lockBoard || this === firstCard) return;

        this.innerHTML = this.dataset.emoji;
        this.classList.add("flipped");

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        checkMatch();
    }

    // Função para verificar se as cartas formam um par
    function checkMatch() {
        lockBoard = true;
        if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            resetCards();
        } else {
            setTimeout(() => {
                firstCard.innerHTML = "?";
                secondCard.innerHTML = "?";
                firstCard.classList.remove("flipped");
                secondCard.classList.remove("flipped");
                resetCards();
            }, 1000);
        }
    }

    // Reseta as cartas selecionadas
    function resetCards() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    // Reiniciar o jogo
    resetButton.addEventListener("click", createBoard);

    // Iniciar o jogo ao carregar a página
    createBoard();
});