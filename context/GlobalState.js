import React, { createContext, useReducer, useState, useEffect } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

const initialState = {
  employees: [],
  show: false,
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function removeEmployee(id) {
    axios
      .delete(`https://reqres.in/api/users/${id}`)
      .then(() => {
        return axios.get(`https://reqres.in/api/users`);
      })
      .then((res) => {
        // Update users in state as per-usual
        const users = res.data;
        //this.setState({ users });
        console.log(users);
      });
    dispatch({
      type: "REMOVE_EMPLOYEE",
      payload: id,
    });
  }
  function setShow(show) {
    dispatch({
      type: "Show View",
      payload: show,
    });
  }

  function addEmployee(employees) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ employees }),
    };
    fetch("https://reqres.in/api/users", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));

    dispatch({
      type: "ADD_EMPLOYEES",
      payload: employees,
    });
  }

  function editEmployee(employees) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ employees }),
    };
    fetch("https://reqres.in/api/users", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
    dispatch({
      type: "EDIT_EMPLOYEE",
      payload: employees,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        employees: state.employees,
        show: state.show,
        removeEmployee,
        addEmployee,
        setShow,
        editEmployee,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
