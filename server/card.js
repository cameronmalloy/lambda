class Card {
    constructor(name, attack, defense, role) {
        this.name = name;
        this.attack = attack;
        this.defense = defense;
        this.role = role;
    }

    power(other_card) {
        return this.attack - Math.floor(other_card.defense / 2);
    }

    effect(other_card, player, opponent) {
        if (this.role == 'tutor') {
            for (let i = 0; i < 3; i++) {
                opponent.play();
            }
            opponent.drawNum(3);
        } else if (this.role == 'ta') {
            let tmp = other_card.attack;
            other_card.attack = other_card.defense;
            other_card.defense = tmp;
        } else if (this.role == 'instructor') {
            for (let i = 0; i < player.deck.cards.length; i++) {
                player.deck.cards[i].attack += 300;
                player.deck.cards[i].defense += 300;
            }
        } else if (this.role == 'professor') {
            for (let i = 0; i < player.deck.cards.length; i++) {
                player.deck.cards[i].attack += other_card.attack;
                player.deck.cards[i].defense += other_card.defense;
            }
        }
    }
}

module.exports = Card;