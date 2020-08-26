//Import React
import React, { Fragment } from "react";
import { Employeelist } from "./Employeelist";

import Addemployee from "./Addemployee";
//Import all required component
import { View, Text } from "react-native";
import { GlobalContext, GlobalProvider } from "../context/GlobalState";
import {
  BrowserRouter as Router,
  useHistory,
  Link,
  Route,
} from "react-router-dom";

const HomeScreen = () => {
  global.currentScreenIndex = "HomeScreen";
  return (
    <GlobalProvider>
      <Router>
        <View style={{ flex: 1, alignItems: "center", marginTop: 100 }}>
          <Route path="/employees" component={Employeelist} />
          <Fragment>
            <div className="App">
              <div className="container mx-auto">
                <Employeelist />
              </div>
            </div>
          </Fragment>
        </View>
      </Router>
    </GlobalProvider>
  );
};
export default HomeScreen;
