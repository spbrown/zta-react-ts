import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import RiskAssessmentsScreen from '../screens/RiskAssessmentsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RiskAssessmentScreen from '../screens/RiskAssessmentScreen';
import RiskAssessmentAddScreen from '../screens/RiskAssessmentAddScreen';
//import console = require('console');
 
// Icons here
// https://infinitered.github.io/ionicons-version-3-search/

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Profile: ProfileScreen,
});

HomeStack.navigationOptions = ({ navigation }) => {

  tabBarLabel = 'Risk Assessments';

  let tabBarVisible = true

  const { routeName } = navigation.state.routes[navigation.state.index]

  if (routeName === 'Profile') {
    tabBarVisible = false
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Staff',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
      />
    ),
  }
};

const RiskAssessmentsStack = createStackNavigator({
  RiskAssessments: RiskAssessmentsScreen,
  RiskAssessment: RiskAssessmentScreen,
  RiskAssessmentAdd: RiskAssessmentAddScreen,
});

RiskAssessmentsStack.navigationOptions = ({ navigation }) => {

  tabBarLabel = 'Risk Assessments';

  let tabBarVisible = true

  const { routeName } = navigation.state.routes[navigation.state.index]

  if (routeName === 'RiskAssessmentAdd') {
    tabBarVisible = false
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Risk Assessments',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-warning' : 'md-warning'}
      />
    ),
  }
}

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

export default createBottomTabNavigator({
  RiskAssessmentsStack,
  HomeStack,
  SettingsStack,
});

