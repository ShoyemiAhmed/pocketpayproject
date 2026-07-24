// ===================================
// PocketPay Local Storage Manager
// ===================================

// Create wallet balance if it doesn't exist

if (localStorage.getItem("walletBalance") === null) {

    localStorage.setItem(
        "walletBalance",
        "50000"
    );

}

// Create transaction array

if (localStorage.getItem("transactions") === null) {

    localStorage.setItem(

        "transactions",

        JSON.stringify([])

    );

}



// ===================================
// Wallet Balance
// ===================================

function getBalance() {

    return Number(

        localStorage.getItem("walletBalance")

    );

}



function setBalance(balance) {

    localStorage.setItem(

        "walletBalance",

        balance

    );

}



// ===================================
// Transactions
// ===================================

function getTransactions() {

    return JSON.parse(

        localStorage.getItem("transactions")

    );

}



function saveTransaction(transaction) {

    const transactions = getTransactions();

    transactions.unshift(transaction);

    localStorage.setItem(

        "transactions",

        JSON.stringify(transactions)

    );

}