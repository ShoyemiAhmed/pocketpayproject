// ==============================
// Elements
// ==============================

const transactionList = document.getElementById("transactionList");
const searchInput = document.getElementById("searchInput");
const filter = document.getElementById("filter");


// ==============================
// Display Transactions
// ==============================

function displayTransactions() {

    transactionList.innerHTML = "";

    // Get transactions from Local Storage
    const transactions = getTransactions();

    const search = searchInput.value.toLowerCase();

    const selectedFilter = filter.value;

    const filteredTransactions = transactions.filter(function (transaction) {

        const matchesSearch =
            transaction.title.toLowerCase().includes(search);

        let matchesFilter = true;

        if (selectedFilter === "in") {

            matchesFilter =
                transaction.type === "deposit";

        }

        if (selectedFilter === "out") {

            matchesFilter =
                transaction.type === "transfer" ||
                transaction.type === "airtime";

        }

        return matchesSearch && matchesFilter;

    });


    // ==============================
    // Empty State
    // ==============================

    if (filteredTransactions.length === 0) {

        transactionList.innerHTML = `

            <div class="empty">

                <i class="fa-solid fa-inbox"></i>

                <h3>No Transactions Found</h3>

            </div>

        `;

        return;

    }


    // ==============================
    // Display Transactions
    // ==============================

    filteredTransactions.forEach(function (transaction) {

        const isMoneyIn =
            transaction.type === "deposit";

        transactionList.innerHTML += `

        <div class="transaction">

            <div class="left">

                <div class="icon">

                    <i class="fa-solid ${isMoneyIn
                        ? "fa-arrow-down"
                        : "fa-arrow-up"}"></i>

                </div>

                <div>

                    <h4>${transaction.title}</h4>

                    <p class="date">

                        ${transaction.date}

                    </p>

                </div>

            </div>

            <div>

                <p class="amount ${isMoneyIn
                    ? "money-in"
                    : "money-out"}">

                    ${isMoneyIn ? "+" : "-"}

                    ₦${transaction.amount.toLocaleString()}

                </p>

                <span class="status">

                    Completed

                </span>

            </div>

        </div>

        `;

    });

}


// ==============================
// Events
// ==============================

searchInput.addEventListener("input", displayTransactions);

filter.addEventListener("change", displayTransactions);


// ==============================
// Initial Load
// ==============================

displayTransactions();