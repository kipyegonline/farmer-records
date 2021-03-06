import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  Alert,
  LinearProgress,
  Typography,
  Paper,
} from "@mui/material";
import { ErrorSharp } from "@mui/icons-material";
import axios from "axios";
import { stringify } from "querystring";
import { useRouter } from "next/router";

type LoginProps = { usernameEmail: string; password: string };
export default function Login() {
  const [helperText, setText] = React.useState("");
  const [load, setLoad] = React.useState(false);
  const router = useRouter();
  let timeout: any;
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { usernameEmail: "", password: "" },
  });

  const fetchData = async (name, sname = "Kimayiat") => {
    console.log(process.env.NODE_ENV, "env");
    try {
      const res = await fetch("/api/login/" + name);

      if (res.ok) {
        const data = await res.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  React.useEffect(() => {
    fetchData("Jules Wanja");
  }, []);
  const onSubmit: SubmitHandler<LoginProps> = (data: LoginProps) => {
    const { password, usernameEmail } = data;
    fetchData("Vincent Kipyegon");
    if (password.trim().length > 5 && usernameEmail.trim().length > 3) {
      clearTimeout(timeout);
      setLoad(true);
      axios
        .post(`${process.env.api}?login=true`, { password, usernameEmail })
        .then((res) => {
          if (res.status === 200) {
            // if logins are valid
            if (res.data.status == true) {
              localStorage.setItem(
                "mkulimambunifu",
                JSON.stringify(res?.data?.payload)
              );
              router.push("/", undefined, { shallow: false });
            } else {
              throw new Error(res.data.statusText);
            }
          } else {
            throw new Error(res.statusText);
          }
        })
        .catch((error) => {
          setText(error.message);
        })
        .finally(() => {
          timeout = setTimeout(() => setText(""), 3000);
          setLoad(false);
        });
    } else {
      setText("Invalid logins");
    }
  };

  return (
    <Paper className="m2" elevation={4}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white flex flex-col m-2 p-4 "
        style={{ maxWidth: 400 }}
      >
        <Typography variant="h5" className="text-center p-2 my-2">
          {" "}
          Login
        </Typography>
        <TextField
          className="my-2"
          label="Enter email or username"
          error={!!errors.usernameEmail}
          {...register("usernameEmail", { required: true, minLength: 6 })}
          helperText={
            !!errors.usernameEmail && "email address or username is required"
          }
        />
        <TextField
          className="my-2"
          type="password"
          required
          label="Password"
          error={!!errors.password}
          {...register("password", { required: true, minLength: 5 })}
          helperText={errors.password && "Password is required"}
        />
        <Button
          type="submit"
          disabled={load}
          className="bg-blue-500 my-2"
          variant="contained"
        >
          Login
        </Button>

        <div className="p-2 my-2">
          {!!helperText && <Alert severity="error">{helperText}</Alert>}
          {load && <LinearProgress color="primary" />}
        </div>
        <style jsx>{`
          form {
            max-width: 600px;
            padding: 1rem;
          }
          @media (max-width: 380px) {
            max-width: 400px;
            padding: 1rem;
          }
        `}</style>
      </form>
    </Paper>
  );
}
