const Card = require('./card');
const Deck = require('./deck');

class Decks {
    constructor() {
        const james = new Card('James, Voice of Zendikar', 3000, 1500, 'instructor');
        const jen = new Card('Jen', 2000, 4000, 'instructor');
        const mitas = new Card('Mitas, Obelisk the Tormentor', 4000, 4000, 'instructor');
        const tammy = new Card('Tammy', 2500, 3000, 'instructor');

        const alexs = new Card('President Lieutenant Stennet for Senate', 1800, 2200, 'ta');
        const alexw = new Card('Alex W, The Overclocked', 2800, 1700, 'ta');
        const cameron = new Card('Cameron Sensei', 1500, 3000, 'ta');
        const chae = new Card('Chae-Z', 2000, 2000, 'ta');
        const chris = new Card('Chris, Caller of Men', 2300, 1700, 'ta');
        const christina = new Card('Christina', 1700, 1500, 'ta');
        const derek = new Card('Derek, the Wan and Only', 2600, 1900, 'ta');
        const erica = new Card('Erica, King Kong of the Arena', 1500, 1800, 'ta');
        const griffin = new Card('Griffin', 2700, 300, 'ta');
        const jemin = new Card('Jemin, Destroyer of Belgium', 2100, 2000, 'ta');
        const jennifer = new Card('Jennifer', 1400, 2800, 'ta');
        const jenny = new Card('Jenny, Dude of Asuh', 2500, 1800, 'ta');
        const kevin = new Card('Kevin', 2600, 1800, 'ta');
        const nancy = new Card('Nancy the Shawe', 2300, 1400, 'ta');

        const aaron = new Card('Aaron the Airbender', 2300, 1400, 'tutor');
        const ajan = new Card('Ajan', 1700, 1100, 'tutor');
        const amyh = new Card('Amy, Always Hung-ry', 2400, 700, 'tutor');
        const amym = new Card('Amy M', 1900, 1500, 'tutor');
        const asli = new Card('Asli', 2000, 1600, 'tutor');
        const daniel = new Card('Daniel, Soylent Guardian', 1800, 1100, 'tutor');
        const jacob = new Card('Jacob', 2200, 1600, 'tutor');
        const hermish = new Card('Hermish', 2400, 600, 'tutor');
        const jemmy = new Card('Jemmy, The Jem Collector', 1900, 1300, 'tutor');
        const jericho = new Card('Jericho, Cowboy of Tax Evasion', 1900, 1700, 'tutor');
        const kate = new Card('Kate, the Exponential Runtime of Ra', 1500, 2100, 'tutor');
        const lauren = new Card('Scorin Lauren', 2700, 2000, 'tutor');
        const rachel = new Card('Rachel Gene of Jeans de Jaen', 1100, 2300, 'tutor');
        const shide = new Card('Shide', 2100, 600, 'tutor');
        const tiffany = new Card('Tiffany, A bridge Troll', 1500, 2100, 'tutor');
        const wenyuan = new Card('Wenyuan', 1300, 1800, 'tutor');

        const denero = new Card('Denero', 5000, 5000, 'professor');

        /*const test1 = new Card('test1', 1000, 1000);
        const test2 = new Card('test2', 1000, 1000);
        const test3 = new Card('test3', 1000, 1000);
        const test4 = new Card('test4', 1000, 1000);
        const test5 = new Card('test5', 1000, 1000);
        const test6 = new Card('test6', 1000, 1000);
        const test7 = new Card('test7', 1000, 1000);
        const test8 = new Card('test8', 1000, 1000);*/

        this.standard_cards = [james, jen, mitas, tammy, alexs, alexw, cameron, chae, chris, christina,
        derek, erica, griffin, jemin, jennifer, jenny, kevin, nancy, aaron, ajan, amyh, amym, asli,
        daniel, jacob, hermish, jemmy, jericho, kate, lauren, rachel, shide, tiffany, wenyuan, denero];
        //this.standard_cards = [denero, test1, test2, test3, test4, test5, test6, test7, test8];
        this.standard_deck = new Deck(this.standard_cards);
    }
}

module.exports = Decks;