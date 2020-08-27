import "react-native";
import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  wait,
} from "@testing-library/react-native";
import App from "../Screen/HomeScreen";

//mocking async storage module
jest.mock("@react-native-community/async-storage", () => ({
  setItem: jest.fn(),
}));

afterEach(cleanup);

it("renders/navigats throughout app screens", async () => {
  const { getByText } = render(<App />);
  const homeText = getByText(/HomeScreen/i);
  expect(homeText).not.toBeNull();
  fireEvent.press(getByText(/SettingsScreen/i));

  await wait(() => {
    const counterText = getByText(/Setting Screen/i);
    expect(counterText.props.children).toEqual(["Setting Screen "]);
  });
});
