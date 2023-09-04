import { useContext } from "react";
import { Theme } from "../contexts/Theme";

export default function Header() {
  const [theme, setTheme] = useContext(Theme);

  function changeTheme(newTheme) {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  return (
    <header className="header">
      <h1 className="header__title">calc</h1>
      <div className="header__theme">
        <p className="header__theme__text">THEME</p>
        <div className="header__theme__options">
          <input
            className="header__theme__option"
            type="radio"
            name="toggle"
            id="theme-1"
            checked={theme === "theme-1"}
            onChange={() => {
              changeTheme("theme-1");
            }}
          />
          <input
            className="header__theme__option"
            type="radio"
            name="toggle"
            id="theme-2"
            checked={theme === "theme-2"}
            onChange={() => {
              changeTheme("theme-2");
            }}
          />
          <input
            className="header__theme__option"
            type="radio"
            name="toggle"
            id="theme-3"
            checked={theme === "theme-3"}
            onChange={() => {
              changeTheme("theme-3");
            }}
          />
        </div>
      </div>
    </header>
  );
}
