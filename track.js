document.addEventListener("DOMContentLoaded", function() {
  const orderIdInput = document.getElementById("orderIdInput");
  const trackBtn = document.getElementById("trackBtn");
  const statusMessage = document.getElementById("statusMessage");
  orderIdInput.addEventListener("input", function() {
    if (orderIdInput.value.trim().length > 0) {
      trackBtn.disabled = false;
      trackBtn.style.opacity = "1";
    } else {
      trackBtn.disabled = true;
      trackBtn.style.opacity = "0.5";
    }
  });
  trackBtn.addEventListener("click", function() {
    const orderId = orderIdInput.value.trim();
    if (!orderId) {
      showStatus("Please enter a valid Order ID.", "error");
      return;
    }
    const statuses = [
      "Order received and confirmed.",
      "Preparing your food.",
      "Out for delivery.",
      "Delivered successfully!"
    ];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    localStorage.setItem("lastOrderStatus", randomStatus);

    showStatus(`Order #${orderId}: ${randomStatus}`, "success");
  });
  function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.style.display = "block";
    statusMessage.style.color = type === "error" ? "#ff6b6b" : "#00ccbc";
    statusMessage.style.animation = "fadeIn 2s ease";
    setTimeout(function() {
      statusMessage.style.display = "none";
    }, 5000);
  }
  const savedStatus = localStorage.getItem("lastOrderStatus");
  if (savedStatus) {
    showStatus(`Last tracked order: ${savedStatus}`, "success");
  }
});