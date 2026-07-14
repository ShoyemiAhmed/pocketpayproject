const form = document.getElementById("loginForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Clear previous errors
    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";
    document.getElementById("loginSuccess").textContent = "";

    let isValid = true;

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    

    if (email === "") {
        document.getElementById("emailError").textContent =
            "Email is required.";
        isValid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById("emailError").textContent =
            "Enter a valid email address.";
        isValid = false;
    }

    // Password validation
    const passwordPattern =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

    if (password === "") {
        document.getElementById("passwordError").textContent =
            "Password is required.";
        isValid = false;
    } else if (!passwordPattern.test(password)) {
        document.getElementById("passwordError").textContent =
            "Password must contain uppercase, lowercase, number, special character and be at least 8 characters long.";
        isValid = false;
    }

    // Success message
    if (isValid) {
        document.getElementById("loginSuccess").textContent =
            "✅ Login successful!";
    }
});

function togglePassword(id) {
    const input = document.getElementById(id);

    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}