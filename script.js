const buttons = {
    rock: document.querySelector('#rock'),
    paper: document.querySelector('#paper'),
    scissors: document.querySelector('#scissors')
};

const computerButtons = {
    rock: document.querySelector('#rockC'),
    paper: document.querySelector('#paperC'),
    scissors: document.querySelector('#scissorsC')
    }

const result = document.querySelector('#result');

const buttonPresses = {
    rock: -1,
    paper: -1,
    scissors: -1
}

const winConditions = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
}



let computerChoices = ['rock', 'paper', 'scissors'];

function computerPlays(){
    let i = Math.floor(Math.random()*computerChoices.length);
    computerChoices.splice(i, 1);
    return computerChoices;
}

function displayComputerChoices(computerChoices){
    computerChoices.forEach(choice => {
        computerButtons[choice].style.backgroundColor = "green";
    });
}

let stage = 0;

switch (stage){
    case 0:
    // applies event listener to each button
    Object.keys(buttons).forEach(choice => {
        console.log(buttonPresses[choice]);
        buttons[choice].addEventListener('click', () => {

            console.log('clicked', choice);
            // toggles the value of the button press
            buttonPresses[choice] *= -1;
            if (buttonPresses[choice] == 1){
                buttons[choice].style.backgroundColor = "green";
            }
            else{
                buttons[choice].style.backgroundColor = "";
            }

            let sum = 0;

            Object.keys(buttons).forEach(choice => {
                sum += buttonPresses[choice];
                console.log(choice + " " + buttonPresses[choice]);
                console.log(sum);
            } );
            if (sum == 1){
                computerChoices = computerPlays();
                displayComputerChoices(computerChoices);
                stage = 1;
            };
            
           
        })
    });
    break;

    case 1:
        // applies event listener to each button
        Object.keys(buttons).forEach(choice => {
            console.log('game on')
        })


}
