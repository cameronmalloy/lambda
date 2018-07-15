const Deck = require('./deck.js');
const Player = require('./player.js');
const Card = require('./card');
const Decks = require('./decks');
const Game = require('./game');

class LambdaGame {

    constructor(p1, p2) {
        this._players = [p1, p2];
        this._turns = [null, null];

        this._sendToPlayers('Game is Starting');

        let deck1 = new Decks();
        let deck2 = new Decks();
        this.player1 = new Player(deck1.standard_deck, 'Player 1');
        this.player2 = new Player(deck2.standard_deck, 'Player 2');

        this._players.forEach((player, index) => {
            player.on('turn', (turn) => {
                this._onTurn(index, turn);
            });
        });
        
        this.duel = new Game(this.player1, this.player2, 5);
        this._updateCards();
        this._sendToPlayer(0, '!=====You are Player 1=====!')
        this._sendToPlayer(1, '!=====You are Player 2=====!')
    }

    _updateCards() {
        this._players[0].emit('updateCards', this.player1.hand);
        this._players[1].emit('updateCards', this.player2.hand);
    }

    test_player() {
        let decks = new Decks();
        let player = new Player(decks.standard_deck, 'Player 1');
    }

    _sendToPlayers(message) {
        this._players.forEach(player => player.emit('message', message))
    }

    _sendToPlayer(playerIndex, message) {
        this._players[playerIndex].emit('message', message);
    }

    _updateScroll() {
        this._players.forEach(player => player.emit('updateScroll'));
    }

    _onTurn(playerIndex, turn) {
        if (this._turns[playerIndex] != null) {
            return;
        }
        this._turns[playerIndex] = turn - 1;
        this._updateScroll();
        this._sendToPlayer(playerIndex, `You selected card ${turn}`);
        if (this._checkPlayTurn()) {
            this._playTurn()
        }
    }

    _checkPlayTurn() {
        if (this._turns[0] != null && this._turns[1] != null) {
            return true;
        }
        return false;
    }

    _playTurn() {
        console.log(this.player1.hand);
        const card1 = this.player1.hand[this._turns[0]];
        const card2 = this.player2.hand[this._turns[1]];
        this.player1.play(this._turns[0]);
        this.player2.play(this._turns[1]);
        const winner = this.duel.play_round(card1, card2, this.player1, this.player2);
        const isOver = this.duel.game_won();
        let line = '';
        if (isOver == 0) {
            if (winner == 1) {
                console.log('player 1 wins');
            } else if (winner == 2) {
                console.log('player 2 wins');
            } else {
                console.log('tie');
            }
            this._draw(card1, card2, winner);
            this._turns = [null, null];
            this.player1.draw();
            this.player2.draw();
            this._updateCards();
        } else if (isOver == 1)
        if (this.duel.game_won()) {
            line = '========================================================================';
            this._sendToPlayers(line);
            line = 'You are undefeated!';
            this._sendToPlayer(0, line);
            line = `You have been defeated! You'll get'em next time!`
            this._sendToPlayer(1, line);
            line = '========================================================================';
            this._sendToPlayers(line);
        } else {
            line = '========================================================================';
            this._sendToPlayers(line);
            line = 'You are undefeated!';
            this._sendToPlayer(1, line);
            line = `You have been defeated! You'll get'em next time!`
            this._sendToPlayer(0, line);
            line = '========================================================================';
            this._sendToPlayers(line);
        }
    console.log(this.player1.hand);
    }

    _draw(card1, card2, winner) {
        const name1 = card1.name;
        let attack1 = card1.attack;
        let defense1 = card1.defense;
        const role1 = card1.role;
        const name2 = card2.name;
        let attack2 = card2.attack;
        let defense2 = card2.defense;
        const role2 = card2.role;

        let line = '========================================================================';
        this._sendToPlayers(line);

        line = `Player 1 played ${name1} with ATK: ${attack1} and DEF: ${defense1}`;
        this._sendToPlayers(line);
        line = `Player 2 played ${name2} with ATK: ${attack2} and DEF: ${defense2}`;
        this._sendToPlayers(line);

        if (role1 == 'ta') {
            line = `**Effect** ${name1} swapped the ATK and DEF of ${name2} before calculations`;
            const tmp = attack2;
            attack2 = defense2;
            defense2 = tmp;
            this._sendToPlayers(line);
        }
        if (role2 == 'ta') {
            line = `**Effect** ${name2} swapped the ATK and DEF of ${name1} before calculations`;
            const tmp = attack1;
            attack1 = defense1;
            defense1 = tmp;
            this._sendToPlayers(line);
        }

        const p1Power = attack1 - Math.floor(defense2 / 2);
        line = `Player 1's Power Points: ${attack1} - ${defense2} // 2 ==> ${p1Power}`;
        this._sendToPlayers(line);
        const p2Power = attack2 - Math.floor(defense1 / 2);
        line = `Player 2's Power Points: ${attack2} - ${defense1} // 2 ==> ${p2Power}`;
        this._sendToPlayers(line);

        if (winner == 1) {
            line = 'You won the round!';
            this._sendToPlayer(0, line);
            line = 'You lost the round :(';
            this._sendToPlayer(1, line);
        } else if (winner == 2) {
            line = 'You won the round!';
            this._sendToPlayer(1, line);
            line = 'You lost the round :(';
            this._sendToPlayer(0, line);
        } else {
            line = `You both tied, scores don't change`;
            this._sendToPlayers(line);
        }

        line = '========================================================================';
        this._sendToPlayers(line);

        if (role1 == 'tutor') {
            line = `**Effect** ${name1} made Player 2 swap their last 3 cards :O`;
            this._sendToPlayers(line);
        } else if (role1 == 'instructor') {
            line = `**Effect** ${name1} inspired the team members! Future draws for Player 1 will have +300 ATK and +300 DEF`;
            this._sendToPlayers(line);
        }
        if (role2 == 'tutor') {
            line = `**Effect** ${name2} made Player 1 swap their last 3 cards :O`;
            this._sendToPlayers(line);
        } else if (role2 == 'instructor') {
            line = `**Effect** ${name2} inspired the team members! Future draws for Player 2 will have +300 ATK and +300 DEF`;
            this._sendToPlayers(line);
        }

        line = '========================================================================';
        this._sendToPlayers(line);
        line = '<==========Scores==========>';
        this._sendToPlayers(line);
        line = `==> Player 1: ${this.duel.p1Score}`;
        this._sendToPlayers(line);
        line = `==> Player 2: ${this.duel.p2Score}`;
        this._sendToPlayers(line);
        line = '========================================================================';
        this._sendToPlayers(line);

        this._updateScroll();
    }
}

module.exports = LambdaGame;