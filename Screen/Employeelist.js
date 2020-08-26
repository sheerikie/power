import React, { Fragment, useContext, useState, useEffect } from "react";
import { GlobalContext, GlobalProvider } from "./../context/GlobalState";
import axios from "axios";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { Editemployee } from "./Editemployee";
import { Addemployee } from "./Addemployee";

export const Employeelist = () => {
  const { removeEmployee, editEmployee, setShow } = useContext(GlobalContext);

  const [show, setSho] = useState(true);
  let [employees, setResponseData] = useState("");
  const fetchData = React.useCallback(() => {
    axios({
      method: "GET",
      url: "https://reqres.in/api/users?page=2",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "quotes15.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
      },
      params: {
        language_code: "en",
      },
    })
      .then((response) => {
        setResponseData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // const handleClick = (e) => {
  console.log(employees);
  // };
  return (
    <GlobalProvider>
      <Router>
        {!show && <Route path="/edit/:id" component={Editemployee} />}
        {show && <Addemployee />}
        <Fragment>
          {employees.length > 0 ? (
            <Fragment>
              {employees.map((employee) => (
                <div
                  className="flex items-center bg-gray-100 mb-10 shadow"
                  key={employee.id + 1}
                >
                  <div className="flex-auto text-left px-4 py-2 m-2">
                    <p className="text-gray-900 leading-none">
                      {employee.first_name}
                    </p>
                    <p className="text-gray-600">{employee.last_name}</p>
                  </div>
                  <div className="flex-auto text-right px-4 py-2 m-2">
                    <Link to={`/edit/${employee.id + 1}`}>
                      <button
                        onClick={() => {
                          show == true ? setSho(false) : setSho(true);
                        }}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold mr-3 py-2 px-4 rounded-full inline-flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-edit"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                    </Link>
                    <button
                      onClick={() => removeEmployee(employee.id)}
                      className="block bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-full inline-flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-trash-2"
                      >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </Fragment>
          ) : (
            <p className="text-center bg-gray-100 text-gray-500 py-5">
              No data
            </p>
          )}
        </Fragment>
      </Router>
    </GlobalProvider>
  );
};
export default Employeelist;
