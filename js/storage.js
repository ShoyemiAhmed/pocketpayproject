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
// ===================================
// Add Money
// ===================================

function addMoney(amount) {

    const currentBalance = getBalance();

    const newBalance = currentBalance + amount;

    setBalance(newBalance);

}

// ===================================
// Deduct Money
// ===================================

function deductMoney(amount) {

    const currentBalance = getBalance();

    const newBalance = currentBalance - amount;

    setBalance(newBalance);

}
// ===================================
// Reset Wallet (Development Only)
// ===================================

function resetWallet() {

    setBalance(50000);

    localStorage.setItem(
        "transactions",
        JSON.stringify([])
    );

}

// ===================================
// User Profile
// ===================================

// Create default profile

if (localStorage.getItem("profile") === null) {

    localStorage.setItem(

        "profile",

        JSON.stringify({

            name: "Shoyemi Olanrewaju Ahmed",

            email: "ahmed@example.com",

            phone: "08012345678"

        })

    );

}

// Get Profile

function getProfile() {

    return JSON.parse(

        localStorage.getItem("profile")

    );

}

// Save Profile

function saveProfile(profile) {

    localStorage.setItem(

        "profile",

        JSON.stringify(profile)

    );

}
// ===================================
// Profile Photo
// ===================================

function getProfilePhoto(){

    return localStorage.getItem("profilePhoto");

}

function saveProfilePhoto(photo){

    localStorage.setItem(

        "profilePhoto",

        photo

    );

}