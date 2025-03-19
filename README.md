🪓 Save The Man – Hangman Game

A modern and responsive implementation of the classic Hangman game.
Guess the hidden word before the man is fully drawn!

    ✅ Live Demo: Save The Man

🚀 How to Run the Game

    Clone the repository:

git clone https://github.com/AndrewDul/Save-the-Man-Game.git

    Navigate to the project folder:

cd Save-the-Man-Game

    Open index.html in your browser or use Live Server (if using VSCode):

code .

📂 Project Structure

```bash
Save-the-Man-Game/
├── img/                # Gallows images for game progress
│   ├── s0.jpg
│   ├── s1.jpg
│   ├── s2.jpg
│   └── ...
├── index.html          # Main HTML file
├── style.css           # Styling file (modern dark theme)
├── Hangman.js          # JavaScript logic for game functionality
├── yes.wav             # Correct answer sound
├── no.wav              # Incorrect answer sound
└── README.md           # Project documentation
```

🎯 Game Logic
✅ Objective

    The goal of the game is to guess the hidden word before the man is completely drawn.

✅ Game Rules

    Players take turns guessing letters or the whole word.
    Correct letter guesses award 5 points and allow the player to continue their turn.
    Correct whole word guesses award 10 points and end the game.
    Incorrect guesses increase the gallows state and pass the turn to the next player.
    The game ends when:
        The word is guessed correctly.
        The player makes 9 incorrect guesses (resulting in the man being hanged).

🧠 Game Logic – Code Overview

1. Game Initialization

   The game initializes when the page loads or after pressing "Continue" after a game.
   A random word is selected based on the chosen category.
   The word is hidden and represented as underscores (\_).

2. Category Selection

   Players can select a specific category or choose "All Categories."
   The game will select a random word from the chosen category.

3. Guessing a Letter

   The player can guess one letter at a time.
   If the letter exists in the word, it is revealed in the correct position(s).
   If the letter does not exist, the gallows progress increases by 1 step.

4. Guessing the Whole Word

   If the player guesses the word correctly, they win the game.
   If the guess is incorrect, the gallows progress increases by 1 step.

5. End of Game

   If the player guesses all letters correctly, they win.
   If the gallows reaches the final state, the player loses.
   The player can restart the game using the "Continue" button.

🌟 Features

✔️ Clean and modern dark theme
✔️ Fully responsive (works on mobile and desktop)
✔️ Custom category selection
✔️ Real-time scoring
✔️ Realistic sound effects
✔️ Random word generation using Fisher-Yates algorithm
✔️ Multi-player support
✔️ Smooth UI transitions
🎮 Controls
Action Key/Button
Guess a letter Click a letter
Guess the whole word Type the word and press "Submit"
Start new game Click "Continue"
Change category Select category from dropdown
🛠️ Technologies Used

    HTML5 – Structure and UI
    CSS3 – Styling and responsiveness
    JavaScript – Game logic and interactivity

🏆 Challenges & Solutions
❌ Problem: Incorrect category assignment

Solution: Fixed category identification logic to work correctly within the selected context.
❌ Problem: Random word repetition

Solution: Added a shuffle algorithm and stored used words to prevent repetition.
❌ Problem: Incorrect player switch after wrong guess

Solution: Improved player switching logic to ensure fairness.
🚀 Future Improvements

    Add more categories
    Allow custom word lists
    Add multiplayer mode with more players
    Save high scores to local storage

🤝 Contributing

Feel free to contribute!

    Fork the repo
    Create a new branch (git checkout -b feature/your-feature)
    Commit your changes (git commit -m "Add your feature")
    Push to your branch (git push origin feature/your-feature)
    Create a new Pull Request

📄 License

This project is licensed under the MIT License – feel free to modify and distribute!
