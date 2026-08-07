// ===========================
// Elements
// ===========================

const form = document.getElementById("airtimeForm");

const service = document.getElementById("service");
const network = document.getElementById("network");
const phone = document.getElementById("phone");
const amount = document.getElementById("amount");

// ===========================
// Summary
// ===========================

const summaryService = document.getElementById("summaryService");
const summaryNetwork = document.getElementById("summaryNetwork");
const summaryPhone = document.getElementById("summaryPhone");
const summaryAmount = document.getElementById("summaryAmount");

// ===========================
// Confirmation Modal
// ===========================

const confirmModal = document.getElementById("confirmModal");

const modalService = document.getElementById("modalService");
const modalNetwork = document.getElementById("modalNetwork");
const modalPhone = document.getElementById("modalPhone");
const modalAmount = document.getElementById("modalAmount");

const cancelBtn = document.getElementById("cancelBtn");
const confirmBtn = document.getElementById("confirmBtn");

// ===========================
// Loading Modal
// ===========================

const loadingModal = document.getElementById("loadingModal");

// ===========================
// Success Modal
// ===========================

const successModal = document.getElementById("successModal");

const reference = document.getElementById("reference");
const receiptAmount = document.getElementById("receiptAmount");

const backDashboardBtn =
document.getElementById("backDashboardBtn");

// ===========================
// Live Summary
// ===========================

function updateSummary() {

    summaryService.textContent =
        service.value || "-";

    summaryNetwork.textContent =
        network.value || "-";

    summaryPhone.textContent =
        phone.value || "-";

    const value = Number(amount.value);

    if (value > 0) {

        summaryAmount.textContent =
            "₦" + value.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

    } else {

        summaryAmount.textContent = "₦0.00";

    }

}

service.addEventListener("change", updateSummary);
network.addEventListener("change", updateSummary);
phone.addEventListener("input", updateSummary);
amount.addEventListener("input", updateSummary);

// ===========================
// Form Submit
// ===========================

form.addEventListener("submit", function (event) {

    event.preventDefault();

    document.querySelectorAll(".error").forEach(function (error) {

        error.textContent = "";

    });

    let valid = true;

    if (service.value === "") {

        document.getElementById("serviceError").textContent =
            "Select a service.";

        valid = false;

    }

    if (network.value === "") {

        document.getElementById("networkError").textContent =
            "Select a network.";

        valid = false;

    }

    if (phone.value.length !== 11 || isNaN(phone.value)) {

        document.getElementById("phoneError").textContent =
            "Enter a valid phone number.";

        valid = false;

    }

    if (amount.value === "" || Number(amount.value) <= 0) {

        document.getElementById("amountError").textContent =
            "Enter a valid amount.";

        valid = false;

    }

    if (!valid) {

        return;

    }

    modalService.textContent = service.value;
    modalNetwork.textContent = network.value;
    modalPhone.textContent = phone.value;

    modalAmount.textContent =
        "₦" +
        Number(amount.value).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

    confirmModal.style.display = "flex";

});

// ===========================
// Cancel
// ===========================

cancelBtn.addEventListener("click", function () {

    confirmModal.style.display = "none";

});

// ===========================
// Confirm Purchase
// ===========================

confirmBtn.addEventListener("click", function () {

    confirmModal.style.display = "none";

    loadingModal.style.display = "flex";

    setTimeout(function () {

        loadingModal.style.display = "none";

        const purchaseAmount = Number(amount.value);

        // ===========================
        // Check Wallet Balance
        // ===========================

        if (purchaseAmount > getBalance()) {

            alert("Insufficient wallet balance.");

            return;

        }

        // ===========================
        // Deduct Wallet Balance
        // ===========================

        deductMoney(purchaseAmount);

        // ===========================
        // Save Transaction
        // ===========================

        saveTransaction({

            type: "airtime",

            title: service.value + " Purchase",

            amount: purchaseAmount,

            network: network.value,

            phone: phone.value,

            date: new Date().toLocaleString()

        });

        // ===========================
        // Receipt
        // ===========================

        reference.textContent =
            "PP" + Date.now();

        receiptAmount.textContent =
            "₦" +
            purchaseAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

        successModal.style.display = "flex";

        form.reset();

        updateSummary();

    }, 2000);

});

// ===========================
// Dashboard
// ===========================

backDashboardBtn.addEventListener("click", function () {

    window.location.href = "dashboard.html";

});

// ===========================
// Start
// ===========================

updateSummary();