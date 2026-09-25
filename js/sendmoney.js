const form = document.getElementById("sendMoneyForm");


// ===============================
// Transfer Summary Elements
// ===============================

const recipientInput = document.getElementById("recipient");
const bankInput = document.getElementById("bank");
const amountInput = document.getElementById("amount");

const summaryRecipient = document.getElementById("summaryRecipient");
const summaryBank = document.getElementById("summaryBank");
const summaryAmount = document.getElementById("summaryAmount");
const summaryTotal = document.getElementById("summaryTotal");

const transferFee = 10;


// ===============================
// Confirmation Modal Elements
// ===============================

const confirmModal = document.getElementById("confirmModal");

const modalRecipient = document.getElementById("modalRecipient");
const modalBank = document.getElementById("modalBank");
const modalAmount = document.getElementById("modalAmount");
const modalTotal = document.getElementById("modalTotal");

const cancelBtn = document.getElementById("cancelBtn");
const confirmBtn = document.getElementById("confirmBtn");


// ===============================
// Success Receipt Elements
// ===============================

const successModal = document.getElementById("successModal");

const receiptReference = document.getElementById("receiptReference");
const receiptRecipient = document.getElementById("receiptRecipient");
const receiptBank = document.getElementById("receiptBank");
const receiptAmount = document.getElementById("receiptAmount");
const receiptTotal = document.getElementById("receiptTotal");

const backDashboardBtn =
    document.getElementById("backDashboardBtn");


// ===============================
// Loading Modal
// ===============================

const loadingModal =
    document.getElementById("loadingModal");


// ===============================
// Live Transfer Summary
// ===============================

function updateSummary() {

    summaryRecipient.textContent =
        recipientInput.value || "-";

    summaryBank.textContent =
        bankInput.value || "-";

    const amount =
        Number(amountInput.value);

    if (amount > 0) {

        summaryAmount.textContent =
            "₦" +
            amount.toLocaleString();

        summaryTotal.textContent =
            "₦" +
            (amount + transferFee).toLocaleString();

    } else {

        summaryAmount.textContent =
            "₦0.00";

        summaryTotal.textContent =
            "₦10.00";
    }
}


recipientInput.addEventListener(
    "input",
    updateSummary
);

bankInput.addEventListener(
    "change",
    updateSummary
);

amountInput.addEventListener(
    "input",
    updateSummary
);


// ===============================
// Form Validation
// ===============================

form.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        // Clear previous errors
        document
            .querySelectorAll(".error")
            .forEach(error => {
                error.textContent = "";
            });

        let isValid = true;

        const recipient =
            recipientInput.value.trim();

        const bank =
            bankInput.value;

        const accountNumber =
            document
                .getElementById("accountNumber")
                .value
                .trim();

        const amount =
            amountInput.value.trim();


        // Recipient validation
        if (recipient === "") {

            document.getElementById(
                "recipientError"
            ).textContent =
                "Recipient name is required.";

            isValid = false;
        }


        // Bank validation
        if (bank === "") {

            document.getElementById(
                "bankError"
            ).textContent =
                "Please select a bank.";

            isValid = false;
        }


        // Account number validation
        if (
            accountNumber.length !== 10 ||
            isNaN(accountNumber)
        ) {

            document.getElementById(
                "accountError"
            ).textContent =
                "Account number must be 10 digits.";

            isValid = false;
        }


        // Amount validation
        if (
            amount === "" ||
            Number(amount) <= 0
        ) {

            document.getElementById(
                "amountError"
            ).textContent =
                "Enter a valid amount.";

            isValid = false;
        }


        // ===============================
        // Open Confirmation Modal
        // ===============================

        if (isValid) {

            modalRecipient.textContent =
                recipient;

            modalBank.textContent =
                bank;

            const total =
                Number(amount) + transferFee;

            modalAmount.textContent =
                "₦" +
                Number(amount).toLocaleString();

            modalTotal.textContent =
                "₦" +
                total.toLocaleString();

            confirmModal.style.display =
                "flex";
        }
    }
);


// ===============================
// Cancel Transfer
// ===============================

cancelBtn.addEventListener(
    "click",
    function () {

        confirmModal.style.display =
            "none";
    }
);


// ===============================
// Confirm Transfer
// ===============================

confirmBtn.addEventListener(
    "click",
    function () {

        confirmModal.style.display =
            "none";

        // Show processing screen
        loadingModal.style.display =
            "flex";


        setTimeout(function () {

            loadingModal.style.display =
                "none";

            const amount =
                Number(amountInput.value);

            const recipient =
                recipientInput.value.trim();

            const bank =
                bankInput.value;

            const total =
                amount + transferFee;


            // =====================================
            // Check Wallet Balance
            // =====================================

            if (amount > getBalance()) {

                showToast(
                    "Insufficient wallet balance.",
                    "error"
                );

                return;
            }


            // =====================================
            // Deduct Wallet Balance
            // =====================================

            deductMoney(amount);


            // =====================================
            // Save Transaction
            // =====================================

            saveTransaction({

                type: "transfer",

                title:
                    "Transfer to " +
                    recipient,

                amount:
                    amount,

                bank:
                    bank,

                date:
                    new Date().toLocaleString()
            });


            // =====================================
            // CREATE NOTIFICATION
            // =====================================

            addNotification(

                "Transfer Successful",

                "₦" +
                    amount.toLocaleString(
                        undefined,
                        {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }
                    ) +
                    " was sent successfully to " +
                    recipient +
                    ".",

                "money"
            );


            // =====================================
            // Generate Reference
            // =====================================

            const reference =
                "PP" + Date.now();

            receiptReference.textContent =
                reference;

            receiptRecipient.textContent =
                recipient;

            receiptBank.textContent =
                bank;

            receiptAmount.textContent =
                "₦" +
                amount.toLocaleString(
                    undefined,
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }
                );

            receiptTotal.textContent =
                "₦" +
                total.toLocaleString(
                    undefined,
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }
                );


            // =====================================
            // Show Success Modal
            // =====================================

            successModal.style.display =
                "flex";


            // =====================================
            // Toast
            // =====================================

            showToast(
                "Money sent successfully!",
                "success"
            );

        }, 2000);
    }
);


// ===============================
// Back To Dashboard
// ===============================

backDashboardBtn.addEventListener(
    "click",
    function () {

        window.location.href =
            "dashboard.html";
    }
);