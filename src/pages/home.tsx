import { useState, useEffect } from "react";
import Navbar from "../components/navbar";

function home() {
  const [weatherData, setWeatherData] = useState<any>();
  const [timeData, setTimeData] = useState<any>("undefined");
  const apiKey = "fbc818a1745e792def8db478c9f64f5e";
  const [hourlyForecast, setHourlyForecast] = useState<any>();
  const [dailyForecast, setDailyForecast] = useState<any>();
  const [city, setCityName] = useState<any>("New York");
  var storeCityName: any = "";
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
  const currentTempinKelvin = weatherData?.main?.temp;
  const currentTempinCelsius = Math.round(currentTempinKelvin - 273.15);

  const maxTempinKelvin = weatherData?.main?.temp_max;
  const maxTempinCelsius = Math.round(maxTempinKelvin - 273.15);

  const minTempinKelvin = weatherData?.main?.temp_min;
  const minTempinCelsius = Math.round(minTempinKelvin - 273.15);

  const humidity = weatherData?.main?.humidity;
  const windSpeedMS = weatherData?.wind?.speed;
  const windSpeedKMH = Math.floor(windSpeedMS * 3.6);

  const specificTime = new Date();
  specificTime.setHours(specificTime.getHours());

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherDataByLocation(position);
        },
        (error) => {
          console.error("Error getting user location:", error);
          fetchWeatherDataByCity(city);
          fetchDailyweather(city);
        }
      );
    } else {
      console.error("Geolocation is not available in this browser.");
      fetchWeatherDataByCity(city);
    }
  }, [apiKey]);
  
  const getWeatherIconUrl = (iconCode: string) => {
    if (customWeatherIcons.hasOwnProperty(iconCode)) {
      return customWeatherIcons[iconCode];
    } else {
      return `https://openweathermap.org/img/wn/${iconCode}.png`;
    }
  };

  const fetchWeatherDataByCity = async (city: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      const data = await response.json();
      setWeatherData(data);
      fetchHourlyForecast(data.coord.lat, data.coord.lon);
      fetchTimeData2(city);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchWeatherDataByLocation = async (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      );
      const data = await response.json();
      setWeatherData(data);
      fetchHourlyForecast(data.coord.lat, data.coord.lon);
      fetchTimeData(data.coord.lat, data.coord.lon);
      fetchDailyweather2(data.coord.lat, data.coord.lon);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchTimeData = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/worldtime?lat=${latitude}&lon=${longitude}`,
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
  const fetchTimeData2 = async (city: string) => {
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

  const getHourlyForecastIconUrl = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  const filterHourlyForecast = (hourlyData: any) => {
    if (!hourlyData || !hourlyData.list) {
      return [];
    }

    return hourlyData.list.filter((hourlyItem: any) => {
      const hourlyTime = new Date(hourlyItem.dt_txt);
      return (
        hourlyTime >= specificTime &&
        hourlyTime < new Date(specificTime.getTime() + 12 * 60 * 60 * 1000)
      );
    });
  };

  const filteredHourlyForecast = filterHourlyForecast(hourlyForecast);
  const fetchDailyweather = async (city:string) => {
    try {
      const response = await fetch(
        ` https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=days&key=FY56X8C2XTN7J9RFWSX2BW487&contentType=json`
      );
      const data = await response.json();
      setDailyForecast(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  const fetchDailyweather2 = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        ` https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?unitGroup=metric&include=days&key=FY56X8C2XTN7J9RFWSX2BW487&contentType=json`
      );
      const data = await response.json();
      setDailyForecast(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  function getImageForCondition(condition: string) {
    const conditionToImage: { [key: string]: string } = {
      "Clear": "sunny-day.png",
      "Partially cloudy": "fewclouds.png",
      "Rain": "light-rain.webp",
      "Overcast": "overcast.png",
      "Drizzle": "drizzle.png",
      "Rain, Partially cloudy": "drizzle.png",
      "Rain, Overcast": "light-rain.webp",
      "Snow, Rain, Overcast": "snow.webp",
      "Snow": "snow.webp",
    };

    if (condition in conditionToImage) {
      const imageUrl = conditionToImage[condition];
      return <img className="w-16" src={imageUrl} alt={condition} />;
    } else {
      return null;
    }
  }
  const getCityNamebyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    storeCityName = e.target.value;
  };

  const setingCityName = () => {
    setCityName(storeCityName);
    fetchWeatherDataByCity(storeCityName);
    fetchDailyweather(storeCityName);
  };

  return (
    <div className="font-primary">
      <Navbar
        getCityNamebyInput={getCityNamebyInput}
        settingCityName={setingCityName}
      />
      <div className="lg:flex grid items-center py-5 lg:p-2">
        <div className="lg:w-1/2 w-[100vw] justify-center flex lg:justify-end">
          {weatherData && weatherData.weather && (
            <div className="md:flex justify-center grid w-full lg:w-auto md:w-auto items-center gap-10">
              <div className="grid text-center w-full">
                {weatherData.weather[0].icon && (
                  <img
                    className="lg:w-96 md:w-96 w-52 fill-slate-100"
                    src={getWeatherIconUrl(weatherData.weather[0].icon)}
                    alt="Weather Icon"
                  />
                )}
                <span className="capitalize text-3xl font-bold">
                  {weatherData.weather[0].description}
                </span>
              </div>
              <div className="grid w-full justify-center text-center lg:justify-start md:justify-center">
                <span className="lg:text-5xl text-3xl font-extrabold">
                  {currentTempinCelsius}°C
                </span>
                <div className="lg:flex font-semibold justify-center">
                  <span>Max-Temp:</span>
                  <span className="ml-2 font-normal">{maxTempinCelsius}°C</span>
                </div>
                <div className="flex font-semibold justify-center">
                  <span>Min-Temp:</span>{" "}
                  <span className="ml-2 font-normal">{minTempinCelsius}°C</span>
                </div>
                <div>
                  <span className="flex justify-center">
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
        <div className="lg:w-1/2 lg:flex lg:justify-start justify-center items-center">
          <div>
            {timeData ? (
              <div className="grid text-center text-3xl px-10 py-10">
                <span>{timeData.day_of_week}</span>
                <span className="font-bold">
                  {timeData.hour === undefined ? (
                    <p>Invalid City Name</p>
                  ) : timeData.hour > 12 ? (
                    timeData.hour - 12 + ":" + timeData.minute + "pm"
                  ) : (
                    timeData.hour + ":" + timeData.minute + "am"
                  )}
                </span>
              </div>
            ) : (
              <div className="grid text-center text-3xl px-10">
                <span>Invalid Time Data</span>
              </div>
            )}
          </div>
          <div>
            <h1 className="lg:hidden text-xl font-bold text-center underline">
              Hourly Forecast
            </h1>
            {filteredHourlyForecast.length > 0 && (
              <div className="lg:grid grid justify-center py-7 lg:p-0 md:flex">
                {filteredHourlyForecast.map(
                  (hourlyData: any, index: number) => (
                    <div
                      key={index}
                      className="lg:flex w-full items-center border-2 my-3 rounded-lg lg:pr-5 p-2 text-center mx-auto"
                    >
                      <div className="w-full lg:w-auto flex lg:grid justify-center">
                        <img
                          src={getHourlyForecastIconUrl(
                            hourlyData.weather[0].icon
                          )}
                          alt="Hourly Forecast Icon"
                        />
                      </div>
                      <div className="grid lg:flex gap-10 lg:gap-0 items-center">
                        <div className="grid font-semibold">
                          <span>
                            {Math.round(hourlyData.main.temp - 273.15)}°C
                          </span>
                          <span>{hourlyData.weather[0].main}</span>
                        </div>
                        <div className="grid lg:text-right">
                          <span>{hourlyData.dt_txt}</span>
                          <span>Rain: {Math.round(hourlyData.pop * 100)}%</span>
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
        <h1 className="lg:hidden text-xl font-bold text-center underline">
          Daily Forecast
        </h1>
        {dailyForecast && (
          <div className="grid lg:grid-cols-5 md:justify-center md:flex flex-wrap gap-10 px-10 py-7 lg:py-0">
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
                      <div className="grid text-center">
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
