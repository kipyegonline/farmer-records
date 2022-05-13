import React from "react";
import Box from "@mui/material/Box";

interface Project {
  name: string;
  duration: string;
  startDate: string;
  endDate: string;
  description: string;
  estimatedCOst: number;
  completed: boolean;
  altId?: string;
}
export default function AddProject() {
  return (
    <Box>
      <form></form>
    </Box>
  );
}
