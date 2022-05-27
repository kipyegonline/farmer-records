import React from "react";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Login from "../pages/login";

/* eslint-disable no-undef */

interface LoginContext {
  children: React.ReactNode;
}
type isLoggedIn = number | null | Object;
const LoginContext = React.createContext<{
  getUser: () => void;
  removeUser: () => void;
  isLoggedIn: isLoggedIn;
}>({
  getUser: () => {},
  removeUser: () => {},
  isLoggedIn: false,
});

export const useLoginContext = () => React.useContext(LoginContext);

export default function LoginContextComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setLogin] = React.useState<isLoggedIn>(-1);
  let mkulima = "mkulimambunifu";

  const router = useRouter();
  // get user from local storage
  const getUser = () =>
    globalThis.window && JSON.parse(localStorage.getItem(mkulima) as window);
  // remove user during log out
  const removeUser = () =>
    globalThis.window && (localStorage.removeItem("mkulimambunifu") as window);

  React.useEffect(() => {
    const payload = getUser();
    console.log("login context");
    if (payload) setLogin(payload);
    else setLogin(null);
  }, [isLoggedIn?.name]);

  // JSX for SSR and CSR
  if (globalThis.window) {
    if (typeof isLoggedIn === "object")
      return (
        <LoginContext.Provider value={{ isLoggedIn }}>
          {children}
        </LoginContext.Provider>
      );
    else if (isLoggedIn === -1) return <LoadingSpinner />;
    else return <Login />;
  } else {
    if (isLoggedIn)
      return (
        <LoginContext.Provider value={{ isLoggedIn, setLogin, removeUser }}>
          {children}
        </LoginContext.Provider>
      );
    else if (isLoggedIn === -1) return <LoadingSpinner />;
    else return <Login />;
  }
}

const LoadingSpinner = () => {
  const [dims, setDims] = React.useState({ x: 0, y: 0 });
  React.useEffect(() => {
    setDims({
      x: window.innerWidth,
      y: window.innerHeight,
    });
    console.log("dims", dims, window.innerWidth, window.innerHeight);
  }, [dims.x]);

  return (
    <div>
      <Backdrop open>
        <Typography variant="h3" className="my-auto mt-10 text-center p-4">
          {" "}
          <CircularProgress color="primary" size={50} thickness={5} />{" "}
        </Typography>
      </Backdrop>
    </div>
  );
};
