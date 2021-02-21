import React from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import color from "../config/colors";

import LiveMonitorPage from "../pages/LiveMonitorPage";
import ProfilePage from "../pages/ProfilePage";
import ManualDataPage from "../pages/ManualDataPage";
import StatusPage from "../pages/StatusPage";

const Tab = createMaterialBottomTabNavigator();

const MainNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    barStyle={{ backgroundColor: color.primary }}
  >
    <Tab.Screen
      name="Monitor"
      component={LiveMonitorPage}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="heart" color={color} size={20} />
        ),
      }}
    />
    <Tab.Screen
      name="Form"
      component={ManualDataPage}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="form-select" color={color} size={20} />
        ),
      }}
    />

    <Tab.Screen
      name="status"
      component={StatusPage}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="equalizer" color={color} size={20} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfilePage}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={20} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainNavigator;
