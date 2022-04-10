import { createContext, useState } from "react";

const UserContext = createContext({
  userName: "",
  token: "",
  session: "",
  setToken: (token) => {},
  setSession: (session) => {},
  logout: () => {},
  setUserName: (username) => {},
  isLoggedIn: () => false,
});

export function UserContextProvider(props) {
  const res = localStorage.getItem('user');
  const data = JSON.parse(res);
  const [userName, setUserName] = useState(res ? data.username: "");
  const [token, setToken] = useState(res ? data.token : "");
  const [session, setSession] = useState(res ? data.session : "");

  function logoutHandler() {
    localStorage.clear();
    setUserName("");
    setToken("");
    setSession("");
  }

  function isLoggedIn() {
    return session !== "" && userName !== "";
  }

  const context = {
    userName: userName,
    token: token,
    session: session,
    setToken: setToken,
    setSession: setSession,
    setUserName: setUserName,
    logout: logoutHandler,
    isLoggedIn: isLoggedIn,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
