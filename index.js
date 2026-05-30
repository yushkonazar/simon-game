const list = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let playerPattern = [];
let start = false;
let level = 0;

const keyMap = {
    "w": "green",
    "a": "red",
    "s": "yellow",
    "d": "blue"
};

document.addEventListener("keydown", (e) => {
    const keyPressed = e.key.toLowerCase();
    if (!start){
        start = true;
        nextStep();
    } else {
        if (keyMap[keyPressed]){
            const colorChoice = keyMap[keyPressed];
            choice(colorChoice);
    }
}});

document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function() {
        if (!start) {
            start = true;
            nextStep();
            return;
        }

        const playerChoice = this.id;
        choice(playerChoice);
    })
});

function nextStep(){
    playerPattern = [];
    level++;
    document.querySelector("#level-title").textContent = `Level ${level}`;

    const randomNumber = Math.floor((Math.random() * 4));
    const randomColorChoice = list[randomNumber];

    gamePattern.push(randomColorChoice);
    playSound(randomColorChoice);
    animatePress(randomColorChoice);
}

function checkAnswer(currentLevel){
    if (playerPattern[currentLevel] === gamePattern[currentLevel]){
        if (playerPattern.length === gamePattern.length) {
            setTimeout(nextStep, 1000);
        } 
    } else {
            playSound("wrong");
            const body = document.body.classList;
            body.add("game-over");
            setTimeout(() => {body.remove("game-over")}, 400);

            document.querySelector("#level-title").textContent = `Game over. Press Any Key to Restart`;
            gameOver();
        }
}

function playSound(name){
    const audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
}

function animatePress(color){
    const btn = document.querySelector(`.${color}`);
    btn.classList.add("pressed");
    setTimeout(() => {btn.classList.remove("pressed")}, 100);
}

function gameOver(){
    level = 0;
    gamePattern = [];
    start = false;
}

function choice(choice){
        playerPattern.push(choice);
        playSound(choice);
        animatePress(choice);
        checkAnswer(playerPattern.length - 1);
}
