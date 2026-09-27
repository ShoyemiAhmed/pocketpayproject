// =====================================
// POCKETPAY - ADD MONEY
// =====================================


// =====================================
// FORM ELEMENTS
// =====================================

const form =
    document.getElementById("addMoneyForm");

const amountInput =
    document.getElementById("amount");

const paymentMethod =
    document.getElementById("paymentMethod");


// =====================================
// SUMMARY
// =====================================

const summaryAmount =
    document.getElementById("summaryAmount");

const summaryMethod =
    document.getElementById("summaryMethod");

const summaryTotal =
    document.getElementById("summaryTotal");


// =====================================
// CONFIRMATION MODAL
// =====================================

const confirmModal =
    document.getElementById("confirmModal");

const modalAmount =
    document.getElementById("modalAmount");

const modalMethod =
    document.getElementById("modalMethod");

const modalTotal =
    document.getElementById("modalTotal");

const cancelBtn =
    document.getElementById("cancelBtn");

const confirmBtn =
    document.getElementById("confirmBtn");


// =====================================
// LOADING MODAL
// =====================================

const loadingModal =
    document.getElementById("loadingModal");


// =====================================
// SUCCESS / RECEIPT
// =====================================

const successModal =
    document.getElementById("successModal");

const receiptReference =
    document.getElementById("receiptReference");

const receiptAmount =
    document.getElementById("receiptAmount");

const receiptMethod =
    document.getElementById("receiptMethod");

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


// =====================================
// CURRENT RECEIPT
// =====================================

let currentReceipt = null;


// =====================================
// FORMAT MONEY
// =====================================

function formatMoney(amount) {

    return "₦" +
        Number(amount).toLocaleString(
            undefined,
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );
}


// =====================================
// UPDATE SUMMARY
// =====================================

function updateSummary() {

    const amount =
        Number(amountInput.value);


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


        // Amount validation

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


        // Payment method validation

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
// CANCEL
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

        confirmModal.style.display =
            "none";


        loadingModal.style.display =
            "flex";


        confirmBtn.disabled =
            true;


        setTimeout(
            function () {

                try {

                    const amount =
                        Number(amountInput.value);

                    const method =
                        paymentMethod.value;


                    // =================================
                    // UPDATE WALLET
                    // =================================

                    addMoney(amount);


                    // =================================
                    // GENERATE REFERENCE
                    // =================================

                    const reference =
                        "PP" + Date.now();


                    const transactionDate =
                        new Date();


                    const formattedDate =
                        transactionDate.toLocaleString();


                    // =================================
                    // SAVE TRANSACTION
                    // =================================

                    saveTransaction({

                        type: "deposit",

                        title:
                            "Wallet Funding",

                        amount:
                            amount,

                        fee:
                            0,

                        total:
                            amount,

                        method:
                            method,

                        reference:
                            reference,

                        date:
                            formattedDate

                    });


                    // =================================
                    // NOTIFICATION
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
                    // RECEIPT DATA
                    // =================================

                    currentReceipt = {

                        reference:
                            reference,

                        amount:
                            amount,

                        method:
                            method,

                        fee:
                            0,

                        total:
                            amount,

                        date:
                            formattedDate

                    };


                    // =================================
                    // FILL RECEIPT
                    // =================================

                    receiptReference.textContent =
                        reference;

                    receiptAmount.textContent =
                        formatMoney(amount);

                    receiptMethod.textContent =
                        method;

                    receiptTotal.textContent =
                        formatMoney(amount);

                    receiptDate.textContent =
                        formattedDate;


                    // =================================
                    // HIDE LOADING
                    // =================================

                    loadingModal.style.display =
                        "none";


                    // =================================
                    // SHOW RECEIPT
                    // =================================

                    successModal.style.display =
                        "flex";


                    // =================================
                    // TOAST
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
                    // RESET FORM
                    // =================================

                    form.reset();

                    summaryAmount.textContent =
                        "₦0.00";

                    summaryMethod.textContent =
                        "-";

                    summaryTotal.textContent =
                        "₦0.00";


                } catch (error) {

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
// SAVE / PRINT RECEIPT
// =====================================

downloadReceiptBtn.addEventListener(
    "click",
    function () {

        if (!currentReceipt) {
            return;
        }


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
                    PocketPay Deposit Receipt
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
                        Deposit Receipt
                    </div>

                    <div class="success">
                        ✓ Deposit Successful
                    </div>


                    <div class="row">

                        <span>
                            Reference
                        </span>

                        <strong>
                            ${currentReceipt.reference}
                        </strong>

                    </div>


                    <div class="row">

                        <span>
                            Amount
                        </span>

                        <strong>
                            ${formatMoney(
                                currentReceipt.amount
                            )}
                        </strong>

                    </div>


                    <div class="row">

                        <span>
                            Payment Method
                        </span>

                        <strong>
                            ${currentReceipt.method}
                        </strong>

                    </div>


                    <div class="row">

                        <span>
                            Processing Fee
                        </span>

                        <strong>
                            ${formatMoney(
                                currentReceipt.fee
                            )}
                        </strong>

                    </div>


                    <div class="row total">

                        <span>
                            Total Credited
                        </span>

                        <strong>
                            ${formatMoney(
                                currentReceipt.total
                            )}
                        </strong>

                    </div>


                    <div class="row">

                        <span>
                            Date
                        </span>

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


// =====================================
// SHARE RECEIPT
// =====================================

shareReceiptBtn.addEventListener(
    "click",
    async function () {

        if (!currentReceipt) {
            return;
        }


        const shareText =

            "PocketPay Deposit Receipt\\n\\n" +

            "Status: Successful\\n" +

            "Reference: " +
            currentReceipt.reference +
            "\\n" +

            "Amount: " +
            formatMoney(
                currentReceipt.amount
            ) +
            "\\n" +

            "Payment Method: " +
            currentReceipt.method +
            "\\n" +

            "Processing Fee: " +
            formatMoney(
                currentReceipt.fee
            ) +
            "\\n" +

            "Total Credited: " +
            formatMoney(
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
                        "PocketPay Deposit Receipt",

                    text:
                        shareText

                });

            } catch (error) {

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