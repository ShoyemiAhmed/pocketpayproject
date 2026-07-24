// ==============================
// Elements
// ==============================

const editBtn = document.getElementById("editBtn");
const passwordBtn = document.getElementById("passwordBtn");
const settingsBtn = document.getElementById("settingsBtn");
const logoutBtn = document.getElementById("logoutBtn");

// ==============================
// Edit Profile
// ==============================

editBtn.addEventListener("click", function () {

    alert("Edit Profile feature coming soon.");

});

// ==============================
// Change Password
// ==============================

passwordBtn.addEventListener("click", function () {

    alert("Change Password feature coming soon.");

});

// ==============================
// Settings
// ==============================

settingsBtn.addEventListener("click", function () {

    window.location.href = "settings.html";

});

// ==============================
// Logout
// ==============================

logoutBtn.addEventListener("click", function () {

    const confirmLogout = confirm(
        "Are you sure you want to logout?"
    );

    if (confirmLogout) {

        window.location.href = "login.html";

    }

});