import { useState, useEffect } from "react";
import Navbar from "../components/navbar";

function home() {
  const [weatherData, setWeatherData] = useState<any>();
  const [timeData, setTimeData] = useState<any>();
  const apiKey = "fbc818a1745e792def8db478c9f64f5e";
  const [hourlyForecast, setHourlyForecast] = useState<any>();
  const [dailyForecast, setDailyForecast] = useState<any>();
  const [city, setCityName] = useState<any>("London");
  const customWeatherIcons: { [key: string]: string } = {
    "01d": "sunny-day.png",
    "01n": "sunny-day.png",
    "50d": "haze.png",
    "03d": "scattered-cloud.webp",
    "3d": "scattered-cloud.webp",
    "10n": "light-rain.webp",
    "10d": "light-rain.webp",
    "04d": "overcast.png",
    "04n": "overcast.png",
    "09n": "drizzle.png",
    "02n": "fewclouds.png",
    "02d": "fewclouds.png",
  };

  const getWeatherIconUrl = (iconCode: string) => {
    // Check if there's a custom image URL for the given weather condition code
    if (customWeatherIcons.hasOwnProperty(iconCode)) {
      return customWeatherIcons[iconCode];
    } else {
      // If no custom image is available, use the default OpenWeatherMap image
      return `https://openweathermap.org/img/wn/${iconCode}.png`;
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
    fetchTimeData(city);
    fetchDailyweather();
  }, [city]);

  const fetchWeatherData = async (city: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      const data = await response.json();
      setWeatherData(data);
      fetchHourlyForecast(data.coord.lat, data.coord.lon);
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
    } catch (error) {
      console.error("Error fetching hourly forecast:", error);
    }
  };

  // Function to get the URL for the weather icon

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
  specificTime.setHours(specificTime.getHours() + 4);

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
  const fetchDailyweather = async () => {
    try {
      const response = await fetch(
        ` https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=days&key=RZV8K2FBF58GCZZCEHD68D2PY&contentType=json`
      );
      const data = await response.json();
      setDailyForecast(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  function getImageForCondition(condition: string) {
    // Define a mapping of conditions to image sources
    const conditionToImage: { [key: string]: string } = {
      Clear: "sunny-day.png",
      "Partially cloudy": "fewclouds.png",
      Rain: "light-rain.webp",
      Overcast: "overcast.png",
      Drizzle: "drizzle.png",
      "Rain, Partially cloudy": "drizzle.png",
      "Rain, Overcast": "light-rain.webp",
      "Snow, Rain, Overcast": "snow.webp",

      // Add more conditions and corresponding image sources as needed
    };

    // Check if the condition exists in the mapping
    if (condition in conditionToImage) {
      const imageUrl = conditionToImage[condition];
      return <img className="w-16" src={imageUrl} alt={condition} />;
    } else {
      return null; // Return null if no image is found for the condition
    }
  }

  const getCityNamebyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };

  return (
    <div>
      <Navbar getCityNamebyInput={getCityNamebyInput} />
      <div className="flex items-center py-5">
        <div className="w-1/2 flex justify-end">
          {weatherData && weatherData.weather && (
            <div className="flex items-center gap-10">
              <div className="grid text-center w-full">
                {weatherData.weather[0].icon && (
                  <img
                    className="w-96 fill-slate-100"
                    src={getWeatherIconUrl(weatherData.weather[0].icon)}
                    alt="Weather Icon"
                  />
                )}
                <span className="capitalize text-3xl font-bold">
                  {weatherData.weather[0].description}
                </span>
              </div>
              <div className="grid w-full">
                <span className="text-5xl font-extrabold">
                  {currentTempinCelsius}°C
                </span>
                <div className="flex font-semibold">
                  <span>Max-Temp:</span>
                  <span className="ml-2 font-normal">{maxTempinCelsius}℃</span>
                </div>
                <div className="flex font-semibold">
                  <span>Min-Temp:</span>{" "}
                  <span className="ml-2 font-normal">{minTempinCelsius}℃</span>
                </div>
                <div>
                  <span className="flex">
                    <span className="mr-2 font-semibold">Humidity:</span>
                    {humidity}%
                  </span>
                </div>
                <div>
                  <span className="flex">
                    <span className="mr-2 font-semibold">Wind Speed:</span>
                    {windSpeedKMH}km/h
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-1/2 flex justify-start items-center">
          <div>
            {timeData && (
              <div className="grid text-center text-3xl px-10">
                <span>{timeData.day_of_week}</span>
                <span className="font-bold">
                  {timeData.hour > 12
                    ? timeData.hour - 12 + ":" + timeData.minute + "pm"
                    : timeData.hour + ":" + timeData.minute + "am"}
                </span>
              </div>
            )}
          </div>
          <div>
            {filteredHourlyForecast.length > 0 && (
              <div>
                {filteredHourlyForecast.map(
                  (hourlyData: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center border-2 my-3 rounded-lg pr-5 p-2"
                    >
                      <img
                        src={getHourlyForecastIconUrl(
                          hourlyData.weather[0].icon
                        )}
                        alt="Hourly Forecast Icon"
                      />
                      <div className="flex gap-10">
                        <div className="grid font-semibold">
                          <span>
                            {Math.round(hourlyData.main.temp - 273.15)}℃
                          </span>
                          <span>{hourlyData.weather[0].main}</span>
                        </div>
                        <div className="grid text-right">
                          <span>{hourlyData.dt_txt}</span>
                          <span>Rain: {hourlyData.pop * 100}%</span>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        {dailyForecast && (
          <div className="grid grid-cols-5 gap-10 px-10">
            {dailyForecast.days.map((dailyData: any, index: number) =>
              index < 5 ? (
                <div
                  key={index}
                  className="grid items-center border-2 rounded-lg px-4 py-2"
                >
                  <p className="text-right">{dailyData.datetime}</p>
                  <div className="flex">
                    <div className="">
                      <div className="flex items-center gap-5">
                        {getImageForCondition(dailyData.conditions)}
                        <span className="font-semibold text-3xl">
                          {Math.round(dailyData.temp)}°C
                        </span>
                      </div>
                      <div className="grid">
                        <span className="">{dailyData.conditions}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default home;
