import React, { useState } from "react";

type navbarProps = {
  getCityNamebyInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  settingCityName: (e: React.FormEvent<HTMLImageElement>) => void;
};

const navbar: React.FC<navbarProps> = ({
  getCityNamebyInput,
  settingCityName,
}) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const sidebarstyle = {
    transform: showSidebar ? "translateX(0)" : "",
  };
  return (
    <div>
      <header className="bg-white">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <div className="flex items-center gap-5 text-2xl font-semibold">
                <img className="h-12 w-auto" src="logo.png" alt="" />
                Sky360
              </div>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              onClick={toggleSidebar}
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12 items-center">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-black border-b-2 border-black"
            >
              Resume
            </a>
            <div className="flex border-2 rounded-xl p-0 border-gray-600">
              <input
                type="text"
                onChange={getCityNamebyInput}
                placeholder="Enter City Name"
                className=" text-center rounded-xl border-0 outline-none active:border-0"
              />
              <img
                src="search.svg"
                onClick={settingCityName}
                className="w-10 bg-orange-600 py-1 rounded-r-lg px-2 cursor-pointer"
                alt=""
              />
            </div>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-black border-b-2 border-black"
            >
              About Me
            </a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <button className="bg-orange-500 font-semibold text-white shadow-lg px-5 py-2 rounded-lg">
              Hire Me
            </button>
          </div>
        </nav>
        <div className="" role="dialog" aria-modal="true">
          <div
            style={sidebarstyle}
            className="transition-transform  translate-x-full fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
          >
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5 flex items-center">
                <img className="h-8 w-auto" src="logo.png" alt="" />
                <span className="text-xl ml-5 font-semibold">Sky360</span>
              </a>
              <button
                onClick={toggleSidebar}
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <div className="flex border-2 rounded-xl p-0 border-gray-600 mx-auto w-fit">
                    <input
                      type="text"
                      onChange={getCityNamebyInput}
                      placeholder="Enter City Name"
                      className=" text-center rounded-xl border-0 outline-none active:border-0 w-[186px]"
                    />
                    <img
                      src="search.svg"
                      onClick={settingCityName}
                      className="w-10 bg-orange-600 py-1 rounded-r-lg px-2 cursor-pointer"
                      alt=""
                    />
                  </div>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Portfolio
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    About Me
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Resume
                  </a>
                </div>
                <div className="py-6 flex justify-center text-center">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-1.5 text-base font-semibold leading-7 text-white bg-orange-600 w-auto"
                  >
                    Hire ME
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default navbar;
