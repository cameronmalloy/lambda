class Player {
    constructor(deck, name) {
        self.name = name;
        self.deck = deck;
        self.hand = draw(5);
    }

    drawNum(num) {
        for (let i = 0; i < num; i++) {
            self.hand.push(self.deck.draw());
        }
    }

    draw() {
        self.hand.push(self.deck.draw());
    }

    play(card_index) {
        let value = self.hand[card_index];
        self.hand.splice(card_index, 1);
    }
}

module.exports = Player;