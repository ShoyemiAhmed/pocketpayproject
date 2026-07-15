// ===============================
// PocketPay Signup JavaScript
// ===============================

const form = document.getElementById("signupForm");

const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const agreeTerms = document.getElementById("agreeTerms");

const signupBtn = document.getElementById("signupBtn");
const successMessage = document.getElementById("successMessage");

// ===============================
// Disable button until terms accepted
// ===============================

signupBtn.disabled = true;

agreeTerms.addEventListener("change", function () {
    signupBtn.disabled = !this.checked;
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

// ===============================
// Form Validation
// ===============================

form.addEventListener("submit", function (event) {

    event.preventDefault();

    // Clear old messages

    document.querySelectorAll(".error").forEach(error => {
        error.textContent = "";
    });

    successMessage.style.display = "none";
    successMessage.textContent = "";

    let isValid = true;

    // ==========================
    // Full Name
    // ==========================

    if (fullname.value.trim() === "") {

        document.getElementById("fullnameError").textContent =
            "Full name is required.";

        isValid = false;

    }

    // ==========================
    // Email
    // ==========================

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {

        document.getElementById("emailError").textContent =
            "Email is required.";

        isValid = false;

    } else if (!emailPattern.test(email.value.trim())) {

        document.getElementById("emailError").textContent =
            "Enter a valid email address.";

        isValid = false;

    }

    // ==========================
    // Nigerian Phone Number
    // User enters only 10 digits
    // Example:
    // 8123456789
    // ==========================

    const phonePattern = /^[789][01]\d{8}$/;

    if (phone.value.trim() === "") {

        document.getElementById("phoneError").textContent =
            "Phone number is required.";

        isValid = false;

    } else if (!phonePattern.test(phone.value.trim())) {

        document.getElementById("phoneError").textContent =
            "Enter a valid Nigerian phone number.";

        isValid = false;

    }

    // ==========================
    // Password
    // ==========================

    const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (password.value === "") {

        document.getElementById("passwordError").textContent =
            "Password is required.";

        isValid = false;

    } else if (!passwordPattern.test(password.value)) {

        document.getElementById("passwordError").textContent =
            "Password must be at least 8 characters and include uppercase, lowercase, number and special character.";

        isValid = false;

    }

    // ==========================
    // Confirm Password
    // ==========================

    if (confirmPassword.value === "") {

        document.getElementById("confirmPasswordError").textContent =
            "Please confirm your password.";

        isValid = false;

    } else if (password.value !== confirmPassword.value) {

        document.getElementById("confirmPasswordError").textContent =
            "Passwords do not match.";

        isValid = false;

    }

    // ==========================
    // Terms
    // ==========================

    if (!agreeTerms.checked) {

        document.getElementById("termsError").textContent =
            "You must agree to the Terms & Conditions.";

        isValid = false;

    }

    // ==========================
    // Success
    // ==========================

    if (isValid) {

        signupBtn.disabled = true;
        signupBtn.textContent = "Creating Account...";

        setTimeout(function () {

            signupBtn.disabled = false;
            signupBtn.textContent = "Create Account";

            successMessage.style.display = "block";
            successMessage.textContent =
                "🎉 Account created successfully!";

            form.reset();

            signupBtn.disabled = true;

        }, 2000);

    }

});