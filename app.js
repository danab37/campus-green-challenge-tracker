console.log("Green Habit Tracker loaded");


const habits = document.querySelectorAll(".habit");
const scoreDisplay = document.getElementById("score");
const resetBtn = document.getElementById("resetBtn");

let totalScore = 0;

// Load saved data
window.onload = function () {
    const savedScore = localStorage.getItem("greenScore");
    const savedChecks = JSON.parse(localStorage.getItem("greenChecks"));

    if (savedScore) {
        totalScore = parseInt(savedScore);
        scoreDisplay.textContent = totalScore;
    }

    if (savedChecks) {
        habits.forEach((habit, index) => {
            habit.checked = savedChecks[index];
        });
    }
};

// Update score when checkbox changes
habits.forEach((habit) => {
    habit.addEventListener("change", function () {
        if (this.checked) {
            totalScore += parseInt(this.value);
        } else {
            totalScore -= parseInt(this.value);
        }

        scoreDisplay.textContent = totalScore;

        saveProgress();
    });
});

// Save progress
function saveProgress() {
    localStorage.setItem("greenScore", totalScore);

    const checkStates = [];
    habits.forEach((habit) => {
        checkStates.push(habit.checked);
    });

    localStorage.setItem("greenChecks", JSON.stringify(checkStates));
}

// Reset button
resetBtn.addEventListener("click", function () {
    totalScore = 0;
    scoreDisplay.textContent = totalScore;

    habits.forEach((habit) => {
        habit.checked = false;
    });

    localStorage.removeItem("greenScore");
    localStorage.removeItem("greenChecks");
});
