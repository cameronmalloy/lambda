class Card {
    constructor(name, attack, defense, role) {
        this.name = name;
        this.attack = attack;
        this.defense = defense;
        this.role = role;
    }

    power(other_card) {
        return this.attack - (other_card.defense / 2);
    }

    effect(other_card, player, opponent) {
        if (this.role == 'tutor') {
            for (let i = 0; i < 3; i++) {
                opponent.hand.splice(0, 1);
            }
            for (let i = 0; i < 3; i++) {
                if (opponent.deck.cards.length > 0) {
                    opponent.draw();
                }
            }
        } else if (this.role == 'ta') {
            let tmp = other_card.attack;
            other_card.attack = other_card.defense;
            other_card.defense = tmp;
        } else if (this.role == 'instructor') {
            for (let i = 0; i < player.deck.cards.length; i++) {
                player.deck.cards[i].attack += 300;
                player.deck.cards[i].defense += 300;
            }
            const cardToAdd = new Card(other_card.name, other_card.attack, other_card.defense, other_card.role);
            player.deck.cards.push(cardToAdd);
            player.hand.push(cardToAdd);
            player.deck.shuffle(player.deck.cards);
        } else if (this.role == 'professor') {
            for (let i = 0; i < player.deck.cards.length; i++) {
                player.deck.cards[i].attack += other_card.attack;
                player.deck.cards[i].defense += other_card.defense;
            }
            const cardToAdd = new Card(other_card.name, other_card.attack, other_card.defense, other_card.role);
            player.deck.cards.push(cardToAdd);
            player.hand.push(cardToAdd);
            let orig_len = opponent.deck.cards.length;
            for (let i = 0; i < opponent.deck.cards.length; i++) {
                let card = opponent.deck.cards[i];
                if (card.attack == other_card.attack && card.defense == other_card.defense) {
                    opponent.deck.cards.splice(i, 1);
                }
            }
            player.deck.shuffle(player.deck.cards);
            console.log(orig_len - opponent.deck.cards.length);
        }
    }
}

module.exports = Card;