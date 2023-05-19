import { View, Text, Button, Settings } from "react-native";
import { auth } from "../../firebase";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from "../Welcome/WelcomeScreen";
import SettingsScreen from "../Settings/SettingsScreen";

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Welcome" component={WelcomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default HomeScreen;
