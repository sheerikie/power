globals.DEV = true;
import "react-native";
import React from "react";
import { fireEvent, render } from "react-native-testing-library";
import RegisterScreen from "../Screen/RegisterScreen";
import { expect, it, jest } from "@jest/globals";

it("renders correctly", async () => {
  const email = "eve.holt@reqres.ins";
  const password = "cityslicka";
  let submittedData = {};
  // @ts-ignore
  const handleSubmit = jest.fn((data) => (submittedData = data));
  const { getByText, getByPlaceholder } = render(
    <RegisterScreen onSubmit={handleSubmit} />
  );
  const button = getByText(/REGISTER/i);

  await fireEvent.changeText(getByPlaceholder(/Enter Email/i), email);
  await fireEvent.changeText(getByPlaceholder(/Enter Password/i), password);
  fireEvent.press(button);

  expect(submittedData).toEqual({ password, email });
  expect(handleSubmit).toHaveBeenCalledWith({ password, email });
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});
