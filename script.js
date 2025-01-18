const buttons = {
    rock: document.querySelector('#rock'),
    paper: document.querySelector('#paper'),
    scissors: document.querySelector('#scissors')
};

const computerButtons = {
    rock: document.querySelector('#rockC'),
    paper: document.querySelector('#paperC'),
    scissors: document.querySelector('#scissorsC')
};

const result = document.querySelector('#result');

const life = document.querySelector('#life');

const lifes = {
  img1:  document.createElement('img'),
  img2: document.createElement('img'),
  img3:  document.createElement('img'),
}
const lifeC = document.querySelector('#lifeC');

Object.values(lifes).forEach(item => {
    let clone;
    item.src = "life.png";
    item.width = 30;
    item.style.paddingRight = "5px";
    life.appendChild(item);
    clone = item.cloneNode(true);
    lifeC.appendChild(clone);
});

const buttonPresses = {
    rock: -1,
    paper: -1,
    scissors: -1
};

const winConditions = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
};

let computerChoices = ['rock', 'paper', 'scissors'];

function computerPlays(){
    let i = Math.floor(Math.random() * computerChoices.length);
    computerChoices.splice(i, 1);
    return computerChoices;
}

function displayComputerChoices(computerChoices){
    // Reset the colors of the computer buttons
    let option;
    Object.keys(computerButtons).forEach(choice => {
        computerButtons[choice].style.backgroundColor = "";
    });
    computerChoices.forEach(choice => {
        computerButtons[choice].style.backgroundColor = "green";
        option = choice;
    });
    return option;
}

function playRound(humanChoice, computerChoice){
    let outcome;
    if (humanChoice === computerChoice) {
        outcome = "tie";
    } else if (winConditions[humanChoice] === computerChoice) {
        outcome = "win";
    } else {
        outcome = "lose";
    }
    result.textContent = outcome;
    return outcome;
}

let stage = 0;
let sum = 0;

function handleStage() {
    switch (stage) {
        case 0:
            // applies event listener to each button
            Object.keys(buttons).forEach(choice => {
                buttons[choice].addEventListener('click', stage0Handler);
            });
            break;

        case 1:
            // applies event listener to each button
            Object.keys(buttons).forEach(choice => {
                buttons[choice].removeEventListener('click', stage0Handler); // Remove stage 0 event listeners
                buttons[choice].addEventListener('click', stage1Handler);
            });
            break;
    }
}

function stage0Handler(event) {
    const choice = event.target.id;
    // toggles the value of the button press
    buttonPresses[choice] *= -1;
    if (buttonPresses[choice] == 1) {
        buttons[choice].style.backgroundColor = "green";
    } else {
        buttons[choice].style.backgroundColor = "";
    }

    sum = 0;
    Object.keys(buttons).forEach(choice => {
        sum += buttonPresses[choice];
    });
    if (sum == 1) {
        computerChoices = computerPlays();
        displayComputerChoices(computerChoices);
        stage = 1;
        handleStage(); // Re-evaluate the stage
    }
}

function stage1Handler(event) {
    const choice = event.target.id;
    buttons[choice].style.backgroundColor = "";
    buttonPresses[choice] *= -1;

    sum = 0;
    Object.keys(buttons).forEach(choice => {
        sum += buttonPresses[choice];
    }); console.log(sum);

    if (sum == -1) {
        computerChoices = computerPlays();
        let computerChoice = displayComputerChoices(computerChoices);
        let humanChoice = Object.keys(buttonPresses).find(key => buttonPresses[key] === 1);
        let result = playRound(humanChoice, computerChoice);
        if (result === "win"){
            lifeC.removeChild(lifeC.lastChild);
        }
        else if(result === "lose"){
            life.removeChild(life.lastChild);
        }
        
        
    }
    if (sum == -3) {
        console.log("checking");


        reset();
        stage = 0;
        handleStage(); // Re-evaluate the stage
        
    }
}

// Initial call to handle the stage
handleStage();

function reset(){

    if (!life.hasChildNodes()) {
        result.textContent = "GAME OVER YOU LOSE";
        return;
    } 
    else if (!lifeC.hasChildNodes()) {
        result.textContent = "GAME OVER YOU WIN";
        return;
    }
    
    computerChoices = ['rock', 'paper', 'scissors'];
    Object.keys(computerButtons).forEach(choice => {
        computerButtons[choice].style.backgroundColor = "";
    })
    Object.keys(buttons).forEach(choice => {
        buttons[choice].style.backgroundColor = "";
    });
    Object.keys(buttons).forEach(choice => {
        buttons[choice].removeEventListener('click', stage1Handler);
    });

    result.textContent = "";

}
