import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1");

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
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,   //status
        onLogout: logoutHandler,//functions
        onLogin: loginHandler, //functions
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
