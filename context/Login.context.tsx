import React from "react";
import { Backdrop, CircularProgress, Typography } from "@mui/material";

const LoginContext = React.createContext({});

export const useLoginContext = () => React.useContext(LoginContext);

export default function LoginContextComponent({ children }) {
  const [isLoggedIn, setLogin] = React.useState(null);
  const getUser = () =>
    globalThis.window &&
    JSON.parse(localStorage.getItem("mkulimambunifu") as window);

  React.useEffect(() => {
    const payload = getUser();
    if (payload) setLogin(payload);
    else setLogin({});
  }, []);

  // JSX for SSR and CSR
  if (globalThis.window) {
    if (isLoggedIn)
      return (
        <LoginContext.Provider value={{ isLoggedIn }}>
          {children}
        </LoginContext.Provider>
      );
    else return <LoadingSpinner />;
  } else {
    if (isLoggedIn)
      return (
        <LoginContext.Provider value={{ isLoggedIn }}>
          {children}
        </LoginContext.Provider>
      );
    else return <LoadingSpinner />;
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
