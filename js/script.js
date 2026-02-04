const counter = document.getElementById("relation-counter");
const startDate = new Date(2025, 11, 12, 18, 0, 0);

function update() {
  const now = new Date();
  const diff = now - startDate;

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000) % 24;
  const minutes = Math.floor(diff / 60000) % 60;
  const seconds = Math.floor(diff / 1000) % 60;

  counter.innerHTML = `
    <strong>Zusammen seit:</strong><br>
    ${days} Tage ${hours} Std ${minutes} Min ${seconds} Sek ❤️
  `;
}

update();
setInterval(update, 1000);
