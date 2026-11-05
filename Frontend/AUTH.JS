
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

function showLogin(event) {
    event.preventDefault();
    registerForm.style.display = "none";
    loginForm.style.display = "grid";
    message.textContent = "Login to your account";
}

registerForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const user = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim().toLowerCase(),
        password: document.getElementById("password").value
    };

    if (localStorage.getItem(user.email)) {
        message.textContent = "Account already exists!";
        return;
    }

    localStorage.setItem(user.email, JSON.stringify(user));

    message.textContent = "Registration successful! Now login.";
    registerForm.reset();
    showLogin(new Event("click"));
});

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    const savedUser = localStorage.getItem(email);

    if (!savedUser) {
        message.textContent = "Account not found. Please register.";
        return;
    }

    const user = JSON.parse(savedUser);

    if (user.password !== password) {
        message.textContent = "Incorrect password!";
        return;
    }

    sessionStorage.setItem("studentName", user.name);
sessionStorage.setItem("studentEmail", email);

window.location.href = "index.html";
});
