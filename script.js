// script.js

document.addEventListener('DOMContentLoaded', function() {
    // --- Date and Time Update ---
    const dateElement = document.getElementById('current-date');
    const timeElement = document.getElementById('current-time');
    const yearElement = document.getElementById('current-year');

    function updateDateTime() {
        const now = new Date();
        const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
        const optionsTime = { hour: 'numeric', minute: '2-digit', hour12: true };
        
        // For a 19th-century feel, you might want to manually set or fetch historical data.
        // This uses the current date/time for demonstration.
        // dateElement.textContent = 'DATE: ' + now.toLocaleDateString('en-US', optionsDate).toUpperCase();
        // timeElement.textContent = 'TIME: ' + now.toLocaleTimeString('en-US', optionsTime);
        // For placeholder:
        // dateElement.textContent = 'DATE: May 9, 1888'; 
        // timeElement.textContent = 'TIME: High Noon';
        
        if (yearElement) {
            yearElement.textContent = now.getFullYear(); // Update copyright year dynamically
        }
    }
    updateDateTime(); // Initial call
    // setInterval(updateDateTime, 60000); // Update every minute - not really needed for a "daily"

    // --- Placeholder API Data (Simulated) ---
    // In a real scenario, you'd fetch from actual APIs.
    // Example for news ticker (you might want to duplicate content for seamless scroll)
    const tickerContent = document.querySelector('.ticker-content span');
    if (tickerContent) {
        // const originalText = tickerContent.textContent;
        // tickerContent.textContent += originalText; // Duplicate for smoother looping with CSS animation
        // (Better ticker logic might be needed for perfect seamlessness depending on content length)
    }

    // --- Tic-Tac-Toe Game Logic ---
    const cells = document.querySelectorAll('.cell');
    const gameStatus = document.getElementById('game-status');
    const resetButton = document.getElementById('reset-game');
    let currentPlayer = 'X';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (boardState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        boardState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        
        checkResult();
    }

    function checkResult() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = boardState[winCondition[0]];
            let b = boardState[winCondition[1]];
            let c = boardState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            gameStatus.textContent = `Player ${currentPlayer} Wins! Hooray!`;
            gameActive = false;
            return;
        }

        if (!boardState.includes('')) {
            gameStatus.textContent = 'It\'s a Draw, Pardner!';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
    }

    function resetGame() {
        boardState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
        cells.forEach(cell => cell.textContent = '');
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);

});