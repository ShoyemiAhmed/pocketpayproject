// ===============================
// PocketPay Settings
// ===============================

// ===============================
// Elements
// ===============================

const darkMode = document.getElementById("darkMode");
const notifications = document.getElementById("notifications");

const securityBtn = document.getElementById("securityBtn");
const aboutBtn = document.getElementById("aboutBtn");
const logoutBtn = document.getElementById("logoutBtn");

const settingsCard = document.querySelector(".settings-card");


// ===============================
// Dark Mode
// ===============================

function applyDarkMode(enabled) {
    if (enabled) {
        document.body.classList.add("dark-mode");
        darkMode.checked = true;
    } else {
        document.body.classList.remove("dark-mode");
        darkMode.checked = false;
    }
}


// Load saved Dark Mode setting

const savedDarkMode =
    localStorage.getItem("darkMode") === "true";

applyDarkMode(savedDarkMode);


// Save Dark Mode setting

darkMode.addEventListener("change", function () {

    const enabled = darkMode.checked;

    localStorage.setItem("darkMode", enabled);

    applyDarkMode(enabled);

    if (enabled) {

        showToast("Dark Mode enabled.", "success");

    } else {

        showToast("Dark Mode disabled.", "info");

    }

});


// ===============================
// Notifications
// ===============================

// Load saved notification setting

const savedNotifications =
    localStorage.getItem("notifications");

if (savedNotifications !== null) {

    notifications.checked =
        savedNotifications === "true";

}


// Save notification setting

notifications.addEventListener("change", function () {

    const enabled = notifications.checked;

    localStorage.setItem("notifications", enabled);

    if (enabled) {

        showToast("Notifications enabled.", "success");

    } else {

        showToast("Notifications disabled.", "info");

    }

});


// ===============================
// Security
// ===============================

securityBtn.addEventListener("click", function () {

    window.location.href = "profile.html";

});


// ===============================
// About PocketPay
// ===============================

aboutBtn.addEventListener("click", function () {

    showToast(
        "PocketPay v1.0 — A modern fintech wallet built with HTML, CSS and JavaScript.",
        "info"
    );

});


// ===============================
// Logout
// ===============================

logoutBtn.addEventListener("click", function () {

    const confirmLogout = confirm(
        "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    showToast("Logging out...", "info");

    setTimeout(function () {

        logoutUser();

    }, 1000);

});