const predictorForm = document.getElementById("predictorForm");
const predictionResult = document.getElementById("predictionResult");

predictorForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const attendance = Number(document.getElementById("attendance").value);
    const marks = Number(document.getElementById("marks").value);
    const studyHours = Number(document.getElementById("studyHours").value);

    if (
        attendance < 0 || attendance > 100 ||
        marks < 0 || marks > 100 ||
        studyHours < 0 || studyHours > 24
    ) {
        predictionResult.textContent = "Please enter valid values.";
        return;
    }

    // Demo prediction formula
    const studyScore = Math.min(studyHours / 8, 1) * 100;

    const performanceScore =
        (attendance * 0.30) +
        (marks * 0.50) +
        (studyScore * 0.20);

    let prediction;

    if (performanceScore >= 80) {
        prediction = "Excellent Performance 🌟";
    } else if (performanceScore >= 60) {
        prediction = "Good Performance 👍";
    } else if (performanceScore >= 40) {
        prediction = "Average Performance 📚";
    } else {
        prediction = "Needs Improvement 💪";
    }

    predictionResult.innerHTML = `
        <div class="panel">
            <h2>Prediction Result</h2>
            <h1>${performanceScore.toFixed(2)}%</h1>
            <h3>${prediction}</h3>
            <p>Keep studying and improving your attendance!</p>
        </div>
    `;

    localStorage.setItem("performancePrediction", JSON.stringify({
        attendance,
        marks,
        studyHours,
        performanceScore,
        prediction
    }));
});
