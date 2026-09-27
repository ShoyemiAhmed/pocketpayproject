// ===============================
// POCKETPAY SEND MONEY
// ===============================


// ===============================
// Form
// ===============================

const form = document.getElementById("sendMoneyForm");


// ===============================
// Transfer Summary Elements
// ===============================

const recipientInput =
    document.getElementById("recipient");

const bankInput =
    document.getElementById("bank");

const amountInput =
    document.getElementById("amount");

const accountNumberInput =
    document.getElementById("accountNumber");

const descriptionInput =
    document.getElementById("description");


const summaryRecipient =
    document.getElementById("summaryRecipient");

const summaryBank =
    document.getElementById("summaryBank");

const summaryAmount =
    document.getElementById("summaryAmount");

const summaryTotal =
    document.getElementById("summaryTotal");


const transferFee = 10;


// ===============================
// Confirmation Modal
// ===============================

const confirmModal =
    document.getElementById("confirmModal");

const modalRecipient =
    document.getElementById("modalRecipient");

const modalBank =
    document.getElementById("modalBank");

const modalAmount =
    document.getElementById("modalAmount");

const modalTotal =
    document.getElementById("modalTotal");

const cancelBtn =
    document.getElementById("cancelBtn");

const confirmBtn =
    document.getElementById("confirmBtn");


// ===============================
// Receipt Elements
// ===============================

const successModal =
    document.getElementById("successModal");

const receiptReference =
    document.getElementById("receiptReference");

const receiptRecipient =
    document.getElementById("receiptRecipient");

const receiptBank =
    document.getElementById("receiptBank");

const receiptAccount =
    document.getElementById("receiptAccount");

const receiptDescription =
    document.getElementById("receiptDescription");

const receiptAmount =
    document.getElementById("receiptAmount");

const receiptTotal =
    document.getElementById("receiptTotal");

const receiptDate =
    document.getElementById("receiptDate");

const downloadReceiptBtn =
    document.getElementById("downloadReceiptBtn");

const shareReceiptBtn =
    document.getElementById("shareReceiptBtn");

const backDashboardBtn =
    document.getElementById("backDashboardBtn");


// ===============================
// Loading Modal
// ===============================

const loadingModal =
    document.getElementById("loadingModal");


// ===============================
// Current Receipt Data
// ===============================

let currentReceipt = null;


// ===============================
// Currency Formatter
// ===============================

function formatCurrency(amount) {

    return "₦" +
        Number(amount).toLocaleString(
            undefined,
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );
}


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
            formatCurrency(amount);

        summaryTotal.textContent =
            formatCurrency(
                amount + transferFee
            );

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


        document
            .querySelectorAll(".error")
            .forEach(function (error) {

                error.textContent = "";

            });


        let isValid = true;


        const recipient =
            recipientInput.value.trim();

        const bank =
            bankInput.value;

        const accountNumber =
            accountNumberInput.value.trim();

        const amount =
            amountInput.value.trim();


        // Recipient
        if (recipient === "") {

            document.getElementById(
                "recipientError"
            ).textContent =
                "Recipient name is required.";

            isValid = false;
        }


        // Bank
        if (bank === "") {

            document.getElementById(
                "bankError"
            ).textContent =
                "Please select a bank.";

            isValid = false;
        }


        // Account Number
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


        // Amount
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
        // Open Confirmation
        // ===============================

        if (isValid) {

            const transferAmount =
                Number(amount);

            const total =
                transferAmount + transferFee;


            modalRecipient.textContent =
                recipient;

            modalBank.textContent =
                bank;

            modalAmount.textContent =
                formatCurrency(
                    transferAmount
                );

            modalTotal.textContent =
                formatCurrency(total);


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


        loadingModal.style.display =
            "flex";


        setTimeout(function () {

            const amount =
                Number(
                    amountInput.value
                );

            const recipient =
                recipientInput.value.trim();

            const bank =
                bankInput.value;

            const accountNumber =
                accountNumberInput.value.trim();

            const description =
                descriptionInput.value.trim() ||
                "Money transfer";

            const total =
                amount + transferFee;


            // ===============================
            // Check Balance
            // ===============================

            if (total > getBalance()) {

                loadingModal.style.display =
                    "none";

                showToast(
                    "Insufficient wallet balance.",
                    "error"
                );

                return;
            }


            // ===============================
            // Deduct Total
            // ===============================

            deductMoney(total);


            // ===============================
            // Generate Reference
            // ===============================

            const reference =
                "PP" +
                Date.now();


            const transactionDate =
                new Date();


            const formattedDate =
                transactionDate.toLocaleString();


            // ===============================
            // Save Transaction
            // ===============================

            saveTransaction({

                type: "transfer",

                title:
                    "Transfer to " +
                    recipient,

                amount:
                    amount,

                fee:
                    transferFee,

                total:
                    total,

                recipient:
                    recipient,

                bank:
                    bank,

                accountNumber:
                    accountNumber,

                description:
                    description,

                reference:
                    reference,

                date:
                    formattedDate

            });


            // ===============================
            // Notification
            // ===============================

            addNotification(

                "Transfer Successful",

                formatCurrency(amount) +
                " was sent successfully to " +
                recipient +
                ".",

                "money"

            );


            // ===============================
            // Fill Receipt
            // ===============================

            receiptReference.textContent =
                reference;

            receiptRecipient.textContent =
                recipient;

            receiptBank.textContent =
                bank;

            receiptAccount.textContent =
                accountNumber;

            receiptDescription.textContent =
                description;

            receiptAmount.textContent =
                formatCurrency(amount);

            receiptTotal.textContent =
                formatCurrency(total);

            receiptDate.textContent =
                formattedDate;


            // ===============================
            // Store Receipt Data
            // ===============================

            currentReceipt = {

                reference:
                    reference,

                recipient:
                    recipient,

                bank:
                    bank,

                accountNumber:
                    accountNumber,

                description:
                    description,

                amount:
                    amount,

                fee:
                    transferFee,

                total:
                    total,

                date:
                    formattedDate

            };


            // ===============================
            // Hide Loading
            // ===============================

            loadingModal.style.display =
                "none";


            // ===============================
            // Show Receipt
            // ===============================

            successModal.style.display =
                "flex";


            // ===============================
            // Toast
            // ===============================

            showToast(
                "Money sent successfully!",
                "success"
            );


        }, 2000);

    }
);


// ===============================
// SAVE / DOWNLOAD RECEIPT
// ===============================

downloadReceiptBtn.addEventListener(
    "click",
    function () {

        if (!currentReceipt) {
            return;
        }


        // Open printable receipt
        const receiptWindow =
            window.open(
                "",
                "_blank"
            );


        receiptWindow.document.write(`

            <!DOCTYPE html>

            <html>

            <head>

                <title>
                    PocketPay Receipt
                </title>

                <style>

                    body {
                        font-family: Arial, sans-serif;
                        padding: 30px;
                        max-width: 500px;
                        margin: auto;
                    }

                    .receipt {
                        border: 1px solid #ddd;
                        padding: 25px;
                        border-radius: 15px;
                    }

                    h1 {
                        text-align: center;
                        margin-bottom: 5px;
                    }

                    .subtitle {
                        text-align: center;
                        color: #666;
                        margin-bottom: 25px;
                    }

                    .success {
                        text-align: center;
                        color: #16a34a;
                        font-weight: bold;
                        margin-bottom: 25px;
                    }

                    .row {
                        display: flex;
                        justify-content: space-between;
                        gap: 20px;
                        padding: 10px 0;
                        border-bottom: 1px solid #eee;
                    }

                    .total {
                        font-size: 20px;
                        font-weight: bold;
                        border-bottom: none;
                        padding-top: 18px;
                    }

                    .footer {
                        text-align: center;
                        margin-top: 30px;
                        color: #777;
                        font-size: 13px;
                    }

                    @media print {

                        body {
                            padding: 0;
                        }

                        .receipt {
                            border: none;
                        }

                    }

                </style>

            </head>

            <body>

                <div class="receipt">

                    <h1>
                        PocketPay
                    </h1>

                    <div class="subtitle">
                        Transaction Receipt
                    </div>

                    <div class="success">
                        ✓ Transfer Successful
                    </div>

                    <div class="row">
                        <span>Reference</span>
                        <strong>
                            ${currentReceipt.reference}
                        </strong>
                    </div>

                    <div class="row">
                        <span>Recipient</span>
                        <strong>
                            ${currentReceipt.recipient}
                        </strong>
                    </div>

                    <div class="row">
                        <span>Bank</span>
                        <strong>
                            ${currentReceipt.bank}
                        </strong>
                    </div>

                    <div class="row">
                        <span>Account Number</span>
                        <strong>
                            ${currentReceipt.accountNumber}
                        </strong>
                    </div>

                    <div class="row">
                        <span>Description</span>
                        <strong>
                            ${currentReceipt.description}
                        </strong>
                    </div>

                    <div class="row">
                        <span>Amount</span>
                        <strong>
                            ${formatCurrency(
                                currentReceipt.amount
                            )}
                        </strong>
                    </div>

                    <div class="row">
                        <span>Transfer Fee</span>
                        <strong>
                            ${formatCurrency(
                                currentReceipt.fee
                            )}
                        </strong>
                    </div>

                    <div class="row total">
                        <span>Total</span>
                        <strong>
                            ${formatCurrency(
                                currentReceipt.total
                            )}
                        </strong>
                    </div>

                    <div class="row">
                        <span>Date</span>
                        <strong>
                            ${currentReceipt.date}
                        </strong>
                    </div>

                    <div class="footer">
                        Thank you for using PocketPay.
                    </div>

                </div>

                <script>

                    window.onload = function () {

                        window.print();

                    };

                <\/script>

            </body>

            </html>

        `);


        receiptWindow.document.close();

    }
);


// ===============================
// SHARE RECEIPT
// ===============================

shareReceiptBtn.addEventListener(
    "click",
    async function () {

        if (!currentReceipt) {
            return;
        }


        const shareText =

            "PocketPay Transaction Receipt\\n\\n" +

            "Status: Successful\\n" +

            "Reference: " +
            currentReceipt.reference +
            "\\n" +

            "Recipient: " +
            currentReceipt.recipient +
            "\\n" +

            "Bank: " +
            currentReceipt.bank +
            "\\n" +

            "Amount: " +
            formatCurrency(
                currentReceipt.amount
            ) +
            "\\n" +

            "Fee: " +
            formatCurrency(
                currentReceipt.fee
            ) +
            "\\n" +

            "Total: " +
            formatCurrency(
                currentReceipt.total
            ) +
            "\\n\\n" +

            "PocketPay";


        if (
            navigator.share
        ) {

            try {

                await navigator.share({

                    title:
                        "PocketPay Receipt",

                    text:
                        shareText

                });

            } catch (error) {

                // User cancelled share
                return;

            }

        } else {

            try {

                await navigator.clipboard.writeText(
                    shareText
                );

                showToast(
                    "Receipt copied to clipboard.",
                    "success"
                );

            } catch (error) {

                showToast(
                    "Unable to share receipt.",
                    "error"
                );

            }

        }

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