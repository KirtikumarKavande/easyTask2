import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import MyUserContex from "./components/Store/UserContex";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };
  useEffect(() => {
    const checkUserIsLoggedInOrNot = localStorage.getItem("isLoggedIn");
    if (checkUserIsLoggedInOrNot === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <React.Fragment>
      <MyUserContex.Provider value={{ isLoggedIn: isLoggedIn,onLogout:logoutHandler }}>
        <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
        <main>
          {!isLoggedIn && <Login onLogin={loginHandler} />}
          {isLoggedIn && <Home onLogout={logoutHandler} />}
        </main>
      </MyUserContex.Provider>
    </React.Fragment>
  );
}

export default App;
