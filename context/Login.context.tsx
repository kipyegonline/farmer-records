import React from "react";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Login from "../pages/login";

const LoginContext = React.createContext({});

export const useLoginContext = () => React.useContext(LoginContext);

export default function LoginContextComponent({ children }) {
  const [isLoggedIn, setLogin] = React.useState(-1);
  const router = useRouter();
  const getUser = () =>
    globalThis.window &&
    JSON.parse(localStorage.getItem("mkulimambunifu") as window);

  React.useEffect(() => {
    const payload = getUser();
    console.log("login context");
    if (payload) console.log("fifo"); //setLogin(payload);
    else setLogin(null);
  }, [isLoggedIn?.name]);

  // JSX for SSR and CSR
  if (globalThis.window) {
    if (isLoggedIn)
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
        <LoginContext.Provider value={{ isLoggedIn, setLogin }}>
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
