import React from "react";
import axios from "axios";
import { v4 } from "uuid";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  Alert,
  LinearProgress,
} from "@mui/material";
import UseInput, { SnackBarComponent } from "../../utils/input/useInput";
import { SnackbarKey } from "notistack";

type InputProps = { input: string; cost: number | string; date: string };
export default function AddInput() {
  const [helperText, setText] = React.useState("");
  const [load, setLoad] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { input: "", date: "", cost: 0 } });

  const onSubmit: SubmitHandler<InputProps> = (data: InputProps) => {
    let cost = data.cost + "";
    if (cost.includes(",")) cost = +cost.split(",").join("");

    if (cost > 5 && data.date.trim().length > 8 && data.input.length > 3) {
      const payload = {
        ...data,
        cost,
        altId: v4(),
      };
      // send to Server side

      setLoad(true);
      axios
        .post(`${process.env.api}?add-input=true`, payload)
        .then((res) => {
          if (res.status === 200) {
            setText(res.data.statusText);
            setValue("date", "");
            setValue("input", "");
            setValue("cost", 0);
          } else if (res.status === 404) {
            throw new Error("Server not found");
          } else {
            throw new Error(res.statusText);
          }
        })
        .catch((error) => setText(error.message))
        .finally(() => {
          setLoad(false);
          setTimeout(() => {
            setText("");
          }, 3000);
        });
      // reset state
    } else {
      setText("Some fields are missing");
      setTimeout(() => setText(""), 4000);
    }
  };

  return (
    <Box className="my-2 mx-auto">
      <form
        style={{ maxWidth: 400 }}
        className="flex flex-col flex-1  justify-evenly bg-white p-4"
        onSubmit={handleSubmit(onSubmit)}
        data-testid="input-form"
      >
        <Typography className="text-center bg-red-500" variant="subtitle1">
          Add project farm inputs
        </Typography>
        <TextField
          className="my-2 py-1 "
          variant="filled"
          type="text"
          label="Enter input name"
          {...register("input", {
            required: true,
          })}
          error={!!errors.input}
          helperText={
            errors.input
              ? "Farm input name is required"
              : "You can use commas to separate your items."
          }
        />
        <TextField
          className="my-2 py-1 "
          variant="filled"
          type="date"
          InputLabelProps={{ shrink: true }}
          label="date"
          helperText={
            errors.date ? "A date is required" : "Add date of input purchase"
          }
          {...register("date", { required: true, minLength: 9 })}
          error={!!errors.date}
        />
        <TextField
          className="my-2 mt-4 py-1 "
          type="number"
          {...register("cost", { required: true, min: 10 })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" className="font-bold">
                Ksh
              </InputAdornment>
            ),
            inputMode: "numeric",
          }}
          InputLabelProps={{ shrink: true }}
          variant="filled"
          label="cost of input"
          error={!!errors.cost}
          helperText={
            errors.cost ? "A cost required" : "Add date of input purchase"
          }
        />

        <Button
          type="submit"
          disabled={load}
          variant="contained"
          className="bg-blue-600"
        >
          {load ? "Adding input" : "Add input"}
        </Button>
        <div>
          {load && <LinearProgress color="primary" className="my-2" />}
          {!!helperText && (
            <Alert severity={helperText.includes("404") ? "error" : "success"}>
              {helperText}
            </Alert>
          )}
        </div>
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
            throw new Error(`pipi:` + res.statusText);
          }
        })
        .catch((error) => setText(error.message))
        .finally(() => {
          setload(false);
          setTimeout(() => {
            setText("");
          }, 3000);
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
        <div className="p-2 m-2">
          <Typography className="text-center" variant="h5">
            Add Farm activity Activity
          </Typography>
          <Typography>Presence of pests and diseases?</Typography>
          <Typography>Fruits? Flowers? weeds? </Typography>
          <Typography>Heavy rainfall or drought?</Typography>
        </div>
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
        <div className="my-2 w-full">
          {load && <LinearProgress className="my-2" color="primary" />}
          {!!helperText && (
            <Alert severity={helperText.includes("404") ? "error" : "success"}>
              {helperText}
            </Alert>
          )}
        </div>
      </form>
    </Box>
  );
};
