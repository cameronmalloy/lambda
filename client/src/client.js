
const colors = ['#FF147C', '#16BD4C', '#0813D2', '#DF260F', '#8B28B4', '#F8D149', '	#EA9709'];

/**
 * Appends a list element to the events ul then scrolls down
 */
const writeEvent = (text) => {
    //ul elm
    const parent = document.querySelector('#events');
    //li elm
    const el = document.createElement('li');
    el.innerHTML = text;
    parent.appendChild(el);
    console.log(scroll);
    scrollDown();
};

/**
 * Appends a list element to the global-events ul then scrolls down
 */
const writeEventGlobal = (text) => {
    //ul elm
    const parent = document.querySelector('#global-events');
    //li elm
    const el = document.createElement('li');
    el.innerHTML = text;
    parent.appendChild(el);
    const scrollEl = document.getElementById("global-events");
    scrollEl.scrollTop = scrollEl.scrollHeight;
};

/**
 * @param {*} array ==> an array of cards (which is their hand)
 * takes the appropriate card id <p> tag and adds text to them
 */
const writeCards = (array) => {
    for (let i = 0; i < array.length; i++) {
        /*if (array[i] == undefined) {
            document.getElementById(`card${i+1}`).innerHTML=``;
            continue;
        }*/
        document.getElementById(`card${i+1}`).innerHTML=`${i+1}. Name: ${array[i].name} || Attack: ${array[i].attack} || Defense: ${array[i].defense} || Role: ${array[i].role}`;
    }
    for (let i = array.length; i < 12; i++) {
        document.getElementById(`card${i+1}`).innerHTML=``;
    }
    /*
    document.getElementById('card1').innerHTML=`1. Name: ${array[0].name} || Attack: ${array[0].attack} || Defense: ${array[0].defense} || Role: ${array[0].role}`;
    document.getElementById('card2').innerHTML=`2. Name: ${array[1].name} || Attack: ${array[1].attack} || Defense: ${array[1].defense} || Role: ${array[1].role}`;
    document.getElementById('card3').innerHTML=`3. Name: ${array[2].name} || Attack: ${array[2].attack} || Defense: ${array[2].defense} || Role: ${array[2].role}`;
    document.getElementById('card4').innerHTML=`4. Name: ${array[3].name} || Attack: ${array[3].attack} || Defense: ${array[3].defense} || Role: ${array[3].role}`;
    document.getElementById('card5').innerHTML=`5. Name: ${array[4].name} || Attack: ${array[4].attack} || Defense: ${array[4].defense} || Role: ${array[4].role}`;
    */
    //array.forEach((card, index) => {
     //   document.getElementsByTagName("p")[i].innerHTML="yo";
        //=`Name: ${card.name} Attack: ${card.attack} Defense: ${card.defense} Role: ${card.role}`
    //})
}

const scrollDown = () => {
    let element = document.getElementById("events");
    element.scrollTop = element.scrollHeight;
}

const scrollTop = () => {
    let element = document.getElementById("events");
    element.scrollTop = 0;
};

/**
 * What to do when the chat button is pressed
 */
const onFormSubmitted = (e) => {
    e.preventDefault();
    const input = document.querySelector('#chat');
    const inputValue = input.value;
    input.value = '';
    let name = document.getElementById("name-word").value;
    //set name to anon if there is no name
    if (name == '') {
        name = 'Anon.';
    }
    //include a random color
    index = Math.floor(Math.random() * 8);
    htmlText = `<b style="color: ${colors[index]}">` + name + "</b>" + ": " + inputValue;

    sock.emit('message', htmlText);
};

/**
 * What to do when secret is submitted. Disable button and start game through last emit call
 */
const onSecretSubmitted = (e) => {
    e.preventDefault();
    const nameDoc = document.querySelector('#name-word');
    const secretDoc = document.querySelector('#secret-word');
    const name = nameDoc.value;
    const secret = secretDoc.value;
    name.value = '';
    secret.value = '';
    document.querySelector('#secret-button').disabled = true;
    document.querySelector('#secret-word').disabled = true;
    //document.querySelector('#secret-word').value = 'Disabled';
    //document.querySelector('#name-word').value = 'Disabled';

    sock.emit('secret', [name, secret]);
};

/**
 * What to do when name is submitted, disable form
 */
const onNameSubmitted = (e) => {
    e.preventDefault();
    const nameDoc = document.querySelector('#name-word');
    const name = nameDoc.value;
    name.value = '';
    document.querySelector('#name-word').disabled = true;
}

/**
 * Button listeners for cards, starts next turn through emit call
 */
const addButtonListeners = () => {
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].forEach((id) => {
        const button = document.getElementById(id);
        button.addEventListener('click', () => {
            sock.emit('turn', id)
        });
    });
};

//initialize socketio
const sock = io();

//initialize socket listeners for ping from server
sock.on('message', writeEvent);
sock.on('global-message', writeEventGlobal);
sock.on('updateCards', writeCards);
sock.on('updateScroll', scrollDown);

//what to write before game starts
writeEvent(`<b>Set name (for global chat and player name). Then set you're secret word to connect to your partner. Use the global chat if you want to find someone online.</b>`);
writeEvent(`<b>*** To change name, secret, or start a new game, refresh page. Refreshing page will make the game come to a halt and you can't reconnect :(.***</b>`);
writeEvent(`Rules:`);
writeEvent(`Each person will choose a staff member to throw out into the fray. Power levels will be calculated for each player based on this formula: Player's attack - (opponent's defense // 2)`)
writeEvent(`The winner of each round is the player with the highest power level.`);
writeEvent(`The first one to win 5 rounds wins the game.`);
writeEvent('Effects: Each staff member has a special effect:');
writeEvent('Tutors will make the opponent discard the first 3 cards in their hand and make the opponent redraw the 3.');
writeEvent('TAs will swap the attack and defense of the opponent before power calculations.');
writeEvent('Instructors will buff the rest of the deck by adding +300 ATK and +300 DEF to each card in the deck. They will also take the opponents card and place it in their hand and deck.');
writeEvent(`Professors will add the opponent's attack and defense to the remaining cards in their deck. Professors will also take a copy opponents card and place it in their hand and deck.`);
writeEvent('========================================================================');
writeEvent(`To start, type in a name and secret word into the boxes above and click enter. In order to connect to your opponent, you must have the same secret word when you hit 'Enter'. Press the numbered buttons to play cards in your hand (hand is displayed below numbered buttons)`);
writeEvent('========================================================================');
scrollTop();

//initialize event listeners
document.querySelector('#chat-form').addEventListener('submit', onFormSubmitted);
document.querySelector('#secret-form').addEventListener('submit', onSecretSubmitted);
document.querySelector('#name-form').addEventListener('submit', onNameSubmitted);

//initialize turn listeners
addButtonListeners();