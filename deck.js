class Deck {
    constructor(cards) {
        this.cards = cards;
        this.shuffle(this.cards);
    }

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
    }

    draw() {
        return this.cards.pop();
    }
}

module.exports = Deck;