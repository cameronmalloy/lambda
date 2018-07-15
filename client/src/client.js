
const writeEvent = (text) => {
    //ul elm
    const parent = document.querySelector('#events');
    //li elm
    const el = document.createElement('li');
    el.innerHTML = text;
    parent.appendChild(el);
};

const writeCards = (array) => {
    document.getElementById('card1').innerHTML=`1. Name: ${array[0].name} || Attack: ${array[0].attack} || Defense: ${array[0].defense} || Role: ${array[0].role}`;
    document.getElementById('card2').innerHTML=`2. Name: ${array[1].name} || Attack: ${array[1].attack} || Defense: ${array[1].defense} || Role: ${array[1].role}`;
    document.getElementById('card3').innerHTML=`3. Name: ${array[2].name} || Attack: ${array[2].attack} || Defense: ${array[2].defense} || Role: ${array[2].role}`;
    document.getElementById('card4').innerHTML=`4. Name: ${array[3].name} || Attack: ${array[3].attack} || Defense: ${array[3].defense} || Role: ${array[3].role}`;
    document.getElementById('card5').innerHTML=`5. Name: ${array[4].name} || Attack: ${array[4].attack} || Defense: ${array[4].defense} || Role: ${array[4].role}`;
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
    const input = document.querySelector('#secret-word');
    const text = input.value;
    input.value = '';
    document.querySelector('#secret-button').disabled = true;
    document.querySelector('#secret-word').disabled = true;
    document.querySelector('#secret-word').value = 'Disabled';

    sock.emit('secret', text);
};

const addButtonListeners = () => {
    ['1', '2', '3', '4', '5'].forEach((id) => {
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

writeEvent('Lambda')

document.querySelector('#chat-form').addEventListener('submit', onFormSubmitted);
document.querySelector('#secret-form').addEventListener('submit', onSecretSubmitted);

addButtonListeners();