import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthenticationNavigation from "./navigation/AuthenticationNavigation";

// import LoginPage from "./src/pages/LoginPage";
// import SignUpPage from "./src/pages/SignUpPage";

export default function Application() {
  return (
    <NavigationContainer>
      <AuthenticationNavigation />
    </NavigationContainer>
  );
}
