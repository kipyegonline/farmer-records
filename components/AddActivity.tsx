import React from "react";
import axios from "axios";
import { v4 } from "uuid";
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  Alert,
  LinearProgress,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useForm, SubmitHandler } from "react-hook-form";

import { Check, Error } from "@mui/icons-material";

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
    // turn to string,Typescript
    let cost: string | number = data.totalCost + "";

    // for cases where a number is entered with a comma
    if (cost.includes(",")) cost = Number(cost.split(",").join(""));
    else cost = Number(cost);

    const payload: Activity = {
      ...data,
      totalCost: cost,
      altId: v4(),
    };
    if (Object.values(payload).length > 4 && Object.keys(errors).length <= 0) {
      try {
        setSuccess(true);
        const res = await axios.post(
          `${process.env.api}?add-activity=true`,
          payload,
          { headers: { authorization: `Bearer token` } }
        );
        if (res.status === 200) {
          setText(res.data.statusText);
          setTimeout(() => {
            setText("");
          }, 4000);
          setSuccess(false);

          setValue("activity", "");
          setValue("date", "");
          setValue("description", "");
          setValue("totalCost", 0);
        } else {
          throw new ReferenceError(res.data.statusText);
        }
      } catch (error: unknown) {
        if (typeof error === "object") {
          setText(error.message);
          setSuccess(true);
          setText("");
          setSuccess(false);
        }
      }
    } else {
      return false;
    }
  };
  //console.log(errors);
  return (
    <Box className="p-4">
      <form
        ref={form}
        style={{ maxWidth: 400, padding: "2rem" }}
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 mx-auto flex flex-col justify-evenly "
      >
        <Typography variant="h3">Add latest farm activity</Typography>
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
          className="bg-blue-600 mt-4 mb-2"
          disabled={success}
        >
          {success ? "Adding activity" : "Add Activity"}
        </Button>
        <div className="my-2">
          {success && <LinearProgress color="primary" />}
          {!!helperText && (
            <Alert
              icon={helperText.includes("404") ? <Error /> : <Check />}
              className="p-2 m-2"
              severity={helperText.includes("404") ? "warning" : "success"}
            >
              {helperText}
            </Alert>
          )}
        </div>
      </form>
    </Box>
  );
}
