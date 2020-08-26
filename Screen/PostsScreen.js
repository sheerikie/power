import React, { Fragment, useState, useContext } from "react";
import { GlobalContext } from "./../context/GlobalState";

import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { View, Text } from "react-native";
import { BrowserRouter as Router, Switch, useLocation } from "react-router-dom";

const PostsScreen = () => {
  const [name, setName] = useState("");

  const [job, setJob] = useState("");
  const { addEmployee, employees } = useContext(GlobalContext);
  let history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    const newEmployee = {
      id: employees.length + 1,
      name,
      job,
    };
    addEmployee(newEmployee);
    history.push("/");
  };
  return (
    <Router>
      <Fragment>
        <div className="w-full max-w-sm container mt-20 mx-auto">
          <form onSubmit={onSubmit}>
            <div className="w-full mb-5">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="name"
              >
                Name of employee
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter name"
              />
            </div>

            <div className="w-full  mb-5">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="job"
              >
                Job
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
                value={job}
                onChange={(e) => setJob(e.target.value)}
                type="text"
                placeholder="Enter job"
              />
            </div>
            <div className="flex items-center justify-between">
              <button className="mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Add Employee
              </button>
            </div>
            <div className="text-center mt-4 text-gray-500">
              <Link to="/">Cancel</Link>
            </div>
          </form>
        </div>
      </Fragment>
    </Router>
  );
};
export default PostsScreen;
