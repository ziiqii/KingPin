import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BowlScreen from "../Screens/Bowl/BowlScreen";
import SettingsScreen from "../Screens/Settings/SettingsScreen";
import BallsScreen from "../Screens/Balls/BallsScreen";
import GuideScreen from "../Screens/Guide/GuideScreen";
import TrackerScreen from "../Screens/Tracker/TrackerScreen";

const Tab = createBottomTabNavigator();

export default FeatureNavigation = () => {
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
