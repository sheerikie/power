import "react-native";
import React from "react";
import { fireEvent, render } from "react-native-testing-library";
import Editemployee from "../Screen/Editemployee";
import { expect, it, jest } from "@jest/globals";

it("renders correctly", async () => {
  const name = "morpheus";
  const job = "leader";
  let submittedData = {};
  // @ts-ignore
  const handleSubmit = jest.fn((data) => (submittedData = data));
  const { getByText, getByPlaceholder } = render(
    <Editemployee onSubmit={handleSubmit} />
  );
  const button = getByText(/Edit Employee/i);

  await fireEvent.changeText(getByPlaceholder(/name/i), name);
  await fireEvent.changeText(getByPlaceholder(/job/i), job);
  fireEvent.press(button);

  expect(submittedData).toEqual({ job, name });
  expect(handleSubmit).toHaveBeenCalledWith({ job, name });
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});
