// ==============================
// Elements
// ==============================

const transactionList = document.getElementById("transactionList");
const searchInput = document.getElementById("searchInput");
const filter = document.getElementById("filter");

// ==============================
// Transactions
// ==============================

const transactions = [

    {
        type: "in",
        title: "Wallet Funding",
        amount: 50000,
        date: "Today • 10:30 AM"
    },

    {
        type: "out",
        title: "Sent to Fojude",
        amount: 5000,
        date: "Yesterday • 4:15 PM"
    },

    {
        type: "in",
        title: "Received from Precious",
        amount: 8500,
        date: "Monday • 8:40 AM"
    },

    {
        type: "out",
        title: "Bill Payment",
        amount: 2000,
        date: "Sunday • 7:10 PM"
    }

];

// ==============================
// Display Transactions
// ==============================

function displayTransactions() {

    transactionList.innerHTML = "";

    const search = searchInput.value.toLowerCase();

    const selectedFilter = filter.value;

    const filteredTransactions = transactions.filter(function (transaction) {

        const matchesSearch =
            transaction.title.toLowerCase().includes(search);

        const matchesFilter =
            selectedFilter === "all" ||
            transaction.type === selectedFilter;

        return matchesSearch && matchesFilter;

    });

    if (filteredTransactions.length === 0) {

        transactionList.innerHTML = `

            <div class="empty">

                <i class="fa-solid fa-inbox"></i>

                <h3>No Transactions Found</h3>

            </div>

        `;

        return;

    }

    filteredTransactions.forEach(function (transaction) {

        transactionList.innerHTML += `

            <div class="transaction">

                <div class="left">

                    <div class="icon">

                        <i class="fa-solid ${transaction.type === "in"
                            ? "fa-arrow-down"
                            : "fa-arrow-up"}"></i>

                    </div>

                    <div>

                        <h4>${transaction.title}</h4>

                        <p class="date">${transaction.date}</p>

                    </div>

                </div>

                <div>

                    <p class="amount ${transaction.type === "in"
                        ? "money-in"
                        : "money-out"}">

                        ${transaction.type === "in" ? "+" : "-"}

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