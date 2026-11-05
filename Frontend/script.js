const demoSubjects = [
  { name: "Java", marks: 82 },
  { name: "Data Mining", marks: 74 },
  { name: "DBMS", marks: 78 },
  { name: "Computer Networks", marks: 69 },
  { name: "Web Technology", marks: 77 }
];

function renderBars() {
  const container = document.getElementById("subjectBars");
  container.innerHTML = demoSubjects.map(subject => `
    <div class="bar-row">
      <span>${subject.name}</span>
      <div class="track"><div class="fill" style="width:${subject.marks}%"></div></div>
      <strong>${subject.marks}%</strong>
    </div>`).join("");
}
renderBars();

document.getElementById("predictionForm").addEventListener("submit", event => {
  event.preventDefault();
  const attendance = Number(document.getElementById("attendance").value);
  const previous = Number(document.getElementById("previous").value);
  const assignment = Number(document.getElementById("assignment").value);
  const internal = Number(document.getElementById("internal").value);
  const hours = Number(document.getElementById("hours").value);

  const values = [attendance, previous, assignment, internal];
  if (values.some(v => !Number.isFinite(v) || v < 0 || v > 100) ||
      !Number.isFinite(hours) || hours < 0 || hours > 16) {
    alert("Please enter valid values within the given ranges.");
    return;
  }

  // Transparent demonstration formula; replace with trained ML model later.
  const estimate = Math.round(Math.min(100, Math.max(0,
    previous * 0.35 + assignment * 0.20 + internal * 0.30 +
    attendance * 0.10 + Math.min(hours, 8) * 0.625
  )));
  const category = estimate >= 80 ? "Excellent" : estimate >= 65 ? "Good" :
                   estimate >= 50 ? "Average" : "Needs improvement";
  const result = document.getElementById("predictionResult");
  result.classList.remove("hidden");
  result.innerHTML = `<strong>${estimate}/100</strong><h3>${category}</h3>
    <p>Focus on regular revision, assignments and consistent attendance.</p>`;
  document.getElementById("attendanceStat").textContent = `${attendance}%`;
  document.getElementById("averageStat").textContent = `${Math.round((previous + assignment + internal) / 3)}%`;
  document.getElementById("hoursStat").textContent = `${hours} hrs`;
});

function assistantReply(question) {
  const q = question.toLowerCase();
  if (q.includes("timetable") || q.includes("study plan") || q.includes("schedule")) {
    return "Suggested daily plan: 1 hour for your hardest subject, 45 minutes for a second subject, 30 minutes for practice questions, and 15 minutes to revise. Take short breaks between sessions.";
  }
  if (q.includes("attendance")) {
    return "To improve attendance, check your subject-wise attendance weekly, attend upcoming classes regularly, and speak to your faculty if you have missed important sessions.";
  }
  if (q.includes("exam") || q.includes("revision")) {
    return "For exam preparation, list all topics, prioritise difficult chapters, practise previous questions, and reserve the final days for revision and mock tests.";
  }
  if (q.includes("weak") || q.includes("improve") || q.includes("marks")) {
    return "Review your recent test results, identify topics where you lost marks, practise those topics, and ask your teacher for feedback. Set a small weekly improvement target.";
  }
  return "I can help with study plans, attendance tips, exam revision and improving marks. Try asking: 'Make me a study plan for exams'.";
}

document.getElementById("chatForm").addEventListener("submit", event => {
  event.preventDefault();
  const input = document.getElementById("chatInput");
  const question = input.value.trim();
  if (!question) return;
  addMessage(question, "user");
  addMessage(assistantReply(question), "bot");
  input.value = "";
});

function addMessage(text, type) {
  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.textContent = text;
  const container = document.getElementById("chatMessages");
  container.appendChild(message);
  container.scrollTop = container.scrollHeight;
}
const studentName = sessionStorage.getItem("studentName");

if (studentName) {
    document.getElementById("welcomeHeading").textContent =
        "Welcome back, " + studentName + " 👋";
}
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        sessionStorage.clear();
        window.location.href = "login.html";
    });
}

// ================= ATTENDANCE API =================

async function loadAttendanceSummary() {

    let email = sessionStorage.getItem("studentEmail")
        || sessionStorage.getItem("email");

    if (!email) {
        email = prompt("Enter your registered student email:");
    }

    if (!email) return;

    try {
        const response = await fetch(
            `http://localhost:8080/api/attendance/summary?email=${encodeURIComponent(email)}`
        );

        if (!response.ok) {
            throw new Error("Attendance data could not be loaded");
        }

        const data = await response.json();

        document.getElementById("attendanceStat").textContent =
            Number(data.attendancePercentage).toFixed(2) + "%";

        console.log("Attendance Summary:", data);

    } catch (error) {
        console.error("Attendance Error:", error);
    }
}

loadAttendanceSummary();
