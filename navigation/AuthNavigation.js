import { createStackNavigator } from "react-navigation-stack";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Home from "../screens/Home"
import ForgotPassword from "../screens/ForgotPassword";

const AuthNavigation = createStackNavigator(
  {
    Home: { screen: Home },
    Login: { screen: Login },
    Signup: { screen: Signup },
    ForgotPassword: { screen: ForgotPassword }
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);

export default AuthNavigation;
