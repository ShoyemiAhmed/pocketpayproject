// =================================
// POCKETPAY GLOBAL THEME
// =================================

function applyGlobalTheme() {
    const darkMode =
        localStorage.getItem("darkMode") === "true";

    if (darkMode) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}

// Apply theme immediately
applyGlobalTheme();