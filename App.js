//Import React
import React from "react";

//Import Navigators from React Navigation
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

//Import all the screens needed
import SplashScreen from "./Screen/SplashScreen";
import LoginScreen from "./Screen/LoginScreen";
import RegisterScreen from "./Screen/RegisterScreen";
//import { Addemployee } from "./Screen/Addemployee";
//import { Editemployee } from "./Screen/Editemployee";
import DrawerNavigationRoutes from "./Screen/DrawerNavigationRoutes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import "./stylesheet/stylesheet.css";

// <GlobalProvider>
//   <Switch>
//     <Route path="/employee" component={Home} exact />

//     <Route path="/edit/:id" component={Editemployee} exact />
//   </Switch>
// </GlobalProvider>;

const Auth = createStackNavigator({
  //Stack Navigator for Login and Sign up Screen
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  RegisterScreen: {
    screen: RegisterScreen,
    navigationOptions: {
      title: "Register",
      headerStyle: {
        backgroundColor: "#b19cd9",
      },
      headerTintColor: "#fff",
    },
  },
});

/* Switch Navigator for those screens which needs to be switched only once
  and we don't want to switch back once we switch from them to the next one */
const App = createSwitchNavigator({
  SplashScreen: {
    /* SplashScreen which will come once for 5 Seconds */
    screen: SplashScreen,
    navigationOptions: {
      /* Hiding header for Splash Screen */
      headerShown: false,
    },
  },
  Auth: {
    /* Auth Navigator which includer Login Signup will come once */
    screen: Auth,
  },
  DrawerNavigationRoutes: {
    /* Navigation Drawer as a landing page */
    screen: DrawerNavigationRoutes,
    navigationOptions: {
      /* Hiding header for Navigation Drawer as we will use our custom header */
      headerShown: false,
    },
  },
});

export default createAppContainer(App);
