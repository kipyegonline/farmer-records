/// cypress
import { mount } from "@cypress/react";
import { TextField } from "@mui/material";
/* eslint-disable */

describe("<Input Field />", () => {
  beforeEach(() => console.log("running test suite"));
  //cy.get("[data-test-id='vince']");
  it("doesnot nothing", () => {
    expect(true).to.equal(!false);
  });
});

describe.skip("<Axios/>", () => {
  it("well, nothing", () => {
    cy.visit("localhost:3000");
    cy.get(".form");
  });
});

describe("<Unit tests", () => {
  let dove = "Call up by your name";
  mount(<TextField value={dove} placeholder="Enter something" />);
  test("text field", () => {
    cy.get("[data-testid='dove']");
  });
});
