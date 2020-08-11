
import React, { Component } from "react";
import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/Home";
import CompanyInfo from "../screens/CompanyInfo";
import Hoblist from "../screens/Hoblist";
import {
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';
import Icon from '@expo/vector-icons/Ionicons';
import { createDrawerNavigator } from 'react-navigation-drawer';

export default class NavigationScreen extends Component {
  render() {
    return (
      <AppContainerHome />
    );
  }
}

const AppNavigation = createStackNavigator(
  {
    Home: Home
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      };
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator({
  Movie: {
    screen: AppNavigation
  },
  CompanyInfo: {
    screen: CompanyInfo
  },
  Hoblist: {
    screen: Hoblist
  },
});

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: AppDrawerNavigator }
});

const AppContainerHome = createAppContainer(AppSwitchNavigator);

