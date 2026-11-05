
const timetableForm = document.getElementById("timetableForm");
const timetableResult = document.getElementById("timetableResult");

timetableForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const subjectsInput = document.getElementById("subjects").value;
    const studyHours = Number(document.getElementById("studyHours").value);

    const subjects = subjectsInput
        .split(",")
        .map(subject => subject.trim())
        .filter(subject => subject !== "");

    if (subjects.length === 0 || studyHours < 1 || studyHours > 12) {
        alert("Please enter valid subjects and study hours.");
        return;
    }

    const totalMinutes = studyHours * 60;
    const minutesPerSubject = Math.floor(totalMinutes / subjects.length);

    let timetableHTML = "<h2>Your Daily Study Plan 📚</h2>";

    subjects.forEach((subject, index) => {
        const startMinutes = index * minutesPerSubject;
        const endMinutes = startMinutes + minutesPerSubject;

        timetableHTML += `
            <p>
                <strong>${subject}</strong><br>
                ${formatTime(startMinutes)} - ${formatTime(endMinutes)}
                (${minutesPerSubject} minutes)
            </p>
        `;
    });

    timetableHTML += "<p>🎉 Keep learning and take short breaks!</p>";

    timetableResult.innerHTML = timetableHTML;

    localStorage.setItem("studyTimetable", timetableHTML);
});

function formatTime(minutes) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;

    return String(hour).padStart(2, "0") + ":" +
           String(minute).padStart(2, "0");
}

// Load previously saved timetable
const savedTimetable = localStorage.getItem("studyTimetable");

if (savedTimetable) {
    timetableResult.innerHTML = savedTimetable;
}
