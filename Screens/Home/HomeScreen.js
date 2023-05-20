import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BowlScreen from "../Bowl/BowlScreen";
import SettingsScreen from "../Settings/SettingsScreen";
import BallsScreen from "../Balls/BallsScreen";
import GuideScreen from "../Guide/GuideScreen";
import TrackerScreen from "../Tracker/TrackerScreen";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator initialRouteName="Bowl" lazy="true">
      <Tab.Screen name="Balls" component={BallsScreen} />
      <Tab.Screen name="Spare Guide" component={GuideScreen} />
      <Tab.Screen name="Bowl" component={BowlScreen} />
      <Tab.Screen name="Analytics" component={TrackerScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default HomeScreen;
