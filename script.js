const equationContainer = document.getElementById("equation-container");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const levelDisplay = document.getElementById("level");
const bus = document.getElementById("bus");
const feedback = document.getElementById("feedback");
const resultsArea = document.getElementById("results-area");
const finalScoreDisplay = document.getElementById("final-score-display");

let score = 0;
let level = 1;
let timeLeft = 60;
let gameActive = true;
let timerInterval;

const priority = { "/": 4, "*": 3, "+": 2, "-": 1 };

function initGame() {
    // Reset Data
    score = 0;
    level = 1;
    timeLeft = 60;
    gameActive = true;
    
    // Reset UI
    scoreDisplay.innerText = score;
    timerDisplay.innerText = timeLeft;
    levelDisplay.innerText = level;
    feedback.innerText = "";
    resultsArea.classList.add("hidden");
    equationContainer.classList.remove("disabled");
    document.getElementById('php-response').innerHTML = "";
    
    // Start Again
    startTimer();
    generateEquation();
    setTimeout(() => bus.classList.add("arrived"), 100);
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
        if (timeLeft <= 0) endGame();
    }, 1000);
}

function generateEquation() {
    if (!gameActive) return;
    const ops = ["+", "-", "*", "/"];
    const opCount = level > 3 ? 3 : 2; // Harder as level increases
    let tokens = [];

    for (let i = 0; i < opCount + 1; i++) {
        tokens.push({ type: "num", val: Math.floor(Math.random() * 9) + 1 });
        if (i < opCount) {
            tokens.push({ type: "op", val: ops[Math.floor(Math.random() * ops.length)] });
        }
    }
    render(tokens);
}

function render(tokens) {
    equationContainer.innerHTML = "";
    tokens.forEach((t, index) => {
        const div = document.createElement("div");
        div.className = `token ${t.type}`;
        div.innerText = t.val;
        if (t.type === "op") {
            div.onclick = () => handleChoice(index, tokens);
        }
        equationContainer.appendChild(div);
    });
}

function handleChoice(clickedIndex, tokens) {
    if (!gameActive) return;
    
    const clickedOp = tokens[clickedIndex].val;
    // Calculate the highest priority currently available on the board
    let maxPrio = Math.max(...tokens.filter(t => t.type === 'op').map(t => priority[t.val]));

    if (priority[clickedOp] === maxPrio) {
        // SUCCESS
        feedback.innerText = "Correct! Boarding...";
        feedback.style.color = "green";
        score += 10;
        scoreDisplay.innerText = score;
        
        // Animation
        bus.classList.remove("arrived");
        bus.classList.add("departing");

        setTimeout(() => {
            if (score % 30 === 0) level++; // Level up every 3 correct answers
            levelDisplay.innerText = level;
            bus.classList.remove("departing");
            generateEquation();
            setTimeout(() => bus.classList.add("arrived"), 50);
        }, 800);
    } else {
        feedback.innerText = "Wrong order! Follow BODMAS.";
        feedback.style.color = "red";
    }
}

function endGame() {
    gameActive = false;
    clearInterval(timerInterval);
    
    // UI Game Over State
    finalScoreDisplay.innerText = score;
    resultsArea.classList.remove("hidden");
    equationContainer.classList.add("disabled");
    feedback.innerText = "Game Over!";
    
    // SEND SCORE TO PHP BACKEND VIA POST
    const formData = new FormData();
    formData.append('final_score', score);

    fetch('index.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('php-response').innerHTML = data;
    })
    .catch(err => console.error("PHP Server Error:", err));
}

function resetGame() {
    initGame();
}


initGame();
