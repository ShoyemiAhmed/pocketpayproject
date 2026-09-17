// ===================================
// Elements
// ===================================

const profileForm = document.getElementById("profileForm");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

const successMessage =
document.getElementById("successMessage");

const profileImage =
document.getElementById("profileImage");

const imageInput =
document.getElementById("imageInput");

const changePhotoBtn =
document.getElementById("changePhotoBtn");


// ===================================
// Load Profile
// ===================================

function loadProfile() {

    const profile = getProfile();

    fullName.value = profile.name;
    email.value = profile.email;
    phone.value = profile.phone;

}

loadProfile();

// ===========================
// Load Saved Photo
// ===========================

const savedPhoto = getProfilePhoto();

if(savedPhoto){

    profileImage.src = savedPhoto;

}


// ===================================
// Save Profile
// ===================================

profileForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Clear Errors

    document.querySelectorAll(".error").forEach(function (error) {

        error.textContent = "";

    });

    let valid = true;

    // ===========================
    // Validation
    // ===========================

    if (fullName.value.trim() === "") {

        document.getElementById("nameError").textContent =
        "Full name is required.";

        valid = false;

    }

    if (email.value.trim() === "") {

        document.getElementById("emailError").textContent =
        "Email is required.";

        valid = false;

    }

    else if (!email.value.includes("@")) {

        document.getElementById("emailError").textContent =
        "Enter a valid email.";

        valid = false;

    }

    if (phone.value.length < 11) {

        document.getElementById("phoneError").textContent =
        "Enter a valid phone number.";

        valid = false;

    }

    if (!valid) {

        return;

    }

    // ===========================
    // Save To Local Storage
    // ===========================

    saveProfile({

        name: fullName.value,

        email: email.value,

        phone: phone.value

    });

    // ===========================
    // Success Message
    // ===========================

    successMessage.style.display = "block";

    showToast("Profile updated successfully!", "success");

    setTimeout(function () {

        successMessage.style.display = "none";

    }, 2000);

});

// ===========================
// Change Photo
// ===========================

changePhotoBtn.addEventListener("click",function(){

    imageInput.click();

});

imageInput.addEventListener("change",function(){

    const file = imageInput.files[0];

    if(!file){

        return;

    }

    const reader = new FileReader();

    reader.onload = function(event){

        profileImage.src = event.target.result;

        saveProfilePhoto(event.target.result);

    };

    reader.readAsDataURL(file);

});

// ===================================
// Logout
// ===================================

const logoutBtn =
document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function () {

    const confirmLogout = confirm(

        "Are you sure you want to logout?"

    );

    if (!confirmLogout) {

        return;

    }

    // Redirect to login page
    window.location.href = "login.html";

});

// ===============================
// Settings
// ===============================

const settingsBtn = document.getElementById("settingsBtn");

settingsBtn.addEventListener("click", function () {
    window.location.href = "settings.html";
});

// ===============================
// Change Password
// ===============================

const passwordBtn = document.getElementById("passwordBtn");

passwordBtn.addEventListener("click", function () {

    const currentPassword = prompt("Enter your current password:");

    if (currentPassword === null) return;

    const savedPassword =
        localStorage.getItem("pocketpayPassword");

    // First-time password setup
    if (savedPassword === null) {

        showToast(
            "No password has been set yet.",
            "warning"
        );

        return;
    }

    if (currentPassword !== savedPassword) {

        showToast(
            "Current password is incorrect.",
            "error"
        );

        return;
    }

    const newPassword = prompt("Enter your new password:");

    if (newPassword === null) return;

    if (newPassword.length < 6) {

        showToast(
            "Password must be at least 6 characters.",
            "error"
        );

        return;
    }

    const confirmPassword = prompt(
        "Confirm your new password:"
    );

    if (confirmPassword === null) return;

    if (newPassword !== confirmPassword) {

        showToast(
            "Passwords do not match.",
            "error"
        );

        return;
    }

    localStorage.setItem(
        "pocketpayPassword",
        newPassword
    );

    showToast(
        "Password changed successfully!",
        "success"
    );
});