globals.DEV = true;
import "react-native";
import React from "react";
import { fireEvent, render } from "react-native-testing-library";
import LoginScreen from "../Screen/LoginScreen";
import { expect, it, jest } from "@jest/globals";

it("renders correctly", async () => {
  const email = "eve.holt@reqres.ins";
  const password = "cityslicka";
  let submittedData = {};
  // @ts-ignore
  const handleSubmit = jest.fn((data) => (submittedData = data));
  const { getByText, getByPlaceholder } = render(
    <LoginScreen onSubmit={handleSubmit} />
  );
  const button = getByText(/LOGIN/i);

  await fireEvent.changeText(getByPlaceholder(/Enter Email/i), email);
  await fireEvent.changeText(getByPlaceholder(/Enter Password/i), password);
  fireEvent.press(button);

  expect(submittedData).toEqual({ password, email });
  expect(handleSubmit).toHaveBeenCalledWith({ password, email });
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});
