import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Home from "./pages/Home";
import Statistics from "./pages/Statistics";
import Training from "./pages/Training";

import BottomMenu from "./components/BottomMenu";
import { store } from "./store/store";

import "./index.css";

const AppContent = () => {
  const menuItems = [
    { id: 1, icon: "/icons/home.svg", activeIcon: "/icons/home-active.svg", alt: "Home", label: "Главная", path: "/" },
    { id: 2, icon: "/icons/study.svg", activeIcon: "/icons/study-active.svg", alt: "Study", label: "Обучение", path: "/training" },
    { id: 3, icon: "/icons/statistics.svg", activeIcon: "/icons/statistics-active.svg", alt: "Statistics", label: "Статистика", path: "/statistics" },
    { id: 4, icon: "/icons/settings.svg", activeIcon: "/icons/settings-active.svg", alt: "Settings", label: "Настройки", path: "/settings" },
  ];

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const WebApp = window.Telegram.WebApp;
      WebApp.expand();

      console.log("Telegram WebApp инициализирован");
    }
  }, []);

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/training" element={<Training />} />
      </Routes>
      {menuItems.length > 0 && <BottomMenu items={menuItems} />}
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>

  );
}

export default App;
