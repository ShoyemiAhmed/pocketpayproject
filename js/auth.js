// ================================
// POCKETPAY AUTHENTICATION
// ================================

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem("pocketpayLoggedIn") === "true";
}

// Protect a page from users who are not logged in
function requireLogin() {
    if (!isLoggedIn()) {
        window.location.href = "login.html";
    }
}

// Log the user in
function loginUser() {
    localStorage.setItem("pocketpayLoggedIn", "true");
}

// Log the user out
function logoutUser() {
    localStorage.removeItem("pocketpayLoggedIn");
    window.location.href = "login.html";
}