import React from "react";
import axios from "axios";
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

import { Check } from "@mui/icons-material";

interface Activity {
  activity: string;
  date: string;
  totalCost: number | string;
  description: string;
  altId?: string;
  userId?: number | string;
}
export default function AddActivity() {
  const [helperText, setText] = React.useState("");
  const [success, setSuccess] = React.useState(false);

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
    // send to server
    let cost = data.totalCost;
    // for cases where a number is entered with a comma
    if (cost.includes(",")) cost = +cost.split(",").join("");

    const payload: Activity = {
      ...data,
      totalCost: +data.totalCost,
      altId: v4(),
    };
    if (Object.values(payload).length > 4 && Object.keys(errors).length <= 0) {
      try {
        setSuccess(true);
        const res = await axios.post(
          `${process.env.api}?add-project=true`,
          payload,
          { headers: { authorization: `Bearer token` } }
        );
        if (res.status === 200) {
          setText("Activity added!");
          setTimeout(() => setText(""), 4000);

          setValue("activity", "");
          setValue("date", "");
          setValue("description", "");
          setValue("totalCost", 0);
        } else {
          throw new Error(res.statusText);
        }
      } catch (error: unknown) {
        setText(error.message);
      }
      setSuccess(false);
    } else {
      return false;
    }
  };
  //console.log(errors);
  return (
    <Box>
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
          disabled={success}
        >
          {success ? "Adding activity" : "Add Activity"}
        </Button>
        <p>{success ? "Loading" : "Loaded"} </p>
        <Alert icon={<Check />} className="p-2 m-2" severity={"success"}>
          {helperText}
        </Alert>
      </form>
    </Box>
  );
}
