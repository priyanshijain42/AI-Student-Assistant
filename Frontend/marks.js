const marksForm = document.getElementById("marksForm");
const marksResult = document.getElementById("marksResult");
const marksRecords = document.getElementById("marksRecords");

let records = JSON.parse(
    localStorage.getItem("marksRecords") || "[]"
);

function displayMarks() {
    marksRecords.innerHTML = "";

    records.forEach(function(record) {
        const div = document.createElement("div");
        div.className = "panel";

        div.textContent =
            record.subject + " — " +
            record.obtained + "/" +
            record.total + " marks — " +
            record.percentage.toFixed(2) + "%";

        marksRecords.appendChild(div);
    });
}

marksForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const subject = document.getElementById("subjectName").value.trim();
    const obtained = Number(document.getElementById("obtainedMarks").value);
    const total = Number(document.getElementById("totalMarks").value);

    if (total <= 0 || obtained < 0 || obtained > total) {
        marksResult.textContent = "Please enter valid marks.";
        return;
    }

    const percentage = (obtained / total) * 100;

    const record = {
        subject: subject,
        obtained: obtained,
        total: total,
        percentage: percentage
    };

    records.push(record);

    localStorage.setItem("marksRecords", JSON.stringify(records));

    marksResult.textContent =
        "Your percentage is " + percentage.toFixed(2) + "%";

    displayMarks();
    marksForm.reset();
});

displayMarks();
