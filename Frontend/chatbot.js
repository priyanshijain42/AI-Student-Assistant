
const chatForm = document.getElementById("chatForm");
const userQuestion = document.getElementById("userQuestion");
const chatMessages = document.getElementById("chatMessages");

chatForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const question = userQuestion.value.trim();

    if (!question) return;

    const userMessage = document.createElement("p");
    userMessage.textContent = "You: " + question;
    chatMessages.appendChild(userMessage);

    const botMessage = document.createElement("p");
    botMessage.textContent = "Study Assistant: Thinking...";
    chatMessages.appendChild(botMessage);

    userQuestion.value = "";
    userQuestion.disabled = true;

    try {
        const response = await fetch(
            "http://localhost:8080/api/chatbot/ask",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
              body: JSON.stringify({
    question: question,
    email: sessionStorage.getItem("studentEmail")
})  
            }
        );

        if (!response.ok) {
            throw new Error("Server error: " + response.status);
        }

        const data = await response.json();

        botMessage.textContent = "Study Assistant: " + data.answer;

    } catch (error) {
        console.error("Chatbot Error:", error);

        botMessage.textContent =
            "Study Assistant: Sorry, I could not connect to AI. Please try again.";
    } finally {
        userQuestion.disabled = false;
        userQuestion.focus();
    }
});

const loadHistoryBtn = document.getElementById("loadHistoryBtn");
const chatHistory = document.getElementById("chatHistory");

loadHistoryBtn.addEventListener("click", async function () {

    const email = sessionStorage.getItem("studentEmail");

    if (!email) {
        chatHistory.textContent = "Please login first.";
        return;
    }

    chatHistory.innerHTML = "<h3>Previous Conversations</h3><p>Loading...</p>";

    try {
        const response = await fetch(
            "http://localhost:8080/api/chat-history/" + encodeURIComponent(email)
        );

        if (!response.ok) {
            throw new Error("Server error: " + response.status);
        }

        const history = await response.json();

        chatHistory.innerHTML = "<h3>Previous Conversations</h3>";

        if (history.length === 0) {
            chatHistory.innerHTML += "<p>No previous conversations found.</p>";
            return;
        }

        history.forEach(function (chat) {

            const item = document.createElement("div");
            item.style.border = "1px solid #ccc";
            item.style.padding = "12px";
            item.style.marginTop = "10px";
            item.style.borderRadius = "8px";

            const question = document.createElement("p");
            question.textContent = "You: " + chat.question;

            const answer = document.createElement("p");
            answer.textContent = "Study Assistant: " + chat.answer;

            const date = document.createElement("small");
            date.textContent = "Date: " + new Date(chat.createdAt).toLocaleString();

            item.appendChild(question);
            item.appendChild(answer);
            item.appendChild(date);

            chatHistory.appendChild(item);
        });

    } catch (error) {
        console.error("History Error:", error);
        chatHistory.innerHTML = "<h3>Previous Conversations</h3><p>Unable to load chat history.</p>";
    }
});
