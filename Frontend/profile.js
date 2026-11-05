const profileForm = document.getElementById("profileForm");

const studentName = sessionStorage.getItem("studentName");

if (!studentName) {
    alert("Please login first!");
    window.location.href = "login.html";
} else {
    let savedUser = null;

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const data = JSON.parse(localStorage.getItem(key));

        if (data && data.name === studentName) {
            savedUser = data;
            break;
        }
    }

    if (savedUser) {
        document.getElementById("profileName").value = savedUser.name;
        document.getElementById("profileEmail").value = savedUser.email;
        document.getElementById("profileCourse").value =
            savedUser.course || "MCA";
        document.getElementById("profileSemester").value =
            savedUser.semester || "3rd Semester";
    }

    profileForm.addEventListener("submit", function(event) {
        event.preventDefault();

        if (!savedUser) {
            alert("Student account not found!");
            return;
        }

        savedUser.name = document.getElementById("profileName").value.trim();
        savedUser.course = document.getElementById("profileCourse").value.trim();
        savedUser.semester = document.getElementById("profileSemester").value.trim();

        localStorage.setItem(savedUser.email, JSON.stringify(savedUser));
        sessionStorage.setItem("studentName", savedUser.name);

        document.getElementById("profileMessage").textContent =
            "Profile updated successfully! ❤️";
    });
}
