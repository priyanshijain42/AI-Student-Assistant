const attendanceForm = document.getElementById("attendanceForm");
const attendanceResult = document.getElementById("attendanceResult");
const attendanceRecords = document.getElementById("attendanceRecords");

let records = JSON.parse(
    localStorage.getItem("attendanceRecords") || "[]"
);

function displayRecords() {
    attendanceRecords.innerHTML = "";

    records.forEach(function(record) {
        const div = document.createElement("div");
        div.className = "panel";

        div.textContent =
            record.subject + " — " +
            record.attended + "/" +
            record.total + " classes — " +
            record.percentage.toFixed(2) + "%";

        attendanceRecords.appendChild(div);
    });
}

attendanceForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const subject = document.getElementById("subjectName").value.trim();
    const total = Number(document.getElementById("totalClasses").value);
    const attended = Number(document.getElementById("attendedClasses").value);

    if (total <= 0 || attended < 0 || attended > total) {
        attendanceResult.textContent =
            "Please enter valid attendance numbers.";
        return;
    }

    const percentage = (attended / total) * 100;

    const record = {
        subject: subject,
        total: total,
        attended: attended,
        percentage: percentage
    };

    records.push(record);

    localStorage.setItem("attendanceRecords", JSON.stringify(records));

    attendanceResult.textContent =
        "Attendance: " + percentage.toFixed(2) + "% — " +
        (percentage >= 75 ? "Good! You meet the 75% requirement." :
        "Warning! Your attendance is below 75%.");

    displayRecords();
    attendanceForm.reset();
});

displayRecords();
