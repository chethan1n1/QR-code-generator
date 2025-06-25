let btn = document.querySelector(".button");
let qr_code_element = document.querySelector(".qr-code");

btn.addEventListener("click", () => {
  let user_input = document.querySelector("#input_text");

  if (user_input.value !== "") {
    if (qr_code_element.childElementCount !== 0) {
      qr_code_element.innerHTML = "";
    }
    generate(user_input);
  } else {
    console.log("Input is empty.");
    qr_code_element.style.display = "none";
  }
});

function generate(user_input) {
  qr_code_element.style.display = "block";
  qr_code_element.innerHTML = ""; // Clear previous QR

  // Generate QR Code
  let qrcode = new QRCode(qr_code_element, {
    text: `${user_input.value}`,
    width: 180,
    height: 180,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  // Wait for QR to render, then create download link
  setTimeout(() => {
    let qr_code_img = qr_code_element.querySelector("img");
    let qr_code_canvas = qr_code_element.querySelector("canvas");
    let dataURL = "";

    if (qr_code_img && qr_code_img.getAttribute("src")) {
      dataURL = qr_code_img.getAttribute("src");
    } else if (qr_code_canvas) {
      dataURL = qr_code_canvas.toDataURL("image/png");
    }

    // Create Download link
    let download_link = document.createElement("a");
    download_link.setAttribute("download", "qr_code.png");
    download_link.setAttribute("href", dataURL);
    download_link.classList.add("download-btn");
    download_link.innerText = "Download QR";

    qr_code_element.appendChild(download_link);
  }, 500);
}

// Dark/Light Theme Toggle
const toggleBtn = document.getElementById("toggle-theme");
const themeIcon = document.getElementById("theme-icon");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    themeIcon.textContent = "🌞";
  } else {
    themeIcon.textContent = "🌙";
  }
});

