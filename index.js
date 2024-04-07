const http = require("http");
const keyApi = process.env.keyApi;

const url = `http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=${keyApi}`;


function getWeather() {

// запрс по API
http
  .get(url, (res) => {
    const { statusCode } = res;
    if (statusCode !== 200) {
      console.log(`statusCode: ${statusCode}`);
      return;
    }

    // получаем данные
    res.setEncoding("utf-8");
    let rowData = "";

    // накапливаем данные по мере получения
    res.on("data", (chunk) => (rowData += chunk));
    res.on("end", () => {
      let parseDate = JSON.parse(rowData);
      console.log(`Город: ${parseDate.name}`);
      console.log(`Температура в градусах цельсия: ${parseDate.main.temp - 273.15} градусов`);
    });
  })
  .on("error", (err) => {
    crossOriginIsolated.error(err);
  });

}


  /**
   * {
  coord: { lon: -0.1257, lat: 51.5085 },
  weather: [
    {
      id: 803,
      main: 'Clouds',
      description: 'broken clouds',
      icon: '04d'
    }
  ],
  base: 'stations',
  main: {
    temp: 289.4,
    feels_like: 288.67,
    temp_min: 287.62,
    temp_max: 290.93,
    pressure: 1008,
    humidity: 61
  },
  visibility: 10000,
  wind: { speed: 7.72, deg: 220, gust: 14.4 },
  clouds: { all: 75 },
  dt: 1712500044,
  sys: {
    type: 2,
    id: 2075535,
    country: 'GB',
    sunrise: 1712467283,
    sunset: 1712515396
  },
  timezone: 3600,
  id: 2643743,
  name: 'London',
  cod: 200
}
   */