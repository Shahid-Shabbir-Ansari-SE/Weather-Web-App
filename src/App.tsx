import { useState } from "react";
import "./App.css";
import Home from "./pages/home";

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("colorTheme");
    return storedTheme === "dark";
  });
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("colorTheme", darkMode ? "light" : "dark");
  };
  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="dark:text-white dark:bg-black">
        <label className="absolute ml-2 flex lg:grid items-center cursor-pointer lg:left-0 lg:bottom-16 lg:top-auto right-16 top-8 md:top-9">
          <input
            onClick={toggleDarkMode}
            type="checkbox"
            value=""
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="lg:mt-2 lg:ml-0 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Dark Mode
          </span>
        </label>
        <div className="lg:h-screen ">
          <Home />
        </div>
      </div>
    </div>
  );
};

export default App;
