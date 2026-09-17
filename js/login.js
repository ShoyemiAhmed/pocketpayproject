// ===============================
// PocketPay Login JavaScript
// ===============================

const form = document.getElementById("loginForm");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const loginSuccess = document.getElementById("loginSuccess");

// ===============================
// Login Form
// ===============================

form.addEventListener("submit", function (event) {

    event.preventDefault();

    // Clear previous messages
    emailError.textContent = "";
    passwordError.textContent = "";
    loginSuccess.textContent = "";

    let isValid = true;

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // ===============================
    // Email Validation
    // ===============================

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {

        emailError.textContent =
            "Email is required.";

        isValid = false;

    } else if (!emailPattern.test(email)) {

        emailError.textContent =
            "Enter a valid email address.";

        isValid = false;
    }

    // ===============================
    // Password Validation
    // ===============================

    if (password === "") {

        passwordError.textContent =
            "Password is required.";

        isValid = false;
    }

    // ===============================
    // Stop if validation fails
    // ===============================

    if (!isValid) {
        return;
    }

    // ===============================
    // Get Saved Account
    // ===============================

    const savedEmail =
        localStorage.getItem("pocketpayEmail");

    const savedPassword =
        localStorage.getItem("pocketpayPassword");

    // ===============================
    // Check Login
    // ===============================

    if (savedEmail === null || savedPassword === null) {

        emailError.textContent =
            "No PocketPay account found. Please sign up first.";

        return;
    }

    if (email !== savedEmail) {

        emailError.textContent =
            "Email address not found.";

        return;
    }

    if (password !== savedPassword) {

        passwordError.textContent =
            "Incorrect password.";

        return;
    }

    

    // ===============================
    // Successful Login
    // ===============================

    loginUser();

    loginSuccess.textContent =
        "✅ Login successful!";

    // ===============================
    // Go to Dashboard
    // ===============================

    setTimeout(function () {

        window.location.href = "dashboard.html";

    }, 1000);

});

// ===============================
// Show / Hide Password
// ===============================

function togglePassword(id) {

    const input = document.getElementById(id);

    if (input.type === "password") {

        input.type = "text";

    } else {

        input.type = "password";
    }
}