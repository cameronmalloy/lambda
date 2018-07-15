
const writeEvent = (text) => {
    //ul elm
    const parent = document.querySelector('#events');
    //li elm
    const el = document.createElement('li');
    el.innerHTML = text;
    parent.appendChild(el);
};

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

const onFormSubmitted = (e) => {
    e.preventDefault();
    const input = document.querySelector('#chat');
    const text = input.value;
    input.value = '';

    sock.emit('message', text);
};

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
    document.querySelector('#secret-word').value = 'Disabled';
    document.querySelector('#name-word').disabled = true;
    document.querySelector('#name-word').value = 'Disabled';

    sock.emit('secret', [name, secret]);
};

const addButtonListeners = () => {
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].forEach((id) => {
        const button = document.getElementById(id);
        button.addEventListener('click', () => {
            sock.emit('turn', id)
        });
    });
};

const sock = io();
sock.on('message', writeEvent);
sock.on('updateCards', writeCards);
sock.on('updateScroll', scrollDown);

writeEvent('Magic: The Lambda-ing');
writeEvent(`Rules: Each person will choose a staff member to throw out into the fray. Power levels will be calculated for each player based on this formula: Player's attack - (opponent's defense // 2)`);
writeEvent('Effects: Each staff member has a special effect:');
writeEvent('Tutors will make the opponent discard the first 3 cards in their hand and make the opponent redraw the 3.');
writeEvent('TAs will swap the attack and defense of the opponent before power calculations.');
writeEvent('Instructors will buff the rest of the deck by adding +300 ATK and +300 DEF to each card in the deck. They will also take the opponents card and place it in their hand and deck.');
writeEvent(`Professors will add the opponent's attack and defense to the remaining cards in their deck. Professors will also take a copy opponents card and place it in their hand and deck.`);
writeEvent('========================================================================');
writeEvent(`To start, type in a name and secret word into the boxes above and click enter. In order to connect to your opponent, you must have the same secret word when you hit 'Enter'`);
writeEvent('========================================================================');


document.querySelector('#chat-form').addEventListener('submit', onFormSubmitted);
document.querySelector('#secret-form').addEventListener('submit', onSecretSubmitted);

addButtonListeners();