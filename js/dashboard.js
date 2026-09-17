// ===========================
// Elements
// ===========================

const balance = document.getElementById("balance");
const toggleBtn = document.getElementById("toggleBalance");

// ===========================
// Wallet Balance Visibility
// ===========================

let balanceVisible =
    localStorage.getItem("balanceVisible") !== "false";

function loadBalance() {

    const walletBalance = getBalance();

    if (balanceVisible) {

        balance.textContent =
            "₦" + walletBalance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

        toggleBtn.innerHTML =
            '<i class="fa-regular fa-eye"></i> Hide Balance';

    } else {

        balance.textContent = "••••••••••";

        toggleBtn.innerHTML =
            '<i class="fa-regular fa-eye-slash"></i> Show Balance';
    }
}

loadBalance();

// ===========================
// Show / Hide Balance
// ===========================

toggleBtn.addEventListener("click", function () {

    balanceVisible = !balanceVisible;

    localStorage.setItem(
        "balanceVisible",
        balanceVisible
    );

    loadBalance();

});

// ===========================
// Quick Action Buttons
// ===========================

// Send Money

document.getElementById("sendMoney").addEventListener("click", function () {

    window.location.href = "sendmoney.html";

});

// Receive Money

document.getElementById("receiveMoney").addEventListener("click", function () {

    window.location.href = "receivemoney.html";

});

// Add Money

document.getElementById("addMoney").addEventListener("click", function () {

    window.location.href = "addmoney.html";

});

// Airtime & Data

document.getElementById("airtime").addEventListener("click", function () {

    window.location.href = "airtime.html";

});

// =====================================
// Recent Transactions
// =====================================

function loadRecentTransactions() {

    const container =
        document.getElementById("recentTransactions");

    if (!container) return;

    const transactions = getTransactions();

    container.innerHTML = "";

    if (transactions.length === 0) {

        container.innerHTML = `

        <p style="text-align:center;padding:20px;color:#777;">

            No transactions yet.

        </p>

        `;

        return;

    }

    const recent = transactions.slice(0, 3);

    recent.forEach(function (transaction) {

        const isMoneyIn =
            transaction.type === "deposit";

        container.innerHTML += `

        <div class="transaction">

            <div class="transaction-icon ${isMoneyIn ? "income" : "expense"}">

                <i class="fa-solid ${isMoneyIn ? "fa-arrow-down" : "fa-arrow-up"}"></i>

            </div>

            <div class="transaction-info">

                <h4>${transaction.title}</h4>

                <small>${transaction.date}</small>

            </div>

            <div class="amount ${isMoneyIn ? "positive" : "negative"}">

                ${isMoneyIn ? "+" : "-"}

                ₦${transaction.amount.toLocaleString(undefined, {

                    minimumFractionDigits: 2,

                    maximumFractionDigits: 2

                })}

            </div>

        </div>

        `;

    });

}

loadRecentTransactions();

// =====================================
// Dynamic Greeting
// =====================================

function loadGreeting() {

    const greeting =
        document.getElementById("greeting");

    if (!greeting) {

        return;

    }

    const hour =
        new Date().getHours();

    let message = "";

    if (hour < 12) {

        message = "Good Morning";

    }

    else if (hour < 18) {

        message = "Good Afternoon";

    }

    else {

        message = "Good Evening";

    }

    const profile =
        getProfile();

    greeting.textContent =
        `${message}, ${profile.name}`;

}

loadGreeting();

// =====================================
// Dashboard Profile Photo
// =====================================

const dashboardProfileImage =
    document.getElementById("dashboardProfileImage");

const savedPhoto =
    getProfilePhoto();

if (savedPhoto && dashboardProfileImage) {

    dashboardProfileImage.src =
        savedPhoto;

}