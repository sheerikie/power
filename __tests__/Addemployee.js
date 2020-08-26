import "react-native";
import React from "react";
import { fireEvent, render } from "react-native-testing-library";
import HomeScreen from "../Screen/HomeScreen";
import { expect, it, jest } from "@jest/globals";

it("renders correctly", async () => {
  const email = "eve.holt@reqres.ins";
  const password = "cityslicka";
  let submittedData = {};
  // @ts-ignore
  const handleSubmit = jest.fn((data) => (submittedData = data));
  const { getByText, getByPlaceholder } = render(
    <HomeScreen onSubmit={handleSubmit} />
  );
  const button = getByText(/submit/i);

  await fireEvent.changeText(getByPlaceholder(/email/i), email);
  await fireEvent.changeText(getByPlaceholder(/password/i), password);
  fireEvent.press(button);

  expect(submittedData).toEqual({ password, email });
  expect(handleSubmit).toHaveBeenCalledWith({ password, email });
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});
