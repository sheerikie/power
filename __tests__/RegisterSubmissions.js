import "react-native";
import React from "react";
import { fireEvent, render, waitFor } from "react-native-testing-library";
import LoginSubmission from "../src/components/LoginSubmission";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

jest.mock("@react-native-community/async-storage", () => ({
  setItem: jest.fn(),
}));

jest.mock("@react-navigation/native", () => {
  return {
    createNavigatorFactory: jest.fn(),
    useNavigation: jest.fn(),
  };
});
jest.mock("react-navigation-stack", () => ({
  createStackNavigator: jest.fn(),
}));
jest.mock("@react-native-community/masked-view", () => ({}));

beforeEach(() => {
  // @ts-ignore
  useNavigation.mockReset();
});

it("renders correctly", async () => {
  const mockNavigate = jest.fn();
  // @ts-ignore
  useNavigation.mockImplementation(() => ({ navigate: mockNavigate }));
  const fakeResponse = Promise.resolve({ token: "fake-token" });
  // @ts-ignore
  global.fetch.mockResolvedValueOnce({
    json: () => Promise.resolve({ token: "fake-token" }),
  });

  const email = "eve.holt@reqres.in";
  const password = "pistol";
  const { getByText, getByPlaceholder } = render(<LoginSubmission />);
  const button = getByText(/submit/i);

  fireEvent.changeText(getByPlaceholder(/Enter Email/i), email);
  fireEvent.changeText(getByPlaceholder(/Enter Password/i), password);
  fireEvent.press(button);

  getByText(/loading/i);
  // @ts-ignore
  expect(global.fetch).toHaveBeenCalledWith("https://reqres.in/api/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "content-type": "application/json" },
  });
  // @ts-ignore
  expect(global.fetch.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        "https://reqres.in/api/register",
        Object {
          "body": "{\\"email\\":\\"eve.holt@reqres.in\\",\\"password\\":\\"pistol\\"}",
          "headers": Object {
            "content-type": "application/json",
          },
          "method": "POST",
        },
      ],
    ]
  `);

  await waitFor(() => expect(mockNavigate).toHaveBeenCalledTimes(1));
  expect(mockNavigate).toHaveBeenCalledWith("Home");
  expect(AsyncStorage.setItem).toHaveBeenCalledWith("token", "fake-token");
});
