// ===========================
// POCKETPAY - AIRTIME & DATA
// ===========================


// ===========================
// Elements
// ===========================

const form =
    document.getElementById("airtimeForm");

const service =
    document.getElementById("service");

const network =
    document.getElementById("network");

const phone =
    document.getElementById("phone");

const amount =
    document.getElementById("amount");


// ===========================
// Summary
// ===========================

const summaryService =
    document.getElementById("summaryService");

const summaryNetwork =
    document.getElementById("summaryNetwork");

const summaryPhone =
    document.getElementById("summaryPhone");

const summaryAmount =
    document.getElementById("summaryAmount");


// ===========================
// Confirmation Modal
// ===========================

const confirmModal =
    document.getElementById("confirmModal");

const modalService =
    document.getElementById("modalService");

const modalNetwork =
    document.getElementById("modalNetwork");

const modalPhone =
    document.getElementById("modalPhone");

const modalAmount =
    document.getElementById("modalAmount");

const cancelBtn =
    document.getElementById("cancelBtn");

const confirmBtn =
    document.getElementById("confirmBtn");


// ===========================
// Loading Modal
// ===========================

const loadingModal =
    document.getElementById("loadingModal");


// ===========================
// Receipt
// ===========================

const successModal =
    document.getElementById("successModal");

const reference =
    document.getElementById("reference");

const receiptService =
    document.getElementById("receiptService");

const receiptNetwork =
    document.getElementById("receiptNetwork");

const receiptPhone =
    document.getElementById("receiptPhone");

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


// ===========================
// Current Receipt
// ===========================

let currentReceipt = null;


// ===========================
// Format Money
// ===========================

function formatMoney(value) {

    return "₦" +
        Number(value).toLocaleString(
            undefined,
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );
}


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


    const value =
        Number(amount.value);


    if (value > 0) {

        summaryAmount.textContent =
            formatMoney(value);

    } else {

        summaryAmount.textContent =
            "₦0.00";

    }

}


service.addEventListener(
    "change",
    updateSummary
);

network.addEventListener(
    "change",
    updateSummary
);

phone.addEventListener(
    "input",
    updateSummary
);

amount.addEventListener(
    "input",
    updateSummary
);


// ===========================
// Form Submit
// ===========================

form.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        // Clear errors

        document
            .querySelectorAll(".error")
            .forEach(function (error) {

                error.textContent = "";

            });


        let valid = true;


        // ===========================
        // Service Validation
        // ===========================

        if (service.value === "") {

            document.getElementById(
                "serviceError"
            ).textContent =
                "Select a service.";

            valid = false;

        }


        // ===========================
        // Network Validation
        // ===========================

        if (network.value === "") {

            document.getElementById(
                "networkError"
            ).textContent =
                "Select a network.";

            valid = false;

        }


        // ===========================
        // Phone Validation
        // ===========================

        if (
            phone.value.length !== 11 ||
            isNaN(phone.value)
        ) {

            document.getElementById(
                "phoneError"
            ).textContent =
                "Enter a valid phone number.";

            valid = false;

        }


        // ===========================
        // Amount Validation
        // ===========================

        if (
            amount.value === "" ||
            Number(amount.value) <= 0
        ) {

            document.getElementById(
                "amountError"
            ).textContent =
                "Enter a valid amount.";

            valid = false;

        }


        if (!valid) {

            return;

        }


        // ===========================
        // Confirmation Modal
        // ===========================

        modalService.textContent =
            service.value;

        modalNetwork.textContent =
            network.value;

        modalPhone.textContent =
            phone.value;

        modalAmount.textContent =
            formatMoney(
                Number(amount.value)
            );


        confirmModal.style.display =
            "flex";

    }
);


// ===========================
// Cancel
// ===========================

cancelBtn.addEventListener(
    "click",
    function () {

        confirmModal.style.display =
            "none";

    }
);


// ===========================
// Confirm Purchase
// ===========================

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

                    const purchaseAmount =
                        Number(amount.value);

                    const selectedService =
                        service.value;

                    const selectedNetwork =
                        network.value;

                    const selectedPhone =
                        phone.value;


                    // ===========================
                    // Check Balance
                    // ===========================

                    if (
                        purchaseAmount >
                        getBalance()
                    ) {

                        loadingModal.style.display =
                            "none";


                        showToast(
                            "Insufficient wallet balance.",
                            "error"
                        );


                        confirmBtn.disabled =
                            false;

                        return;

                    }


                    // ===========================
                    // Deduct Balance
                    // ===========================

                    deductMoney(
                        purchaseAmount
                    );


                    // ===========================
                    // Generate Reference
                    // ===========================

                    const transactionReference =
                        "PP" + Date.now();


                    const transactionDate =
                        new Date();


                    const formattedDate =
                        transactionDate.toLocaleString();


                    // ===========================
                    // Determine Purchase Type
                    // ===========================

                    const purchaseType =
                        selectedService
                            .toLowerCase()
                            .includes("data")
                            ? "Data"
                            : "Airtime";


                    // ===========================
                    // Save Transaction
                    // ===========================

                    saveTransaction({

                        type: "airtime",

                        title:
                            selectedService +
                            " Purchase",

                        amount:
                            purchaseAmount,

                        total:
                            purchaseAmount,

                        fee:
                            0,

                        service:
                            selectedService,

                        network:
                            selectedNetwork,

                        phone:
                            selectedPhone,

                        reference:
                            transactionReference,

                        date:
                            formattedDate

                    });


                    // ===========================
                    // Notification
                    // ===========================

                    if (
                        typeof addNotification ===
                        "function"
                    ) {

                        addNotification(

                            purchaseType +
                            " Purchase Successful",

                            formatMoney(
                                purchaseAmount
                            ) +
                            " " +
                            purchaseType.toLowerCase() +
                            " purchase was successful for " +
                            selectedPhone +
                            " on " +
                            selectedNetwork +
                            ".",

                            "money"

                        );

                    }


                    // ===========================
                    // Store Receipt
                    // ===========================

                    currentReceipt = {

                        reference:
                            transactionReference,

                        service:
                            selectedService,

                        network:
                            selectedNetwork,

                        phone:
                            selectedPhone,

                        amount:
                            purchaseAmount,

                        fee:
                            0,

                        total:
                            purchaseAmount,

                        date:
                            formattedDate

                    };


                    // ===========================
                    // Fill Receipt
                    // ===========================

                    reference.textContent =
                        transactionReference;

                    receiptService.textContent =
                        selectedService;

                    receiptNetwork.textContent =
                        selectedNetwork;

                    receiptPhone.textContent =
                        selectedPhone;

                    receiptAmount.textContent =
                        formatMoney(
                            purchaseAmount
                        );

                    receiptTotal.textContent =
                        formatMoney(
                            purchaseAmount
                        );

                    receiptDate.textContent =
                        formattedDate;


                    // ===========================
                    // Hide Loading
                    // ===========================

                    loadingModal.style.display =
                        "none";


                    // ===========================
                    // Show Receipt
                    // ===========================

                    successModal.style.display =
                        "flex";


                    // ===========================
                    // Toast
                    // ===========================

                    showToast(

                        purchaseType +
                        " purchase successful!",

                        "success"

                    );


                    // ===========================
                    // Reset Form
                    // ===========================

                    form.reset();

                    updateSummary();


                } catch (error) {

                    console.error(
                        "Purchase Error:",
                        error
                    );


                    loadingModal.style.display =
                        "none";


                    showToast(
                        "Something went wrong while processing the purchase.",
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


// ===========================
// Save / Print Receipt
// ===========================

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
                    PocketPay Purchase Receipt
                </title>


                <style>

                    body {

                        font-family:
                            Arial, sans-serif;

                        padding: 30px;

                        max-width: 500px;

                        margin: auto;

                    }


                    .receipt {

                        border:
                            1px solid #ddd;

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

                        justify-content:
                            space-between;

                        gap: 20px;

                        padding: 10px 0;

                        border-bottom:
                            1px solid #eee;

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

                        Airtime & Data Receipt

                    </div>


                    <div class="success">

                        ✓ Purchase Successful

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
                            Service
                        </span>

                        <strong>
                            ${currentReceipt.service}
                        </strong>

                    </div>


                    <div class="row">

                        <span>
                            Network
                        </span>

                        <strong>
                            ${currentReceipt.network}
                        </strong>

                    </div>


                    <div class="row">

                        <span>
                            Phone Number
                        </span>

                        <strong>
                            ${currentReceipt.phone}
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
                            Fee
                        </span>

                        <strong>
                            ${formatMoney(
                                currentReceipt.fee
                            )}
                        </strong>

                    </div>


                    <div class="row total">

                        <span>
                            Total
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


// ===========================
// Share Receipt
// ===========================

shareReceiptBtn.addEventListener(
    "click",
    async function () {

        if (!currentReceipt) {
            return;
        }


        const shareText =

            "PocketPay Purchase Receipt\\n\\n" +

            "Status: Successful\\n" +

            "Reference: " +
            currentReceipt.reference +
            "\\n" +

            "Service: " +
            currentReceipt.service +
            "\\n" +

            "Network: " +
            currentReceipt.network +
            "\\n" +

            "Phone Number: " +
            currentReceipt.phone +
            "\\n" +

            "Amount: " +
            formatMoney(
                currentReceipt.amount
            ) +
            "\\n" +

            "Total: " +
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
                        "PocketPay Purchase Receipt",

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


// ===========================
// Back to Dashboard
// ===========================

backDashboardBtn.addEventListener(
    "click",
    function () {

        window.location.href =
            "dashboard.html";

    }
);


// ===========================
// Start
// ===========================

updateSummary();