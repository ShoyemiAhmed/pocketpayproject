const form = document.getElementById("signupForm");
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const agreeTerms = document.getElementById("agreeTerms");
const signupBtn = document.getElementById("signupBtn");
const successMessage = document.getElementById("successMessage");

signupBtn.disabled = true;

agreeTerms.addEventListener("change", function () {
    signupBtn.disabled = !this.checked;
});

function togglePassword(id) {
    const input = document.getElementById(id);

    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    document.querySelectorAll(".error").forEach(function (error) {
        error.textContent = "";
    });

    successMessage.style.display = "none";
    successMessage.textContent = "";

    let isValid = true;

    /* FULL NAME */
    if (fullname.value.trim() === "") {
        document.getElementById("fullnameError").textContent =
            "Full name is required.";

        isValid = false;
    }

    /* EMAIL */
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

    /* PHONE */
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

    /* PASSWORD */
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

    /* CONFIRM PASSWORD */
    if (confirmPassword.value === "") {
        document.getElementById("confirmPasswordError").textContent =
            "Please confirm your password.";

        isValid = false;
    } else if (password.value !== confirmPassword.value) {
        document.getElementById("confirmPasswordError").textContent =
            "Passwords do not match.";

        isValid = false;
    }

    /* TERMS */
    if (!agreeTerms.checked) {
        document.getElementById("termsError").textContent =
            "You must agree to the Terms & Conditions.";

        isValid = false;
    }

    /* CREATE ACCOUNT */
    if (isValid) {

        signupBtn.disabled = true;
        signupBtn.textContent = "Creating Account...";

        setTimeout(function () {

            const profile = {
                name: fullname.value.trim(),
                email: email.value.trim(),
                phone: phone.value.trim()
            };

            /* SAVE PROFILE */
            localStorage.setItem(
                "profile",
                JSON.stringify(profile)
            );

            /* SAVE LOGIN EMAIL */
            localStorage.setItem(
                "pocketpayEmail",
                email.value.trim()
            );

            /* SAVE PASSWORD */
            localStorage.setItem(
                "pocketpayPassword",
                password.value
            );

            /* SHOW SUCCESS MESSAGE */
            successMessage.style.display = "block";
            successMessage.textContent =
                "🎉 Account created successfully! Redirecting to login...";

            signupBtn.textContent = "Account Created";

            /*
             * REDIRECT TO LOGIN PAGE
             * after 1.5 seconds
             */
            setTimeout(function () {
                window.location.href = "login.html";
            }, 1500);

        }, 2000);
    }
});