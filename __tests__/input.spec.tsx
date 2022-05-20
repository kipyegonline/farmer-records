import React from "react";
import { render, screen } from "@testing-library/react";
import SignUpForm from "../pages/sign-up";

describe("User input", () => {
  beforeEach(() => render(<SignUpForm />));

  it("<Snapshot/>", () => {
    const el = screen.getByTestId("signup-form");
    expect(el).toBeInDocument();
    screen.debug();
  });
});

describe("NaN", () => {
  expect(false).toBeTruthy();
});
