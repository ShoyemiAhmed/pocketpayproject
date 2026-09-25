// =====================================
// POCKETPAY - ADD MONEY
// =====================================

const form = document.getElementById("addMoneyForm");

const amountInput = document.getElementById("amount");
const paymentMethod = document.getElementById("paymentMethod");

// Summary
const summaryAmount = document.getElementById("summaryAmount");
const summaryMethod = document.getElementById("summaryMethod");
const summaryTotal = document.getElementById("summaryTotal");

// Confirmation Modal
const confirmModal = document.getElementById("confirmModal");

const modalAmount = document.getElementById("modalAmount");
const modalMethod = document.getElementById("modalMethod");
const modalTotal = document.getElementById("modalTotal");

const cancelBtn = document.getElementById("cancelBtn");
const confirmBtn = document.getElementById("confirmBtn");

// Loading Modal
const loadingModal = document.getElementById("loadingModal");

// Success Modal
const successModal = document.getElementById("successModal");

const receiptReference =
    document.getElementById("receiptReference");

const receiptAmount =
    document.getElementById("receiptAmount");

const receiptMethod =
    document.getElementById("receiptMethod");

const receiptTotal =
    document.getElementById("receiptTotal");

const backDashboardBtn =
    document.getElementById("backDashboardBtn");


// =====================================
// FORMAT MONEY
// =====================================

function formatMoney(amount) {
    return "₦" + Number(amount).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


// =====================================
// UPDATE SUMMARY
// =====================================

function updateSummary() {

    const amount = Number(amountInput.value);

    if (amount > 0) {

        summaryAmount.textContent =
            formatMoney(amount);

        summaryTotal.textContent =
            formatMoney(amount);

    } else {

        summaryAmount.textContent =
            "₦0.00";

        summaryTotal.textContent =
            "₦0.00";
    }

    summaryMethod.textContent =
        paymentMethod.value || "-";
}


// =====================================
// LIVE SUMMARY
// =====================================

amountInput.addEventListener(
    "input",
    updateSummary
);

paymentMethod.addEventListener(
    "change",
    updateSummary
);


// =====================================
// FORM SUBMIT
// =====================================

form.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        // Clear previous errors
        document
            .querySelectorAll(".error")
            .forEach(function (error) {
                error.textContent = "";
            });

        let isValid = true;

        const amount =
            Number(amountInput.value);

        const method =
            paymentMethod.value;


        // Validate amount
        if (
            amountInput.value.trim() === "" ||
            amount <= 0
        ) {

            document.getElementById(
                "amountError"
            ).textContent =
                "Please enter a valid amount.";

            isValid = false;
        }


        // Validate payment method
        if (method === "") {

            document.getElementById(
                "paymentError"
            ).textContent =
                "Please select a payment method.";

            isValid = false;
        }


        if (!isValid) {
            return;
        }


        // =================================
        // SHOW CONFIRMATION
        // =================================

        modalAmount.textContent =
            formatMoney(amount);

        modalMethod.textContent =
            method;

        modalTotal.textContent =
            formatMoney(amount);

        confirmModal.style.display =
            "flex";
    }
);


// =====================================
// CANCEL CONFIRMATION
// =====================================

cancelBtn.addEventListener(
    "click",
    function () {

        confirmModal.style.display =
            "none";
    }
);


// =====================================
// CONFIRM DEPOSIT
// =====================================

confirmBtn.addEventListener(
    "click",
    function () {

        // Close confirmation
        confirmModal.style.display =
            "none";

        // Show processing
        loadingModal.style.display =
            "flex";


        // Prevent double clicks
        confirmBtn.disabled = true;


        setTimeout(
            function () {

                try {

                    const amount =
                        Number(amountInput.value);

                    const method =
                        paymentMethod.value;


                    // =================================
                    // 1. UPDATE WALLET BALANCE
                    // =================================

                    addMoney(amount);


                    // =================================
                    // 2. SAVE TRANSACTION
                    // =================================

                    saveTransaction({

                        type: "deposit",

                        title: "Wallet Funding",

                        amount: amount,

                        method: method,

                        date:
                            new Date().toLocaleString()
                    });


                    // =================================
                    // 3. CREATE NOTIFICATION
                    // =================================

                    if (
                        typeof addNotification ===
                        "function"
                    ) {

                        addNotification(
                            "Deposit Successful",

                            formatMoney(amount) +
                            " has been added to your PocketPay wallet.",

                            "success"
                        );
                    }


                    // =================================
                    // 4. GENERATE REFERENCE
                    // =================================

                    const reference =
                        "PP" + Date.now();


                    receiptReference.textContent =
                        reference;

                    receiptAmount.textContent =
                        formatMoney(amount);

                    receiptMethod.textContent =
                        method;

                    receiptTotal.textContent =
                        formatMoney(amount);


                    // =================================
                    // 5. HIDE PROCESSING
                    // =================================

                    loadingModal.style.display =
                        "none";


                    // =================================
                    // 6. SHOW SUCCESS
                    // =================================

                    successModal.style.display =
                        "flex";


                    // =================================
                    // 7. TOAST
                    // =================================

                    if (
                        typeof showToast ===
                        "function"
                    ) {

                        showToast(
                            "Money added successfully!",
                            "success"
                        );
                    }


                    // =================================
                    // 8. RESET FORM
                    // =================================

                    form.reset();

                    summaryAmount.textContent =
                        "₦0.00";

                    summaryMethod.textContent =
                        "-";

                    summaryTotal.textContent =
                        "₦0.00";


                } catch (error) {

                    // =================================
                    // IF ANYTHING GOES WRONG
                    // =================================

                    console.error(
                        "Deposit Error:",
                        error
                    );

                    loadingModal.style.display =
                        "none";

                    showToast(
                        "Something went wrong while processing the deposit.",
                        "error"
                    );

                } finally {

                    confirmBtn.disabled =
                        false;
                }

            },

            2000
        );
    }
);


// =====================================
// BACK TO DASHBOARD
// =====================================

backDashboardBtn.addEventListener(
    "click",
    function () {

        window.location.href =
            "dashboard.html";
    }
);