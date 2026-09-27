// ================================
// POCKETPAY RECEIVE MONEY
// ================================

// Get Elements
const copyBtn = document.getElementById("copyBtn");
const accountNumber = document.getElementById("accountNumber");
const downloadQRBtn = document.getElementById("downloadQRBtn");

// ================================
// COPY ACCOUNT NUMBER
// ================================

copyBtn.addEventListener("click", function () {

    const number = accountNumber.textContent.trim();

    navigator.clipboard.writeText(number)
        .then(function () {

            copyBtn.innerHTML = `
                <i class="fa-solid fa-check"></i>
                Copied!
            `;

            copyBtn.style.background = "#16a34a";

            setTimeout(function () {

                copyBtn.innerHTML = `
                    <i class="fa-regular fa-copy"></i>
                    Copy Number
                `;

                copyBtn.style.background = "#2563eb";

            }, 2000);

        })
        .catch(function () {

            alert("Unable to copy account number.");

        });

});


// ================================
// GENERATE QR CODE
// ================================

const accountText = accountNumber.textContent.trim();

new QRCode(document.getElementById("qrcode"), {
    text: `PocketPay|Shoyemi Olanrewaju Ahmed|${accountText}`,
    width: 180,
    height: 180
});


// ================================
// DOWNLOAD QR CODE
// ================================

downloadQRBtn.addEventListener("click", function () {

    const qrImage = document.querySelector("#qrcode img");

    if (qrImage) {

        const link = document.createElement("a");

        link.href = qrImage.src;
        link.download = "PocketPay-QRCode.png";

        link.click();

    }

});