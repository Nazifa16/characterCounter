import React, { useEffect, useState } from "react";
import style from "./TextField.module.css";
import CharcterCountsCards from "../CharacterCountsCards";
import LetterDensity from "../LetterDensity";

function TextField() {
  const [text, setText] = useState("");
  const [excludeSpaces, setExcludeSpaces] = useState(false);
  const [setLimit, setSetLimit] = useState(false);
  const [charLimit, setCharLimit] = useState(300);
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

  const handleTextChange = (e) => {
    let newText = e.target.value;
    if (setLimit && newText.length > charLimit) {
      newText = newText.slice(0, charLimit);
    }
    setText(newText);
  };

  const totalCharacters = excludeSpaces ? text.length : text.trim().length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const sentenceCount = text ? text.split(/[.!?]+/).filter(Boolean).length : 0;

  const getReadingTime = () => {
    const wordsPerMinute = 200;
    const time = wordCount / wordsPerMinute;
    return time < 0.5 ? "<1 minute" : `${Math.ceil(time)} min`;
  };

  return (
    <div
      className={
        theme === "dark"
          ? style.textFieldContainer
          : style.textFieldContainerLight
      }
    >
      <textarea
        className={`${style.textArea} ${
          setLimit && text.length >= charLimit ? style.limitReached : ""
        }`}
        value={text}
        onChange={handleTextChange}
        placeholder="Type here..."
      />
      {setLimit && text.length >= charLimit && (
        <div>
          <p className={style.limitWarning}>
            Limit reached! Your text exceeds {charLimit} characters.
          </p>
        </div>
      )}

      <div
        className={
          theme === "dark"
            ? style.optionsContainer
            : style.optionsContainerLight
        }
      >
        <label className={style.span}>
          <input
            type="checkbox"
            checked={excludeSpaces}
            onChange={() => setExcludeSpaces(!excludeSpaces)}
          />
          <p> Exclude Spaces</p>
        </label>
        <label className={style.span}>
          <input
            type="checkbox"
            checked={setLimit}
            onChange={() => setSetLimit(!setLimit)}
          />
          <p>Set Character Limit</p>
          {setLimit && (
            <input
              type="number"
              value={charLimit}
              onChange={(e) => setCharLimit(parseInt(e.target.value) || 0)}
              className={style.charLimitInput}
            />
          )}
        </label>

        <span className={style.readingTime}>
          Approx. reading time: {getReadingTime()}
        </span>
      </div>

      <CharcterCountsCards
        stats={[
          {
            value: totalCharacters,
            desc: "Total Characters",
            bgColor: style.purple,
          },
          { value: wordCount, desc: "Word Count", bgColor: style.orange },
          { value: sentenceCount, desc: "Sentence Count", bgColor: style.red },
        ]}
      />
      <LetterDensity text={text} />
    </div>
  );
}

export default TextField;
