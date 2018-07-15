
class Game {
    constructor(p1, p2, goal) {
        this.p1 = p1;
        this.p2 = p2;
        this.goal = goal;
        this.p1Score = 0;
        this.p2Score = 0;
    }

    /**
     * Simulates a round by first
     * 1. Using each cards effect (before the next draw)
     * 2. Calculating the power of each card (so TA's have their effect first)
     * 3. Calculating who won the round and updating the score
     */
    play_round(card1, card2, player1, player2) {
        card1.effect(card2, player1, player2);
        card2.effect(card1, player2, player1);
        let p1_power = card1.power(card2);
        let p2_power = card2.power(card1);
        if (p1_power > p2_power) {
            this.p1Score += 1;
            return 1;
        } else if (p1_power < p2_power) {
            this.p2Score += 1;
            return 2;
        } else {
            return 0;
        }
    }

    game_won() {
        if (this.p1Score < this.goal && this.p2Score < this.goal) {
            return 0;
        } else if (this.p1Score > this.p2Score) {
            return 1;
        } else {
            return 2;
        }
    }
}

module.exports = Game;