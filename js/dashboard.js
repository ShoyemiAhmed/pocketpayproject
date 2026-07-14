const balance = document.getElementById("balance");
const toggleBtn = document.getElementById("toggleBalance");

let balanceVisible = true;

toggleBtn.addEventListener("click", function () {

    if (balanceVisible) {

        balance.textContent = "••••••••••";
        toggleBtn.textContent = "👁️ Show Balance";

    } else {

        balance.textContent = "₦1,200,000.00";
        toggleBtn.textContent = "🙈 Hide Balance";

    }

    balanceVisible = !balanceVisible;

})

document.getElementById("sendMoney").addEventListener("click", () => {
    alert("Send Money feature coming soon!");
});

document.getElementById("receiveMoney").addEventListener("click", () => {
    alert("Receive Money feature coming soon!");
});

document.getElementById("addMoney").addEventListener("click", () => {
    alert("Add Money feature coming soon!");
});

document.getElementById("airtime").addEventListener("click", () => {
    alert("Airtime Top Up feature coming soon!");
});