import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.svg";
import style from "./Header.module.css";
import lightMode from "../../assets/icons/lightModeIcon.svg";
import darkMode from "../../assets/icons/darkModeIcon.svg";

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }

    setTheme(localStorage.getItem("theme") || "light");
  }, [isDarkMode]);
  return (
    <header className={`${style.header}`}>
      <div className={`${style.headerDiv}`}>
        <div className={`${style.logoDiv}`}>
          <img src={logo} alt="logo" />
          <p
            className={theme === "dark" ? style.logoDesc : style.logoDescLight}
          >
            Character Counter
          </p>
        </div>
        <div>
          <img
            src={isDarkMode ? lightMode : darkMode}
            alt="Theme Toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={style.themeToggle}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
