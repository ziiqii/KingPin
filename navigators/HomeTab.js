import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BowlScreen from "../Screens/Bowl/BowlScreen";
import SettingsScreen from "../Screens/Settings/SettingsScreen";
import GuideScreen from "../Screens/Guide/GuideScreen";
import TrackerScreen from "../Screens/Tracker/TrackerScreen";
import BallsMainScreen from "../Screens/Balls/BallsMainScreen";

const Tab = createBottomTabNavigator();

export default HomeTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Bowl"
      lazy="true"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Balls" component={BallsMainScreen} />
      <Tab.Screen name="Spare Guide" component={GuideScreen} />
      <Tab.Screen name="Bowl" component={BowlScreen} />
      <Tab.Screen name="Analytics" component={TrackerScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
