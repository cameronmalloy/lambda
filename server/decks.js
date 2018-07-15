class Decks {
    constructor() {
        const james = new Card('James, Voice of Zendikar', 3000, 1500, 'instructor');
        const jen = new Card('Jen', 2000, 4000, 'instructor');
        const mitas = new Card('Mitas, Obelisk the Tormentor', 4000, 4000, 'instructor');
        const tammy = new Card('Tammy', 2500, 3000, 'instructor');

        const alexs = new Card('President Lieutenant Stennet for Senate', 1800, 2200, 'ta');
        const alexw = new Card('Alex W, The Overclocked', 2800, 1700, 'ta');
        const cameron = new Card('Cameron Sensei', 1500, 3000, 'ta');

        self.standard_cards = [james, jen, mitas, tammy, alexs, alexw, cameron];
        self.standard_deck = new Decks(this.standard_cards);
    }
}

module.exports = Decks;