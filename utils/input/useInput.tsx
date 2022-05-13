import { TextField, Snackbar, IconButton, Alert } from "@mui/material";
import Close from "@mui/icons-material/Close";
import React from "react";
import axios from "axios";

type Callback = () => void;
type InputValue = [
  { value: string; onChange(e: React.ChangeEvent): void },
  Callback
];

export default function UseInput<a>(initialState: a): InputValue {
  const [value, setValue] = React.useState<any>(initialState);
  const input = {
    value,

    // color: !!value.length ? "success" : "primary",
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      let target = e.target as HTMLInputElement;
      setValue(target?.value);
    },
  };

  return [input, () => setValue(initialState)];
}

export const SnackBarComponent = ({
  handleClose = (e: Event, f: SnackbarCloseReason): void | boolean => f,
  helperText = "",
}) => {
  const action = (
    <IconButton onClick={handleClose}>
      <Close />
    </IconButton>
  );
  return (
    <Snackbar
      action={action}
      className="mt-6 bg-red-600 absolute"
      sx={{ background: "red", marginTop: 20 }}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={!!helperText}
      message={helperText}
      onClose={handleClose}
    >
      <Alert action={action} data-testid="snackbar-text" severity="error">
        {helperText}
      </Alert>
    </Snackbar>
  );
};

type Server = { success: boolean; helperText: string };

export const SendToServer = async <T extends {}>(url: string, payload: T) => {
  const [success, setSuccess] = React.useState(false);
  const [helperText, setText] = React.useState("");

  const sendData = async (url) => {
    try {
      const res = await axios.post(`${process.env.api}${url}`, payload);
      if (res.status === 200) {
        setSuccess(true);
        setText(res.statusText);
      }
    } catch (error) {
      if (error) setText(error.message);
    }
    setTimeout(() => {
      setText("");
      setSuccess(false);
    }, 4000);
  };
  React.useEffect(() => {
    sendData(url);
  }, [url]);
  return { success, helperText };
};
