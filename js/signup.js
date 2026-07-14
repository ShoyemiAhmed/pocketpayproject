function togglePassword(id) {
    const input = document.getElementById(id);

    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}

const form = document.getElementById("signupForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Clear previous errors
    document.querySelectorAll(".error").forEach(error => error.textContent = "");

    let isValid = true;

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    
    

    if (fullname === "") {
        document.getElementById("fullnameError").textContent = "Full name is required.";
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (email === "") {
    document.getElementById("emailError").textContent = "Email is required.";
    isValid = false;
} else if (!emailPattern.test(email)) {
    document.getElementById("emailError").textContent = "Please enter a valid email address.";
    isValid = false;
}

    const phonePattern = /^[789][01]\d{8}$/;

if (phone === "") {
    document.getElementById("phoneError").textContent = "Phone number is required.";
    isValid = false;
} else if (!phonePattern.test(phone)) {
    document.getElementById("phoneError").textContent =
        "Enter a valid phone number.";
    isValid = false;
}

    const passwordPattern =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

if (!passwordPattern.test(password)) {
    document.getElementById("passwordError").textContent =
        "Password must contain uppercase, lowercase, number and be at least 8 characters long.";
    isValid = false;
}

    if (password !== confirmPassword) {
        document.getElementById("confirmPasswordError").textContent = "Passwords do not match.";
        isValid = false;
    }
             const successMessage = 
                  document.getElementById("successMessage");
             const signupBtn = document.getElementById("signupBtn");
       if (isValid) {
           //Disable the button
              signupBtn.disabled = true;

              //Show the loading spinner
              signupBtn.innerHTML = 
                  '<span class="spinner"></span> Creating Account...';

                   // Simulate waiting for the backend
    setTimeout(function () {

        // Enable the button again
        signupBtn.disabled = false;

        // Restore the button text
        signupBtn.innerHTML = "Create Account";

        // Show success message
        successMessage.textContent =
            "✅ PocketPay account created successfully!";

        successMessage.style.display = "block";

    }, 2000);

                
       }else {

        successMessage.textContent = "";
        successMessage.style.display = "none";
       }

});