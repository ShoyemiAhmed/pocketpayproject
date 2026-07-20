// =====================================
// PocketPay - Add Money
// =====================================


// =====================================
// FORM ELEMENTS
// =====================================

const form = document.getElementById("addMoneyForm");

const amountInput = document.getElementById("amount");
const paymentMethod = document.getElementById("paymentMethod");


// =====================================
// SUMMARY ELEMENTS
// =====================================

const summaryAmount = document.getElementById("summaryAmount");
const summaryMethod = document.getElementById("summaryMethod");
const summaryTotal = document.getElementById("summaryTotal");


// =====================================
// CONFIRMATION MODAL
// =====================================

const confirmModal = document.getElementById("confirmModal");

const modalAmount = document.getElementById("modalAmount");
const modalMethod = document.getElementById("modalMethod");
const modalTotal = document.getElementById("modalTotal");

const cancelBtn = document.getElementById("cancelBtn");
const confirmBtn = document.getElementById("confirmBtn");


// =====================================
// PROCESSING MODAL
// =====================================

const loadingModal = document.getElementById("loadingModal");


// =====================================
// SUCCESS RECEIPT
// =====================================

const successModal = document.getElementById("successModal");

const receiptReference = document.getElementById("receiptReference");
const receiptAmount = document.getElementById("receiptAmount");
const receiptMethod = document.getElementById("receiptMethod");
const receiptTotal = document.getElementById("receiptTotal");

const backDashboardBtn = document.getElementById("backDashboardBtn");



// =====================================
// LIVE SUMMARY
// =====================================

function updateSummary(){

    const amount = Number(amountInput.value);

    if(amount > 0){

        summaryAmount.textContent =
        "₦" + amount.toLocaleString(undefined,{
            minimumFractionDigits:2,
            maximumFractionDigits:2
        });

        summaryTotal.textContent =
        "₦" + amount.toLocaleString(undefined,{
            minimumFractionDigits:2,
            maximumFractionDigits:2
        });

    }

    else{

        summaryAmount.textContent = "₦0.00";
        summaryTotal.textContent = "₦0.00";

    }

    summaryMethod.textContent =
    paymentMethod.value || "-";

}



// =====================================
// UPDATE SUMMARY
// =====================================

amountInput.addEventListener("input", updateSummary);

paymentMethod.addEventListener("change", updateSummary);




// =====================================
// FORM VALIDATION
// =====================================

form.addEventListener("submit", function(event){

    event.preventDefault();


    // Clear previous errors

    document.querySelectorAll(".error").forEach(function(error){

        error.textContent = "";

    });


    let isValid = true;


    const amount = amountInput.value.trim();

    const method = paymentMethod.value;



    if(amount === "" || Number(amount) <= 0){

        document.getElementById("amountError").textContent =
        "Please enter a valid amount.";

        isValid = false;

    }



    if(method === ""){

        document.getElementById("paymentError").textContent =
        "Please select a payment method.";

        isValid = false;

    }



    if(isValid){

        modalAmount.textContent =
        "₦" + Number(amount).toLocaleString(undefined,{
            minimumFractionDigits:2,
            maximumFractionDigits:2
        });

        modalMethod.textContent = method;

        modalTotal.textContent =
        "₦" + Number(amount).toLocaleString(undefined,{
            minimumFractionDigits:2,
            maximumFractionDigits:2
        });

        confirmModal.style.display = "flex";

    }

});
// =====================================
// CANCEL DEPOSIT
// =====================================

cancelBtn.addEventListener("click", function () {

    confirmModal.style.display = "none";

});



// =====================================
// CONFIRM DEPOSIT
// =====================================

confirmBtn.addEventListener("click", function () {

    // Hide confirmation modal
    confirmModal.style.display = "none";

    // Show processing screen
    loadingModal.style.display = "flex";


    setTimeout(function () {

        // Hide processing
        loadingModal.style.display = "none";


        const amount = Number(amountInput.value);

        const method = paymentMethod.value;


        // Generate transaction reference
        const reference = "PP" + Date.now();


        receiptReference.textContent = reference;


        receiptAmount.textContent =
            "₦" + amount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });


        receiptMethod.textContent = method;


        receiptTotal.textContent =
            "₦" + amount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });


        // Show success receipt
        successModal.style.display = "flex";


        // Reset form
        form.reset();


        // Reset summary
        summaryAmount.textContent = "₦0.00";
        summaryMethod.textContent = "-";
        summaryTotal.textContent = "₦0.00";

    }, 2000);

});



// =====================================
// BACK TO DASHBOARD
// =====================================

backDashboardBtn.addEventListener("click", function () {

    window.location.href = "dashboard.html";

});