const form = document.getElementById("sendMoneyForm");

// Transfer Summary Elements
const recipientInput = document.getElementById("recipient");
const bankInput = document.getElementById("bank");
const amountInput = document.getElementById("amount");

const summaryRecipient = document.getElementById("summaryRecipient");
const summaryBank = document.getElementById("summaryBank");
const summaryAmount = document.getElementById("summaryAmount");
const summaryTotal = document.getElementById("summaryTotal");

const transferFee = 10;

// Modal Elements
const confirmModal = document.getElementById("confirmModal");
const modalRecipient = document.getElementById("modalRecipient");
const modalBank = document.getElementById("modalBank");
const modalAmount = document.getElementById("modalAmount");
const modalTotal = document.getElementById("modalTotal");

const cancelBtn = document.getElementById("cancelBtn");
const confirmBtn = document.getElementById("confirmBtn");

function updateSummary() {

    // Recipient
    summaryRecipient.textContent =
        recipientInput.value || "-";

    // Bank
    summaryBank.textContent =
        bankInput.value || "-";

    // Amount
    const amount = Number(amountInput.value);

    if (amount > 0) {

        summaryAmount.textContent =
            "₦" + amount.toLocaleString();

        summaryTotal.textContent =
            "₦" + (amount + transferFee).toLocaleString();

    } else {

        summaryAmount.textContent = "₦0.00";
        summaryTotal.textContent = "₦10.00";

    }

}
recipientInput.addEventListener("input", updateSummary);

bankInput.addEventListener("change", updateSummary);

amountInput.addEventListener("input", updateSummary);
 
form.addEventListener("submit", function(event){

    event.preventDefault();
     
    cancelBtn.addEventListener("click", function () {
    confirmModal.style.display = "none";

    confirmBtn.addEventListener("click", function () {

    confirmModal.style.display = "none";

    alert("🎉 Transfer Successful!");

});
});

    // Clear previous errors
    document.querySelectorAll(".error").forEach(error=>{
        error.textContent="";
    });

    let isValid = true;

    const recipient = document.getElementById("recipient").value.trim();
    const bank = document.getElementById("bank").value;
    const accountNumber = document.getElementById("accountNumber").value.trim();
    const amount = document.getElementById("amount").value.trim();

    if(recipient===""){
        document.getElementById("recipientError").textContent =
        "Recipient name is required.";
        isValid = false;
    }

    if(bank===""){
        document.getElementById("bankError").textContent =
        "Please select a bank.";
        isValid = false;
    }

    if(accountNumber.length !==10 || isNaN(accountNumber)){
        document.getElementById("accountError").textContent =
        "Account number must be 10 digits.";
        isValid = false;
    }

    if(amount==="" || Number(amount)<=0){
        document.getElementById("amountError").textContent =
        "Enter a valid amount.";
        isValid = false;
    }

    if (isValid) {

         modalRecipient.textContent = recipient;
         modalBank.textContent = bank;

         const total = Number(amount) + transferFee;

    modalAmount.textContent =
         "₦" + Number(amount).toLocaleString();

    modalTotal.textContent =
        "₦" + total.toLocaleString();

    confirmModal.style.display = "flex";
}

});