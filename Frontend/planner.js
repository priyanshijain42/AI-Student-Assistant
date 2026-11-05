
const plannerForm = document.getElementById("plannerForm");
const taskList = document.getElementById("taskList");

const aiPlanForm = document.getElementById("aiPlanForm");
const aiPlanResult = document.getElementById("aiPlanResult");

const savePlanBtn = document.getElementById("savePlanBtn");
const savedPlans = document.getElementById("savedPlans");

const email = sessionStorage.getItem("studentEmail");

let currentStudyPlan = "";

// Check login
if (!email) {
    console.warn("Student is not logged in.");
}

// Generate AI Study Plan
aiPlanForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    if (!email) {
        alert("Please login first.");
        return;
    }

    aiPlanResult.textContent = "AI is creating your study plan. Please wait...";

    const requestData = {
        studentEmail: email,
        subjects: document.getElementById("aiSubjects").value.trim(),
        hoursPerDay: Number(document.getElementById("aiHours").value),
        days: Number(document.getElementById("aiDays").value)
    };

    try {
        const response = await fetch(
            "http://localhost:8080/api/planner/generate",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData)
            }
        );

        if (!response.ok) {
            throw new Error("AI plan generation failed");
        }

        const data = await response.json();

        currentStudyPlan = data.studyPlan;

        let cleanPlan = currentStudyPlan
            .replace(/\r\n/g, "\n")
            .replace(/Day\s+(\d+):/g, "\n## Day $1")
            .replace(/^\s*-\s*/gm, "- ");

        aiPlanResult.innerHTML = marked.parse(cleanPlan);

    } catch (error) {
        console.error("AI Plan Error:", error);
        aiPlanResult.textContent =
            "Unable to generate AI plan. Please check backend and Ollama.";
    }
});


// Save AI Study Plan
savePlanBtn.addEventListener("click", async function() {

    if (!email) {
        alert("Please login first.");
        return;
    }

    if (!currentStudyPlan) {
        alert("Please generate a study plan first.");
        return;
    }

    const planData = {
        studentEmail: email,
        subjects: document.getElementById("aiSubjects").value,
        hoursPerDay: Number(document.getElementById("aiHours").value),
        days: Number(document.getElementById("aiDays").value),
        planText: currentStudyPlan
    };

    try {
        const response = await fetch(
            "http://localhost:8080/api/study-plans/save",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(planData)
            }
        );

        if (!response.ok) {
            throw new Error("Unable to save study plan");
        }

        alert("Study plan saved successfully!");
        loadSavedPlans();

    } catch (error) {
        console.error("Save Plan Error:", error);
        alert("Unable to save study plan. Please check backend.");
    }
});


// Load Saved Study Plans
async function loadSavedPlans() {

    if (!email) {
        savedPlans.textContent = "Please login first.";
        return;
    }

    savedPlans.innerHTML = "<h3>📚 My Saved Study Plans</h3><p>Loading saved plans...</p>";

    try {
        const response = await fetch(
            "http://localhost:8080/api/study-plans/" +
            encodeURIComponent(email)
        );

        if (!response.ok) {
            throw new Error("Unable to load saved plans");
        }

        const plans = await response.json();

        savedPlans.innerHTML = "<h3>📚 My Saved Study Plans</h3>";

        if (plans.length === 0) {
            savedPlans.innerHTML += "<p>No saved study plans yet.</p>";
            return;
        }

        plans.forEach(function(plan) {

            const item = document.createElement("div");
            item.className = "panel";
            item.style.marginTop = "12px";

            const heading = document.createElement("h3");
            heading.textContent = plan.subjects;

            const details = document.createElement("p");
            details.textContent =
                plan.days + " days | " +
                plan.hoursPerDay + " hours per day";

            const date = document.createElement("p");
            date.textContent = "Saved: " + plan.createdAt;

            const content = document.createElement("div");
            content.innerHTML = marked.parse(plan.planText || "");

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "🗑️ Delete Study Plan";

            deleteBtn.addEventListener("click", async function() {

                if (!confirm("Are you sure you want to delete this study plan?")) {
                    return;
                }

                try {
                    const deleteResponse = await fetch(
                        "http://localhost:8080/api/study-plans/delete/" + plan.id,
                        {
                            method: "DELETE"
                        }
                    );

                    if (!deleteResponse.ok) {
                        throw new Error("Unable to delete study plan");
                    }

                    alert("Study plan deleted successfully!");
                    loadSavedPlans();

                } catch (error) {
                    console.error("Delete Plan Error:", error);
                    alert("Unable to delete study plan.");
                }
            });

            item.append(heading, details, date, content, deleteBtn);
            savedPlans.appendChild(item);
        });

    } catch (error) {
        console.error("Load Plans Error:", error);
        savedPlans.innerHTML =
            "<h3>📚 My Saved Study Plans</h3><p>Unable to load saved plans. Please check backend.</p>";
    }
}


// Load Study Tasks
async function loadTasks() {

    if (!email) {
        taskList.textContent = "Please login first.";
        return;
    }

    taskList.textContent = "Loading tasks...";

    try {
        const response = await fetch(
            "http://localhost:8080/api/planner/" +
            encodeURIComponent(email)
        );

        if (!response.ok) {
            throw new Error("Unable to load tasks. Status: " + response.status);
        }

        const tasks = await response.json();

        taskList.innerHTML = "";

        if (tasks.length === 0) {
            taskList.textContent = "No study tasks added yet.";
            return;
        }

        tasks.forEach(function(task) {

            const item = document.createElement("div");
            item.className = "panel";
            item.style.marginTop = "12px";

            const title = document.createElement("h3");
            title.textContent = task.subject;

            const description = document.createElement("p");
            description.textContent = task.task;

            const date = document.createElement("p");
            date.textContent = "Date: " + task.studyDate;

            const status = document.createElement("p");
            status.textContent = task.completed
                ? "Completed ✅"
                : "Pending ⏳";

            item.append(title, description, date, status);

            if (!task.completed) {

                const completeBtn = document.createElement("button");
                completeBtn.textContent = "Mark Completed";

                completeBtn.addEventListener("click", async function() {

                    try {
                        const completeResponse = await fetch(
                            "http://localhost:8080/api/planner/complete/" +
                            task.id + "?completed=true",
                            {
                                method: "PUT"
                            }
                        );

                        if (!completeResponse.ok) {
                            throw new Error("Unable to complete task");
                        }

                        loadTasks();

                    } catch (error) {
                        console.error("Complete Task Error:", error);
                        alert("Unable to mark task completed.");
                    }
                });

                item.appendChild(completeBtn);
            }

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete Task";

            deleteBtn.addEventListener("click", async function() {

                if (!confirm("Are you sure you want to delete this task?")) {
                    return;
                }

                try {
                    const deleteResponse = await fetch(
                        "http://localhost:8080/api/planner/" + task.id,
                        {
                            method: "DELETE"
                        }
                    );

                    if (!deleteResponse.ok) {
                        throw new Error("Unable to delete task");
                    }

                    loadTasks();

                } catch (error) {
                    console.error("Delete Task Error:", error);
                    alert("Unable to delete task.");
                }
            });

            item.appendChild(deleteBtn);
            taskList.appendChild(item);
        });

    } catch (error) {
        console.error("Load Tasks Error:", error);
        taskList.textContent =
            "Unable to load tasks. Please check backend.";
    }
}


// Add Study Task
plannerForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    if (!email) {
        alert("Please login first.");
        return;
    }

    const taskData = {
        studentEmail: email,
        subject: document.getElementById("subject").value.trim(),
        task: document.getElementById("task").value.trim(),
        studyDate: document.getElementById("studyDate").value
    };

    console.log("Selected Study Date:", taskData.studyDate);

    if (!taskData.studyDate) {
        alert("Please select a study date.");
        return;
    }

    try {
        const response = await fetch(
            "http://localhost:8080/api/planner/add",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(taskData)
            }
        );

        if (!response.ok) {
            throw new Error("Unable to add task. Status: " + response.status);
        }

        alert("Study task added successfully!");

        plannerForm.reset();
        loadTasks();

    } catch (error) {
        console.error("Add Task Error:", error);
        alert("Unable to add task. Please check backend.");
    }
});


// Load data when page opens
loadTasks();
loadSavedPlans();
