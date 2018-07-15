class Player {
    constructor(deck, name) {
        this.name = name;
        this.deck = deck;
        this.hand = [];
        this.drawNum(5);
    }

    drawNum(num) {
        for (let i = 0; i < num; i++) {
            this.hand.push(this.deck.draw());
        }
    }

    draw() {
        this.hand.push(this.deck.draw());
    }

    play(card_index) {
        let value = this.hand[card_index];
        this.hand.splice(card_index, 1);
        return value;
    }
}

module.exports = Player;