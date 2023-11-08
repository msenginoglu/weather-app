import { useState } from "react";
import axios from "axios";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (e) => {
    e.preventDefault();

    const trimmedCity = city.trim();

    if (trimmedCity === "") {
      alert("Lütfen bir şehir ismi giriniz.");
      return;
    }

    const API_KEY = "43f3f601df0380d6a1c712edaaf1f187";
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${trimmedCity}&appid=${API_KEY}&units=metric`;

    try {
      const response = await axios.get(url);
      setWeather(response.data);
      setCity("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="main flex flex-col items-center justify-center h-screen ">
      <div className="bg-black p-5 opacity-75 rounded relative">
        <form
          onSubmit={fetchWeather}
          className="mb-4 justify-center items-center text-center z-20"
          name="search"
        >
          <input
            type="text"
            placeholder="Şehir ismi girin"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            className="mr-2 p-2 border border-gray-400 rounded focus:outline-none z-auto"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded active:scale-90 mt-5 z-auto"
          >
            Hava Durumunu Öğren
          </button>
        </form>

        {weather && (
          <div>
            <h2 className="text-2xl font-bold mb-2 text-white">
              {weather.name} ({weather.sys.country})
            </h2>
            <h3 className="text-xl text-white">
              {translateDescription(weather.weather[0].description)}
            </h3>

            <p className="text-lg text-white">
              Sıcaklık: {Math.round(weather.main.temp)}°C
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

function translateDescription(description) {
  const translations = {
    "clear sky": "Açık",
    "few clouds": "Az bulutlu",
    "scattered clouds": "Parçalı bulutlu",
    "broken clouds": "Çok bulutlu",
    "shower rain": "Sağanak yağış",
    "overcast clouds": "Çok bulutlu",
    "light rain": "Hafif yağmurlu",
    "moderate rain": "Orta yağmurlu",
    "light snow": "Hafif karlı",
    "light shower rain": "Hafif sağanak yağış",
    "light thunderstorm": "Hafif gök gürültülü fırtına",
    rain: "Yağmurlu",
    thunderstorm: "Gök gürültülü fırtına",
    snow: "Karlı",
    mist: "Sisli",
    clouds: "Bulutlu",
    fog: "Sisli",
  };

  return translations[description] || description;
}
