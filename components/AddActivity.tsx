import React from "react";
import { v4 } from "uuid";
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  Alert,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useForm, SubmitHandler } from "react-hook-form";
import { SendToServer } from "../utils/input/useInput";
import { Cancel, Check } from "@mui/icons-material";

interface Activity {
  activity: string;
  date: string;
  totalCost: number;
  description: string;
  altId?: string;
  userId?: number | string;
}
export default function AddActivity() {
  const [helperText, setText] = React.useState("");
  let success;
  const form = React.useRef(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: { activity: "", date: "", totalCost: 0, description: "" },
  });
  const onSubmit: SubmitHandler<Activity> = async (data: Activity) => {
    console.log(data);
    // send to server
    const payload: Activity = {
      ...data,
      totalCost: +data.totalCost,
      altId: v4(),
    };
    console.log(payload);

    setText(helperText);
    setValue("activity", "");
    setValue("date", "");
    setValue("description", "");
    setValue("totalCost", 0);
  };
  //console.log(errors);
  return (
    <form
      ref={form}
      style={{ maxWidth: 400, padding: "2rem" }}
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 mx-auto flex flex-col justify-evenly "
    >
      <Typography className="text-center" variant="h5">
        Add Activity
      </Typography>
      <TextField
        className="my-2 "
        label="Enter activity name"
        {...register("activity", { required: true })}
        helperText={errors.activity && "Activity is required"}
        error={!!errors.activity}
      />
      <TextField
        className="my-2 "
        type="date"
        label="date"
        InputLabelProps={{ shrink: true }}
        {...register("date", { required: true, minLength: 9 })}
        helperText={errors.date && "Date is required"}
        error={!!errors.date}
      />
      <TextField
        className="my-2 "
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">Ksh.</InputAdornment>
          ),
        }}
        label="Enter cost expense"
        {...register("totalCost", { required: true, min: 10 })}
        helperText={errors.totalCost && "Cost variable is required"}
        error={!!errors.totalCost}
      />
      <TextField
        className="my-2 "
        multiline
        rows={3}
        label="Details"
        {...register("description", { required: true })}
        helperText={errors.description && " description is required"}
        error={!!errors.description}
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        className="bg-blue-600 mt-4"
        disabled={!!helperText}
      >
        Add Activity
      </Button>

      <Alert icon={<Check />} className="p-2 m-2" severity={"success"}>
        {helperText}
      </Alert>
    </form>
  );
}

function suma<T>(a: T, b: T) {
  return a + b;
}
console.log(suma(2, 3));
console.log(suma("Vince ", " Kipyegon"));
