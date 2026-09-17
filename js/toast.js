// ===================================
// PocketPay Toast Notifications
// ===================================

const toastContainer = document.createElement("div");

toastContainer.className = "toast-container";

document.body.appendChild(toastContainer);


function showToast(message, type = "success") {

    const toast = document.createElement("div");

    toast.className = `toast ${type}`;

    let icon = "";

    if (type === "success") {
        icon = '<i class="fa-solid fa-circle-check"></i>';
    }

    if (type === "error") {
        icon = '<i class="fa-solid fa-circle-xmark"></i>';
    }

    if (type === "warning") {
        icon = '<i class="fa-solid fa-triangle-exclamation"></i>';
    }

    if (type === "info") {
        icon = '<i class="fa-solid fa-circle-info"></i>';
    }

    toast.innerHTML = `
        ${icon}
        <span>${message}</span>
    `;

    toastContainer.appendChild(toast);


    setTimeout(function () {

        toast.classList.add("hide");

        setTimeout(function () {
            toast.remove();
        }, 300);

    }, 3000);
}