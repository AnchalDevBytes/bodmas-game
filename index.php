 <!-- PHP Backend Handler -->
<?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['final_score'])) {
        $score = intval($_POST['final_score']);
        echo "<div class='php-notice'>✅ Server Recorded Final Score: $score</div>";
        exit;
    }
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BODMAS Bus Jam | Math Learning Game</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div id="game-container">
        <header class="game-header">
            <h1>BODMAS Bus Jam 🚌</h1>
            <div class="stats">
                <div class="stat-box">Score: <span id="score">0</span></div>
                <div class="stat-box">Time: <span id="timer">60</span>s</div>
                <div class="stat-box">Level: <span id="level">1</span></div>
            </div>
        </header>

        <div class="road-area">
            <div class="bus-stop">
                <div class="bus" id="bus">
                    <div class="window"></div><div class="window"></div>
                    <span class="bus-label">BODMAS</span>
                </div>
            </div>
        </div>

        <!-- Game Board -->
        <div id="equation-container" class="equation-display"></div>
        <div id="feedback" class="feedback-message"></div>

        <!-- Inline Results (Visible only when game ends) -->
        <div id="results-area" class="hidden">
            <hr>
            <h2>Time's Up! 🏁</h2>
            <p class="final-score-text">Final Score: <span id="final-score-display">0</span></p>
            <div id="php-response"></div>
            <button class="restart-btn" onclick="resetGame()">Restart Game</button>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>