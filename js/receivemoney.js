// Get Elements
const copyBtn = document.getElementById("copyBtn");
const accountNumber = document.getElementById("accountNumber");

// Copy Account Number
copyBtn.addEventListener("click", function () {

    navigator.clipboard.writeText(accountNumber.textContent);

    // Change button text
    copyBtn.innerHTML = `
        <i class="fa-solid fa-check"></i>
        Copied!
    `;

    // Change button color
    copyBtn.style.background = "#16a34a";

    // Restore after 2 seconds
    setTimeout(function () {

        copyBtn.innerHTML = `
            <i class="fa-regular fa-copy"></i>
            Copy Number
        `;

        copyBtn.style.background = "#2563eb";

    }, 2000);

});

new QRCode(document.getElementById("qrcode"), {
    text: "PocketPay|Shoyemi Ahmed|9023456789",
    width: 180,
    height: 180
});
const downloadQRBtn = document.getElementById("downloadQRBtn");

downloadQRBtn.addEventListener("click", function () {

    const qrImage = document.querySelector("#qrcode img");

    if (qrImage) {

        const link = document.createElement("a");

        link.href = qrImage.src;
        link.download = "PocketPay-QRCode.png";

        link.click();

    }

});