import { useEffect, useState } from "react";
import ContentTitle from "./components/ContentTitle";
import Header from "./components/Header";
import TextField from "./components/TextField";

function App() {
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
  return (
    <div className={`mainContainer ${theme === "dark" ? "dark-mode" : ""}`}>
      <Header />
      <ContentTitle />
      <TextField />
    </div>
  );
}

export default App;
