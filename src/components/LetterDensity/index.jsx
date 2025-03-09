import { useEffect, useState } from "react";
import style from "./LetterDensity.module.css";
import seeMoreIcon from "../../assets/icons/seeMore.svg";
import seeLessIcon from "../../assets/icons/seeLess.svg";

const getLetterFrequency = (text) => {
  if (!text) return [];

  const frequency = {};
  text
    .replace(/\s/g, "")
    .split("")
    .forEach((char) => {
      const letter = char.toUpperCase();
      frequency[letter] = (frequency[letter] || 0) + 1;
    });

  return Object.entries(frequency).sort((a, b) => b[1] - a[1]);
};

const LetterDensity = ({ text = "" }) => {
  const letterData = getLetterFrequency(text);
  const totalLetters = text.replace(/\s/g, "").length || 1;
  const [showAll, setShowAll] = useState(false);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const handleStorageChange = () => {
      setTheme(localStorage.getItem("theme") || "light");
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className={style.container}>
      <h3 className={theme === "dark" ? style.title : style.titleLightMode}>
        Letter Density
      </h3>
      {letterData.length === 0 ? (
        <p
          className={theme === "dark" ? style.emptyText : style.emptyTextLight}
        >
          No characters found. Start typing to see letter density.
        </p>
      ) : (
        (showAll ? letterData : letterData.slice(0, 5)).map(
          ([letter, count], index) => {
            const percentage = ((count / totalLetters) * 100).toFixed(2);
            return (
              <div key={index} className={style.row}>
                <span
                  className={
                    theme === "dark" ? style.letter : style.letterLightMode
                  }
                >
                  {letter}
                </span>
                <div
                  className={
                    theme === "dark"
                      ? style.progressBar
                      : style.progressBarLightMode
                  }
                >
                  <div
                    className={style.filledBar}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span
                  className={
                    theme === "dark" ? style.count : style.countLightMode
                  }
                >
                  {count}
                </span>
                <span
                  className={
                    theme === "dark"
                      ? style.percentage
                      : style.percentageLightMode
                  }
                >
                  ({percentage}%)
                </span>
              </div>
            );
          }
        )
      )}
      {letterData.length > 6 && (
        <div className={style.seeMore}>
          <button
            className={
              theme === "dark" ? style.seeMoreBtn : style.seeMoreBtnLight
            }
            onClick={toggleShowAll}
          >
            {showAll ? "See Less" : "See More"}
          </button>
          <div>
            {showAll ? (
              <img src={seeLessIcon} alt="seeMore" />
            ) : (
              <img src={seeMoreIcon} alt="seeMore" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LetterDensity;
