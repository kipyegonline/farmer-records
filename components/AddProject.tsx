import React from "react";
import Box from "@mui/material/Box";
import { v4 } from "uuid";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Typography,
  TextField,
  Button,
  InputAdornment,
  LinearProgress,
  Alert,
} from "@mui/material";
import { CalendarMonth, CalendarViewDay } from "@mui/icons-material";
import axios from "axios";
import { conformsTo } from "cypress/types/lodash";

interface Project {
  name: string;
  duration: string;
  startDate: string;
  endDate: string;
  description: string;
  estimatedCost: number | string;
  completed: boolean;
  altId?: string;
}
export default function AddProject(): JSX.Element {
  const [helperText, setText] = React.useState("");
  const [load, setLoad] = React.useState(false);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      duration: "",
      startDate: "",
      endDate: "",
      description: "",
      estimatedCost: 0,
      completed: false,
    },
  });

  const onSubmit: SubmitHandler<Project> = async (data: Project) => {
    if (Object.values(data).length > 6 && Object.keys(errors).length <= 0) {
      let cost = data.estimatedCost;

      if (cost.includes(",")) cost = cost.split(",").join("");

      // send to server side
      const payload = {
        ...data,
        altId: v4(),
        estimatedCost: +cost,
      };
      try {
        setLoad(true);
        const res = await axios.post(
          `${process.env.api}?add-project=true`,
          payload,
          { headers: { authorization: `Bearer token` } }
        );
        if (res.status === 200) {
          setText("Project created successfully...redirecting in moment");
          setTimeout(() => setText(""), 4000);
          setValue("name", "");
          setValue("duration", "");
          setValue("startDate", "");
          setValue("endDate", "");
          setValue("description", "");
          setValue("estimatedCost", 0);
        } else {
          throw new Error(res.statusText);
        }
      } catch (error: unknown) {
        setText(error.message);
      }
      setLoad(false);
    } else {
      return false;
    }
  };

  return (
    <Box className="m-3">
      <form
        className="bg-white my-3 p-4 flex flex-col justify-evenly"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography className="text-center p-2" variant="h3">
          Create new Project
        </Typography>
        <TextField
          {...register("name", { required: true, minLength: 5 })}
          label="Enter project name"
          className="my-2 p-2"
          error={!!errors.name}
          helperText={!!errors.name && "A project name is required"}
        />
        <TextField
          className="my-2 p2 "
          label="Enter project duration"
          {...register("duration", { required: true })}
          error={!!errors.duration}
          helperText={
            !!errors.duration && "A project duration period is required"
          }
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment className=" pl-0" position="start">
                <CalendarMonth />
              </InputAdornment>
            ),
            sx: { marginRight: 5, paddingLeft: 1 },
          }}
        />
        <div className="flex flex-col flex-1 md:flex-row">
          <TextField
            error={!!errors.startDate}
            helperText={
              !!errors.startDate ? "A start date is required" : "Start date"
            }
            className="my-2 p-2"
            type="date"
            inputProps={{ shrink: true }}
            {...register("startDate", { required: true })}
          />
          <TextField
            error={!!errors.endDate}
            helperText={
              !!errors.endDate ? "A end date is required" : "End date"
            }
            className="my-2 p-2"
            type="date"
            inputProps={{ shrink: true }}
            {...register("endDate", { required: true })}
          />
        </div>

        <TextField
          label=" Add estimated cost"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Ksh</InputAdornment>
            ),
          }}
          {...register("estimatedCost", { required: true, min: 500 })}
          error={!!errors.estimatedCost}
          helperText={
            !!errors.estimatedCost && "A project estimated capital is required"
          }
        />
        <TextField
          label="Briefly describe your project"
          multiline
          className="my-2 p-2"
          rows={3}
          {...register("description", { required: true })}
          error={!!errors.description}
          helperText={
            !!errors.description &&
            "A  brief description of the project is required"
          }
        />

        <Button
          variant="contained"
          className="bg-blue-600 my-2 p-2"
          size="large"
          color="primary"
          disabled={load}
          type="submit"
        >
          {load ? "Creating project" : "Create Project"}
        </Button>
        {load && <LinearProgress className="my-2" color="primary" />}
        {!!helperText && (
          <Alert
            severity={helperText.includes("404") ? "error" : "success"}
            className="my-2"
          >
            {helperText}
          </Alert>
        )}
      </form>
      <style jsx>{`
        form {
          max-width: 500px;
        }
        @media (max-width: 480px) {
          form {
            max-width: 380px;
          }
        }
      `}</style>
    </Box>
  );
}
