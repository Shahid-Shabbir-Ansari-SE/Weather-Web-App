import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState<any>();
  const [timeData, setTimeData] = useState<any>();
  const apiKey = "fbc818a1745e792def8db478c9f64f5e";
  const city = "Auckland"; // Replace with the actual city name
  const [hourlyForecast, setHourlyForecast] = useState<any>();

  useEffect(() => {
    fetchWeatherData(city);
    fetchTimeData(city);
  }, [city]);

  const fetchWeatherData = async (city: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      const data = await response.json();
      setWeatherData(data);
      fetchHourlyForecast(data.coord.lat, data.coord.lon);
      console.log(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchTimeData = async (city: string) => {
    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/worldtime?city=${city}`,
        {
          method: "GET",
          headers: {
            "X-Api-Key": "lAshpZjJxVdIS9brjMEOPQ==0PaE9qkzKi2BYNgX",
          },
        }
      );
      const data = await response.json();
      setTimeData(data);
    } catch (error) {
      console.error("Error fetching time data:", error);
    }
  };

  const fetchHourlyForecast = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      );
      const data = await response.json();
      setHourlyForecast(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching hourly forecast:", error);
    }
  };

  // Function to get the URL for the weather icon
  const getWeatherIconUrl = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  const getHourlyForecastIconUrl = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  const currentTempinKelvin = weatherData?.main?.temp;
  const currentTempinCelsius = Math.round(currentTempinKelvin - 273.15);

  const maxTempinKelvin = weatherData?.main?.temp_max;
  const maxTempinCelsius = Math.round(maxTempinKelvin - 273.15);

  const minTempinKelvin = weatherData?.main?.temp_min;
  const minTempinCelsius = Math.round(minTempinKelvin - 273.15);

  const humidity = weatherData?.main?.humidity;
  const windSpeedMS = weatherData?.wind?.speed;
  const windSpeedKMH = Math.floor(windSpeedMS * 3.6);

  // Calculate specific time for 4 hours from now
  const specificTime = new Date();
specificTime.setHours(specificTime.getHours() + 7);

const filterHourlyForecast = (hourlyData: any) => {
  if (!hourlyData || !hourlyData.list) {
    return [];
  }

  return hourlyData.list.filter((hourlyItem: any) => {
    const hourlyTime = new Date(hourlyItem.dt_txt);
    return (
      hourlyTime >= specificTime &&
      hourlyTime < new Date(specificTime.getTime() + 12 * 60 * 60 * 1000)
    ); // 4 hours in milliseconds
  });
};

  const filteredHourlyForecast = filterHourlyForecast(hourlyForecast);

  return (
    <div>
      <div>
        {weatherData && weatherData.weather && (
          <div>
            {weatherData.weather[0].icon && (
              <img
                src={getWeatherIconUrl(weatherData.weather[0].icon)}
                alt="Weather Icon"
              />
            )}
            <p>{weatherData.weather[0].description}</p>
            <p>{currentTempinCelsius}℃</p>
            <p>{maxTempinCelsius}℃</p>
            <p>{minTempinCelsius}℃</p>
            <p>{humidity}%</p>
            <p>{windSpeedKMH}km/h</p>
          </div>
        )}
      </div>
      <div>
        {timeData && (
          <div className="flex">
            <p>{timeData.hour}</p>
            <p>:{timeData.minute}</p>
            <p>:{timeData.day_of_week}</p>
          </div>
        )}
      </div>
      <div>
        {filteredHourlyForecast.length > 0 && (
          <div>
            {filteredHourlyForecast.map((hourlyData: any, index: number) => (
              <div key={index}>
                <p>{hourlyData.dt_txt}</p>
                <p>Rain: {hourlyData.pop * 100}%</p>
                <img
                  src={getHourlyForecastIconUrl(hourlyData.weather[0].icon)}
                  alt="Hourly Forecast Icon"
                />
                <p>{Math.round(hourlyData.main.temp - 273.15)}℃</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
