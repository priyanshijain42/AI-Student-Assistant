
const marksRecords = JSON.parse(
    localStorage.getItem("marksRecords")
) || [];

const attendanceRecords = JSON.parse(
    localStorage.getItem("attendanceRecords")
) || [];

const studyRecords = JSON.parse(
    localStorage.getItem("studyProgress")
) || [];

const registeredUsers = Object.keys(localStorage)
    .filter(key => key.startsWith("user_"));

document.getElementById("totalMarks").textContent =
    marksRecords.length;

document.getElementById("totalAttendance").textContent =
    attendanceRecords.length;

document.getElementById("totalProgress").textContent =
    studyRecords.length;

// Display Marks
const marksList = document.getElementById("marksList");

if (marksRecords.length > 0) {
    marksList.innerHTML = "";

    marksRecords.forEach(record => {
        marksList.innerHTML += `
            <p>
                Subject: ${record.subject || "Not available"}<br>
                Marks: ${record.marks || 0}
            </p>
            <hr>
        `;
    });
}

// Display Attendance
const attendanceList = document.getElementById("attendanceList");

if (attendanceRecords.length > 0) {
    attendanceList.innerHTML = "";

    attendanceRecords.forEach(record => {
        attendanceList.innerHTML += `
            <p>
                Attendance: ${record.percentage || 0}%<br>
                Present: ${record.present || 0}<br>
                Total Classes: ${record.total || 0}
            </p>
            <hr>
        `;
    });
}

// Display Study Progress
const progressList = document.getElementById("progressList");

if (studyRecords.length > 0) {
    progressList.innerHTML = "";

    studyRecords.forEach(record => {
        progressList.innerHTML += `
            <p>
                Date: ${record.date}<br>
                Study Hours: ${record.hours}<br>
                Completed Tasks: ${record.tasks}
            </p>
            <hr>
        `;
    });
}
