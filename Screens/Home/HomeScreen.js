import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from "../Welcome/WelcomeScreen";
import SettingsScreen from "../Settings/SettingsScreen";
import BallsScreen from "../BallsScreen/BallsScreen";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Balls" component={BallsScreen} />
      <Tab.Screen name="Welcome" component={WelcomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default HomeScreen;
