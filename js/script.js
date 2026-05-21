const counter = document.getElementById("relation-counter");
const startDate = new Date(2025, 11, 12, 16, 0, 0);

function update() {
  const now = new Date();
  const diff = now - startDate;

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000) % 24;
  const minutes = Math.floor(diff / 60000) % 60;
  const seconds = Math.floor(diff / 1000) % 60;

  counter.innerHTML = `
    <strong>Zusammen seit:</strong><br>
    ${days} Tagen ${hours} Std ${minutes} Min ${seconds} Sek ❤️
  `;
}

const uv_banner = document.querySelector('#uv-banner');

const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    return (await res).json();
  } catch(err) {
    console.log(err);
  }
}

navigator.geolocation.getCurrentPosition(async (pos) => {
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;

    const data = await fetchData(`https://api.opencagedata.com/geocode/v1/json?key=6dd822cb65c648db99589b65edfb6a90&q=${latitude}+${longitude}&pretty=1&no_annotations=1`);

    console.log(data);

    const cityName = data.results[0].components.suburb;

    const weather = await fetchData(`https://api.weatherapi.com/v1/forecast.json?days=4&key=ff76f32b6d9940a9b2674941262005&lang
    =en&q=${latitude},${longitude}`);

    console.log(weather);

    uv_banner.innerHTML = `UV-Index: ${weather.current.uv} | Max. UV-Index heute: ${weather.forecast.forecastday[0].day.uv} (Standort: ${cityName})`
}, (err) => {
    console.log(err);
});


update();
setInterval(update, 1000);
