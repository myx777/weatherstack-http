const http = require("http");
const readline = require("readline");
const keyApi = process.env.keyApi;

function getWeather() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Введите город на английском языке: ", (city) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${keyApi}`;
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
          const temperature = parseDate.main.temp;
          console.log(`Город: ${parseDate.name}`);
          console.log(
            `Температура в градусах цельсия: ${
              Math.trunc(temperature - 273.15)
            } градусов`
          );
        });
      })
      .on("error", (err) => {
        console.error("Произошла ошибка при запросе к API:", err);
      });

    rl.close();
  });
}

getWeather();
