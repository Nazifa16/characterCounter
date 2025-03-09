import React, { useEffect, useState } from "react";
import style from "./ContentTitle.module.css";

function ContentTitle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const handleStorageChange = () => {
      setTheme(localStorage.getItem("theme"));
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  return (
    <div className={`${style.contentTitleDesign}`}>
      <p
        className={
          theme === "dark"
            ? style.contentTitleDesc
            : style.contentTitleDescLight
        }
      >
        Analyze your text in real-time
      </p>
    </div>
  );
}

export default ContentTitle;
