
// Get saved marks and attendance records
const marksRecords = JSON.parse(
    localStorage.getItem("marksRecords")
) || [];

const attendanceRecords = JSON.parse(
    localStorage.getItem("attendanceRecords")
) || [];

// Prepare marks chart data
const subjects = marksRecords.map(record => record.subject);
const marks = marksRecords.map(record => Number(record.marks));

// Prepare attendance chart data
const attendanceLabels = attendanceRecords.map(
    (record, index) => "Record " + (index + 1)
);

const attendanceValues = attendanceRecords.map(
    record => Number(record.percentage)
);

// Marks Chart
const marksCanvas = document.getElementById("marksChart");

if (subjects.length > 0) {
    new Chart(marksCanvas, {
        type: "bar",
        data: {
            labels: subjects,
            datasets: [{
                label: "Marks Obtained",
                data: marks
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
} else {
    marksCanvas.insertAdjacentHTML(
        "afterend",
        "<p>No marks records found. Add marks first.</p>"
    );
}

// Attendance Chart
const attendanceCanvas = document.getElementById("attendanceChart");

if (attendanceValues.length > 0) {
    new Chart(attendanceCanvas, {
        type: "line",
        data: {
            labels: attendanceLabels,
            datasets: [{
                label: "Attendance Percentage",
                data: attendanceValues,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
} else {
    attendanceCanvas.insertAdjacentHTML(
        "afterend",
        "<p>No attendance records found. Add attendance first.</p>"
    );
}
