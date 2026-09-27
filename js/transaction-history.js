// =====================================
// POCKETPAY TRANSACTION HISTORY
// =====================================


// ==============================
// Elements
// ==============================

const transactionList =
    document.getElementById("transactionList");

const searchInput =
    document.getElementById("searchInput");

const filter =
    document.getElementById("filter");


// ==============================
// Create Details Modal
// ==============================

function createTransactionModal() {

    if (
        document.getElementById(
            "transactionDetailsModal"
        )
    ) {
        return;
    }


    const modal =
        document.createElement("div");

    modal.id =
        "transactionDetailsModal";

    modal.className =
        "transaction-details-modal";


    modal.innerHTML = `

        <div class="transaction-details-box">

            <div class="transaction-details-header">

                <h2>
                    Transaction Details
                </h2>

                <button
                    id="closeTransactionDetails"
                    class="close-transaction-details"
                    aria-label="Close"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>

            </div>


            <div
                id="transactionDetailsContent"
                class="transaction-details-content"
            ></div>


            <button
                id="closeTransactionDetailsBtn"
                class="transaction-details-close-btn"
            >
                Done
            </button>

        </div>

    `;


    document.body.appendChild(modal);


    // Close button
    document
        .getElementById(
            "closeTransactionDetails"
        )
        .addEventListener(
            "click",
            closeTransactionDetails
        );


    // Done button
    document
        .getElementById(
            "closeTransactionDetailsBtn"
        )
        .addEventListener(
            "click",
            closeTransactionDetails
        );


    // Click outside modal
    modal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === modal
            ) {

                closeTransactionDetails();

            }

        }
    );

}


// ==============================
// Close Details Modal
// ==============================

function closeTransactionDetails() {

    const modal =
        document.getElementById(
            "transactionDetailsModal"
        );

    if (!modal) return;

    modal.classList.remove("show");

}


// ==============================
// Transaction Type
// ==============================

function getTransactionInfo(
    transaction
) {

    // Deposit
    if (
        transaction.type ===
        "deposit"
    ) {

        return {

            label: "Wallet Funding",

            icon:
                "fa-arrow-down",

            iconClass:
                "deposit-icon",

            direction:
                "Money In",

            sign:
                "+"

        };

    }


    // Transfer
    if (
        transaction.type ===
        "transfer"
    ) {

        return {

            label: "Bank Transfer",

            icon:
                "fa-money-bill-transfer",

            iconClass:
                "transfer-icon",

            direction:
                "Money Out",

            sign:
                "-"

        };

    }


    // Airtime / Data
    if (
        transaction.type ===
        "airtime"
    ) {

        const title =
            (
                transaction.title ||
                ""
            ).toLowerCase();


        if (
            title.includes("data")
        ) {

            return {

                label:
                    "Data Purchase",

                icon:
                    "fa-wifi",

                iconClass:
                    "data-icon",

                direction:
                    "Money Out",

                sign:
                    "-"

            };

        }


        return {

            label:
                "Airtime Purchase",

            icon:
                "fa-mobile-screen-button",

            iconClass:
                "airtime-icon",

            direction:
                "Money Out",

            sign:
                "-"

        };

    }


    // Default
    return {

        label:
            transaction.title ||
            "Transaction",

        icon:
            "fa-receipt",

        iconClass:
            "default-icon",

        direction:
            "Money Out",

        sign:
            "-"

    };

}


// ==============================
// Display Transactions
// ==============================

function displayTransactions() {

    transactionList.innerHTML = "";


    const transactions =
        getTransactions();


    const search =
        searchInput.value
            .trim()
            .toLowerCase();


    const selectedFilter =
        filter.value;


    const filteredTransactions =
        transactions.filter(
            function (transaction) {


                // ==============================
                // Search Everything
                // ==============================

                const searchableText = [

                    transaction.title,

                    transaction.type,

                    transaction.bank,

                    transaction.network,

                    transaction.phone,

                    transaction.method,

                    transaction.date

                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();


                const matchesSearch =
                    searchableText.includes(
                        search
                    );


                // ==============================
                // Filter
                // ==============================

                let matchesFilter =
                    true;


                if (
                    selectedFilter ===
                    "in"
                ) {

                    matchesFilter =
                        transaction.type ===
                        "deposit";

                }


                if (
                    selectedFilter ===
                    "out"
                ) {

                    matchesFilter =

                        transaction.type ===
                        "transfer"

                        ||

                        transaction.type ===
                        "airtime";

                }


                return (
                    matchesSearch &&
                    matchesFilter
                );

            }
        );


    // ==============================
    // Empty State
    // ==============================

    if (
        filteredTransactions.length ===
        0
    ) {

        transactionList.innerHTML = `

            <div class="empty">

                <i class="fa-solid fa-inbox"></i>

                <h3>
                    No Transactions Found
                </h3>

                <p>
                    Try another search or filter.
                </p>

            </div>

        `;

        return;

    }


    // ==============================
    // Display Transactions
    // ==============================

    filteredTransactions.forEach(
        function (transaction) {


            const info =
                getTransactionInfo(
                    transaction
                );


            const formattedAmount =
                Number(
                    transaction.amount
                ).toLocaleString(
                    undefined,
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }
                );


            const transactionElement =
                document.createElement("div");


            transactionElement.className =
                "transaction";


            transactionElement.innerHTML = `

                <div class="left">

                    <div
                        class="
                            icon
                            ${info.iconClass}
                        "
                    >

                        <i
                            class="
                                fa-solid
                                ${info.icon}
                            "
                        ></i>

                    </div>


                    <div>

                        <h4>
                            ${
                                transaction.title ||
                                info.label
                            }
                        </h4>

                        <p class="date">

                            ${
                                transaction.date
                            }

                        </p>

                    </div>

                </div>


                <div class="transaction-right">

                    <p
                        class="
                            amount
                            ${
                                info.direction ===
                                "Money In"
                                    ? "money-in"
                                    : "money-out"
                            }
                        "
                    >

                        ${info.sign}
                        ₦${formattedAmount}

                    </p>


                    <span class="status">

                        Completed

                    </span>

                </div>

            `;


            // ==============================
            // Click Transaction
            // ==============================

            transactionElement.addEventListener(
                "click",
                function () {

                    showTransactionDetails(
                        transaction
                    );

                }
            );


            transactionList.appendChild(
                transactionElement
            );

        }
    );

}


// ==============================
// Show Transaction Details
// ==============================

function showTransactionDetails(
    transaction
) {

    createTransactionModal();


    const modal =
        document.getElementById(
            "transactionDetailsModal"
        );


    const content =
        document.getElementById(
            "transactionDetailsContent"
        );


    const info =
        getTransactionInfo(
            transaction
        );


    const formattedAmount =
        Number(
            transaction.amount
        ).toLocaleString(
            undefined,
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );


    let extraDetails = "";


    // Deposit details
    if (
        transaction.type ===
        "deposit"
    ) {

        extraDetails = `

            <div class="detail-row">

                <span>
                    Payment Method
                </span>

                <strong>
                    ${
                        transaction.method ||
                        "Not available"
                    }
                </strong>

            </div>

        `;

    }


    // Transfer details
    if (
        transaction.type ===
        "transfer"
    ) {

        extraDetails = `

            <div class="detail-row">

                <span>
                    Recipient
                </span>

                <strong>
                    ${
                        transaction.title
                            ?.replace(
                                "Transfer to ",
                                ""
                            ) ||
                        "Not available"
                    }
                </strong>

            </div>


            <div class="detail-row">

                <span>
                    Bank
                </span>

                <strong>
                    ${
                        transaction.bank ||
                        "Not available"
                    }
                </strong>

            </div>

        `;

    }


    // Airtime/Data details
    if (
        transaction.type ===
        "airtime"
    ) {

        extraDetails = `

            <div class="detail-row">

                <span>
                    Network
                </span>

                <strong>
                    ${
                        transaction.network ||
                        "Not available"
                    }
                </strong>

            </div>


            <div class="detail-row">

                <span>
                    Phone Number
                </span>

                <strong>
                    ${
                        transaction.phone ||
                        "Not available"
                    }
                </strong>

            </div>

        `;

    }


    content.innerHTML = `

        <div class="transaction-detail-icon">

            <i
                class="
                    fa-solid
                    ${info.icon}
                "
            ></i>

        </div>


        <h3 class="transaction-detail-title">

            ${
                transaction.title ||
                info.label
            }

        </h3>


        <div
            class="
                transaction-detail-amount
                ${
                    info.direction ===
                    "Money In"
                        ? "money-in"
                        : "money-out"
                }
            "
        >

            ${info.sign}
            ₦${formattedAmount}

        </div>


        <div class="transaction-status">

            <i
                class="fa-solid fa-circle-check"
            ></i>

            Completed

        </div>


        <div class="transaction-detail-list">

            <div class="detail-row">

                <span>
                    Transaction Type
                </span>

                <strong>
                    ${info.label}
                </strong>

            </div>


            <div class="detail-row">

                <span>
                    Direction
                </span>

                <strong>
                    ${info.direction}
                </strong>

            </div>


            <div class="detail-row">

                <span>
                    Date & Time
                </span>

                <strong>
                    ${
                        transaction.date
                    }
                </strong>

            </div>


            ${extraDetails}

        </div>

    `;


    modal.classList.add(
        "show"
    );

}


// ==============================
// Events
// ==============================

searchInput.addEventListener(
    "input",
    displayTransactions
);


filter.addEventListener(
    "change",
    displayTransactions
);


// ==============================
// Escape Key
// ==============================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key ===
            "Escape"
        ) {

            closeTransactionDetails();

        }

    }
);


// ==============================
// Initial Load
// ==============================

displayTransactions();