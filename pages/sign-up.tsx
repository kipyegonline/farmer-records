import React from "react";
import axios from "axios";
import type { NextPage } from "next";
import {
  TextField,
  Button,
  Typography,
  Card,
  SnackbarCloseReason,
  Box,
} from "@mui/material";
import UseInput, { SnackBarComponent } from "../utils/input/useInput";

import ErrorBoundary from "../utils/ErrorBoundary/ErrorBoundary";
import Link from "next/link";
import AddInput, { AddFarmNotes } from "../components/ui/AddInput";
import AddActivity from "../components/AddActivity";

interface InputTypes {
  name: string;
  username: string;
  password: string;
  email: string;
}

export default function SignUp() {
  // state for form
  const [name, resetName] = UseInput<string>("vince");
  const [username, resetUsername] = UseInput("");
  const [password, resetPassword] = UseInput("");
  const [cpassword, resetcPassword] = UseInput("");
  const [email, resetEmail] = UseInput("");
  const [phone, resetPhone] = UseInput("");
  const [helperText, setText] = React.useState("");
  const [loading, setLoad] = React.useState(false);

  // checking values on blur event

  const handleBlur = (event: any) => {
    setText(
      event.target.value.trim().length > 0
        ? ""
        : `${event.target.name} is required`
    );
  };

  // for closing the snack bar
  const handleClose = (e: Event, r: SnackbarCloseReason): void | boolean => {
    if (r === "clickaway") return false;
    console.log("click", r);
    setText("");
  };

  // validating values, i need a library to do this though
  const validateValues = () => {
    let valid = false;
    if (name?.value.trim().length < 0 || name.value.trim().length < 3) {
      setText("A name is required");
    } else if (
      username.value.trim().length < 0 ||
      username.value.trim().length < 3
    ) {
      setText("A username is required");
    } else if (email.value.trim().length < 5) {
      setText("A valid email address is required");
    } else if (phone.value.trim().length < 9) {
      setText("A valid mobile phone number  is required");
    } else if (password.value.trim().length < 5) {
      setText("A password with atleast 6 characters  is required");
    } else if (cpassword.value.trim().length < 5) {
      setText("confirm password");
    } else if (password.value.trim() !== cpassword.value.trim()) {
      setText("Passwords do not match");
    } else {
      valid = true;
    }
    setTimeout(() => {
      setText("");
      valid = false;
    }, 3000);
    return valid;
  };
  const sendToServer = (url: string, payload: InputTypes) => {
    axios
      .post(url, payload)
      .then((res) => {
        if (res.status === 200) {
          setText("Data submitted");
          resetUsername();
          resetEmail();
          resetName();
          resetPassword();
          resetcPassword();
          resetPhone();
        } else {
          throw new Error(res.statusText);
        }
      })
      .catch((error) => {
        setText(error.message);
      })
      .finally(() =>
        setTimeout(() => {
          setText("");
          setLoad(false);
        }, 3000)
      );
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateValues()) {
      // send to server
      setLoad(true);
      const payload = {
        name: name.value,
        username: username.value,
        email: email.value,
        password: password.value,
        phone: phone.value,
      };
      let url = process.env.api + "?add-user=true";
      sendToServer(url, payload);
    } else {
      //setText("All fields are required");
      // setTimeout(() => setText(""), 4000);
      return false;
    }
  };
  return (
    <ErrorBoundary
      fallback={
        <p className="text-4xl p-4 text-center m-3 my-auto text-white">
          Something went wrong ): Reload page.
        </p>
      }
    >
      <Box className="p-4 mt-8 flex flex-col justify-evenly flex-1  md:flex-row-reverse md:mt-2">
        <AddFarmNotes />
        <AddActivity />
        <AddInput />
        <form
          onSubmit={handleSubmit}
          className="bg-white p-2 flex justify-evenly items-stretch  mx-auto mt-15 flex-1 flex-col border-2 border-white"
          style={{ maxWidth: 400 }}
          data-testid="signup-form"
        >
          <Card />
          <Typography
            variant="h3"
            className="text-center p-0 m-2"
            component="h3"
          >
            Join form
          </Typography>
          <TextField
            variant="filled"
            className="my-1 py-1 px-1"
            {...name}
            id="name"
            name="Name"
            type="text"
            onBlur={handleBlur}
            label="Enter name"
          />
          <TextField
            variant="filled"
            className="my-1 py-1 px-1"
            {...username}
            id="username"
            name="User name"
            type="text"
            onBlur={handleBlur}
            label="Enter username"
          />
          <TextField
            variant="filled"
            className="my-1 py-1 px-1"
            {...email}
            id="email"
            name="Email"
            type="email"
            label="Enter email"
            onBlur={handleBlur}
          />
          <TextField
            variant="filled"
            className="my-1 py-1 px-1"
            {...phone}
            id="phone"
            name="Phone number"
            type="telephone"
            label="Enter mobile phone number"
            onBlur={handleBlur}
          />
          <TextField
            variant="filled"
            className="my-1 py-1 px-1"
            {...password}
            type="password"
            name="Password"
            id="password"
            label="Enter password"
            onBlur={handleBlur}
          />
          <TextField
            variant="filled"
            className="my-1 py-1 px-1"
            {...cpassword}
            type="password"
            name="Confirmation password"
            id="cpassword"
            label="Enter password"
            onBlur={handleBlur}
          />
          <Button
            variant="contained"
            type="submit"
            className="my-2 mt-6 py-2 px-1 bg-blue-700 "
            size="medium"
            color="primary"
            disabled={loading}
          >
            Submit
          </Button>
          <SnackBarComponent
            helperText={helperText}
            handleClose={handleClose}
          />
          <Link href="/">
            <a>Login</a>
          </Link>
        </form>
      </Box>
    </ErrorBoundary>
  );
}
