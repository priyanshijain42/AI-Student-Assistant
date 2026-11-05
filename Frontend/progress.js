
const progressForm = document.getElementById("progressForm");
const progressResult = document.getElementById("progressResult");

// Load saved progress
let studyRecords = JSON.parse(
    localStorage.getItem("studyProgress")
) || [];

function displayProgress() {
    const totalHours = studyRecords.reduce(
        (sum, record) => sum + record.hours, 0
    );

    const totalTasks = studyRecords.reduce(
        (sum, record) => sum + record.tasks, 0
    );

    let html = `
        <h2>📊 My Study Progress</h2>
        <h3>Total Study Hours: ${totalHours}</h3>
        <h3>Completed Tasks: ${totalTasks}</h3>
        <h3>Days Recorded: ${studyRecords.length}</h3>
        <hr>
        <h3>Daily History</h3>
    `;

    if (studyRecords.length === 0) {
        html += "<p>No progress recorded yet.</p>";
    }

    studyRecords.slice().reverse().forEach(record => {
        html += `
            <p>
                📅 ${record.date}<br>
                Study Hours: ${record.hours}<br>
                Completed Tasks: ${record.tasks}
            </p>
            <hr>
        `;
    });

    progressResult.innerHTML = html;
}

progressForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const hours = Number(document.getElementById("hours").value);
    const tasks = Number(document.getElementById("tasks").value);

    if (
        !Number.isFinite(hours) ||
        !Number.isFinite(tasks) ||
        hours < 0 || hours > 24 ||
        tasks < 0 ||
        !Number.isInteger(tasks)
    ) {
        alert("Please enter valid study hours and completed tasks.");
        return;
    }

    const today = new Date().toLocaleDateString("en-IN");

    studyRecords.push({
        date: today,
        hours: hours,
        tasks: tasks
    });

    localStorage.setItem(
        "studyProgress",
        JSON.stringify(studyRecords)
    );

    displayProgress();
    progressForm.reset();

    alert("Your study progress has been saved successfully! 🎉");
});

displayProgress();
