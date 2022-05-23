import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignUpForm from "../pages/sign-up";
import UseInput, { SnackBarComponent } from "../utils/input/useInput";
import { TextField } from "@mui/material";

describe("User input", () => {
  beforeEach(() => render(<SignUpForm />));

  it("<Snapshot/>", () => {
    const el = screen.getByTestId("signup-form");
    expect(el).toBeInTheDocument();
    // screen.debug();
  });
});

describe("NaN", () => {
  // expect(false).toBeTruthy();
  it("renders homepage unchanged", () => {
    const { container } = render(<SignUpForm />);
    expect(container).toMatchSnapshot();
  });
});

describe("Snack bar", () => {
  test("Snackbar renders", () => {
    const _close = jest.fn();
    const helper = "Hey No value";
    render(<SnackBarComponent handleClose={_close} helperText={helper} />);
    const textel = screen.getByTestId("snackbar-text");
    const btn = screen.getByRole("button");

    expect(textel).toHaveTextContent(helper);
    fireEvent.click(btn);
    expect(_close).toHaveBeenCalledTimes(1);
    expect(textel).toBeVisible();
  });
});

describe("<TextField/>", () => {
  const _change = jest.fn();
  render(<TextField label="Jest" onChange={_change} value="Jules" />);
  const txf = screen.getByLabelText(/Jest/);
  it("checks value", () => expect(txf).toHaveValue("Vince"));
  fireEvent.change(txf, { value: "Jules" });
  it("changes", () => expect(txf).toHaveValue("Jade"));
});

class MyJules {
  public callMe(val, callback) {
    callback(val);
  }
}

describe("My little class", () => {
  let myclass!: MyJules;
  beforeEach(() => (myclass = new MyJules()));
  it("mocks the gaddam class", () => {
    let _call = jest.fn();
    myclass.callMe("I can make your bed rock", _call);
    expect(_call).toBeCalled();
    expect(_call).toBeCalledWith("My sushi raw");
  });
});
