import Header from "./components/Header";
import Calculator from "./components/Calculator";
import { Theme } from "./contexts/Theme";
import { useState } from "react";

export default function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "theme-1"
  );

  return (
    <Theme.Provider value={[theme, setTheme]}>
      <div className="container" data-theme={theme}>
        <main className="app-container">
          <Header />
          <Calculator />
        </main>
      </div>
    </Theme.Provider>
  );
}
