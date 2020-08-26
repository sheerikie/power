import React, { Fragment, useState, useContext, useEffect } from "react";
import { GlobalContext, GlobalProvider } from "./../context/GlobalState";
import Employeelist from "./Employeelist";
import {
  BrowserRouter as Router,
  useHistory,
  Link,
  Route,
} from "react-router-dom";

export const Editemployee = (props) => {
  let history = useHistory();
  const { employees, editEmployee } = useContext(GlobalContext);
  const [selectedUser, setSeletedUser] = useState({
    id: null,
    name: "",
    job: "",
  });
  const currentUserId = props.match.params.id;

  useEffect(() => {
    const employeeId = currentUserId;
    const selectedUser = employees.find(
      (emp) => emp.id === parseInt(employeeId)
    );
    setSeletedUser(selectedUser);
    // eslint-disable-next-line
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    editEmployee(selectedUser);
    history.push("/employees");
  };

  const handleOnChange = (userKey, value) =>
    setSeletedUser({ ...selectedUser, [userKey]: value });

  if (!selectedUser || !selectedUser.id) {
    return <div>sdf</div>;
  }

  return (
    <GlobalProvider>
      <Router>
        <Route path="/employees" component={Employeelist} />
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
                  value={selectedUser.name}
                  onChange={(e) => handleOnChange("name", e.target.value)}
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
                  value={selectedUser.job}
                  onChange={(e) => handleOnChange("job", e.target.value)}
                  type="text"
                  placeholder="Enter job"
                />
              </div>
              <div className="flex items-center justify-between">
                <button className="block mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:text-gray-600 focus:shadow-outline">
                  Edit Employee
                </button>
              </div>
              <div className="text-center mt-4 text-gray-500">
                <Link to="/">Cancel</Link>
              </div>
            </form>
          </div>
        </Fragment>
      </Router>
    </GlobalProvider>
  );
};
