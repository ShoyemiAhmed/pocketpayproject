// ===============================
// Elements
// ===============================

const darkMode = document.getElementById("darkMode");
const notifications = document.getElementById("notifications");

const securityBtn = document.getElementById("securityBtn");
const aboutBtn = document.getElementById("aboutBtn");
const logoutBtn = document.getElementById("logoutBtn");

// ===============================
// Dark Mode
// ===============================

darkMode.addEventListener("change", function () {

    if (darkMode.checked) {

        document.body.style.background = "#121212";

        document.querySelector(".settings-card").style.background = "#1f1f1f";

        document.querySelector(".settings-card").style.color = "#ffffff";

    } else {

        document.body.style.background = "#f4f7fb";

        document.querySelector(".settings-card").style.background = "#ffffff";

        document.querySelector(".settings-card").style.color = "#333333";

    }

});

// ===============================
// Notifications
// ===============================

notifications.addEventListener("change", function () {

    if (notifications.checked) {

        alert("Notifications Enabled");

    } else {

        alert("Notifications Disabled");

    }

});

// ===============================
// Security
// ===============================

securityBtn.addEventListener("click", function () {

    alert("Security settings coming soon.");

});

// ===============================
// About PocketPay
// ===============================

aboutBtn.addEventListener("click", function () {

    alert(
        "PocketPay v1.0\n\nA modern fintech wallet built with HTML, CSS and JavaScript."
    );

});

// ===============================
// Logout
// ===============================

logoutBtn.addEventListener("click", function () {

    const confirmLogout = confirm(
        "Are you sure you want to logout?"
    );

    if (confirmLogout) {

        window.location.href = "login.html";

    }

});