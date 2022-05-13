import React from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import UseInput, { SnackBarComponent } from "../../utils/input/useInput";
import { SnackbarKey } from "notistack";

export default function AddInput() {
  const [input, resetInput] = UseInput("");
  const [date, resetDate] = UseInput(new Date());
  const [cost, resetCost] = UseInput(0);
  const [helperText, setText] = React.useState("");
  const [load, setLoad] = React.useState(false);

  const validateValues = () => {
    let valid = false;
    if (input.value.trim().length < 1) {
      setText("Enter input name");
    } else if (date.value.length < 9) {
      setText("Enter date of input purchase");
    } else if (+cost.value < 10) {
      setText("Enter cost of input");
    } else {
      valid = true;
    }
    setTimeout(() => setText(""), 4000);
    return valid;
  };
  const onClose = (e: React.MouseEvent, r: SnackbarKey): void | boolean => {
    if (r === "clickaway") return;
    setText("");
  };
  const onBlur = (e: React.FocusEvent) => {
    let target = e.target as HTMLInputElement;

    if (target.value.trim().length < 3) setText(`${target.name} is required`);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateValues()) {
      const payload = {
        inputName: input.value,
        cost: cost.value,
        date: date.value,
      };
      // send to Server side

      setLoad(true);
      axios
        .post(`${process.env.api}?add-input=true`, payload)
        .then((res) => {
          console.log("RES", res);
          if (res.status === 200) {
            setText("Information added successfully!");
            resetCost();
            resetDate();
            resetInput();
          } else if (res.status === 404) {
            throw new Error("Server not found");
          } else {
            throw new Error(res.statusText);
          }
        })
        .catch((error) => setText(error.message))
        .finally(() => {
          setTimeout(() => setText(""), 4000);
          setLoad(false);
        });
      // reset state
    } else {
      setText("All fields are required");
      setTimeout(() => setText(""), 4000);
    }
  };
  return (
    <Box className="my-2 mx-auto">
      <form
        style={{ maxWidth: 400 }}
        className="flex flex-col flex-1  justify-evenly bg-white p-4"
        onSubmit={handleSubmit}
        data-testid="input-form"
      >
        <Typography className="text-center" variant="subtitle1">
          Add project farm inputs
        </Typography>
        <TextField
          name="input name"
          className="my-2 py-1 "
          variant="filled"
          type="text"
          label="Enter input name"
          {...input}
          onBlur={onBlur}
          helperText="You can use commas to separate your items."
        />
        <TextField
          name="date"
          className="my-2 py-1 "
          variant="filled"
          type="date"
          InputLabelProps={{ shrink: true }}
          label="date"
          helperText="Add date of input purchase"
          {...date}
          onBlur={onBlur}
        />
        <TextField
          name="Cost of input"
          className="my-2 mt-4 py-1 "
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" className="font-bold">
                Ksh
              </InputAdornment>
            ),
            inputMode: "numeric",
          }}
          InputLabelProps={{ shrink: true }}
          onBlur={onBlur}
          variant="filled"
          label="cost of input"
          {...cost}
        />

        <Button
          type="submit"
          disabled={load}
          variant="contained"
          className="bg-blue-600"
        >
          {load ? "Adding input" : "Add input"}
        </Button>
        <SnackBarComponent helperText={helperText} handleClose={onClose} />
      </form>
    </Box>
  );
}

type FarmNotes = {
  date: string;
  notes: string;
  load: boolean;
  altId?: string;
};
export const AddFarmNotes = () => {
  const [date, resetDate] = UseInput("");
  const [notes, ResetNotes] = UseInput("");
  const [load, setload] = React.useState(false);
  const [helperText, setText] = React.useState("");

  const onBlur = (e: React.FocusEvent) => {
    let target = e.target as HTMLInputElement;
    if (target.value.trim().length < 1) setText(`${target.name} is required`);
    setTimeout(() => setText(""), 4000);
  };

  const onClose = (e: React.MouseEvent, r: string): void | boolean => {
    if (r === "clickaway") return false;
    setText("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date.value.trim().length < 9) {
      setText("Choose a date ");
    } else if (notes.value.trim().length < 5) {
      setText("Enter notes for your project");
    } else {
      // send payload to server side
      setload(true);
      axios
        .post(`${process.env.api}?add-note=true`, {
          note: notes.value,
          date: date.value,
        })
        .then((res) => {
          if (res.status === 200) {
            setText("Note added successfully");
            resetDate();
            ResetNotes();
          } else if (res.status === 404) {
            throw new Error(res.statusText);
          }
        })
        .catch((error) => setText(error.message))
        .finally(() => {
          setTimeout(() => {
            setText("");
            setload(false);
          }, 4000);
        });
    }
  };
  return (
    <Box className="my-2">
      <form
        onSubmit={handleSubmit}
        data-testid="notes-form"
        style={{ maxWidth: 400 }}
        className="flex flex-col justify-evenly items-start p-4  bg-white"
      >
        <Typography paragraph className="text-center">
          Add Notes on farm progress today
        </Typography>
        <TextField
          type="date"
          name="date"
          onBlur={onBlur}
          fullWidth
          className="my-2 py-1"
          {...date}
        />
        <TextField
          multiline
          name="Note"
          onBlur={onBlur}
          rows={3}
          className="my-2 py-1"
          fullWidth
          {...notes}
        />
        <Button
          variant="contained"
          color="primary"
          className="bg-blue-600 w-full"
          type="submit"
          disabled={load}
        >
          {load ? "Adding note" : "Add Note"}
        </Button>
        <SnackBarComponent helperText={helperText} handleClose={onClose} />
      </form>
    </Box>
  );
};

function makeArr<T>(nums: T[]): T {
  return nums[nums.length - 1];
}

let mynum = makeArr([1, 2, 3, 4, 5, 6]);
let mynm = makeArr(["as", "asd", "asdf", "asdfg"]);
