//Import React
import React from "react";

//Import Navigators
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

//Import External Screens
import HomeScreen from "./HomeScreen";
import PostsScreen from "./PostsScreen";
import SettingsScreen from "./drawerScreens/SettingsScreen";
import CustomSidebarMenu from "./Components/CustomSidebarMenu";
import NavigationDrawerHeader from "./Components/NavigationDrawerHeader";
//import { Editemployee } from "./Editemployee";

const FirstActivity_StackNavigator = createStackNavigator({
  First: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Home Screen",
      headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#b19cd9",
      },
      headerTintColor: "#fff",
    }),
  },
});

const SecondActivity_StackNavigator = createStackNavigator({
  First: {
    screen: SettingsScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Setting Screen",
      headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#b19cd9",
      },
      headerTintColor: "#fff",
    }),
  },
});

const ThirdActivity_StackNavigator = createStackNavigator({
  First: {
    screen: PostsScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Add Post Screen",
      headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#b19cd9",
      },
      headerTintColor: "#fff",
    }),
  },
});
// const FourthActivity_StackNavigator = createStackNavigator({
//   First: {
//     screen: Editemployee,
//     navigationOptions: ({ navigation }) => ({
//       title: "Edit Post Screen",
//       headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
//       headerStyle: {
//         backgroundColor: "#b19cd9",
//       },
//       headerTintColor: "#fff",
//     }),
//   },
// });
const DrawerNavigatorRoutes = createDrawerNavigator(
  {
    HomeScreen: {
      screen: FirstActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: "Home Screen",
      },
    },
    SettingsScreen: {
      screen: SecondActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: "Setting Screen",
      },
    },
    PostsScreen: {
      screen: ThirdActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: "Add Post Screen",
      },
    },
    // Editemployee: {
    //   screen: FourthActivity_StackNavigator,
    //   navigationOptions: {
    //     drawerLabel: "Edit Post Screen",
    //   },
    // },
  },
  {
    contentComponent: CustomSidebarMenu,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
  }
);
export default DrawerNavigatorRoutes;
