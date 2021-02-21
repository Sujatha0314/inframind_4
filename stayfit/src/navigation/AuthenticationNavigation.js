import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import MainNavigation from "./MainNavigation";

const Tab = createStackNavigator();

const AuthenticationNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Login"
      component={LoginPage}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Sign Up"
      component={SignUpPage}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="App"
      component={MainNavigation}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);

export default AuthenticationNavigator;
