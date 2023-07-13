import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TodayScreen from "../Screens/Tracker/TodayScreen";
import ThirtyGameScreen from "../Screens/Tracker/ThirtyGameScreen";
import AllTimeScreen from "../Screens/Tracker/AllTimeScreen";

const Tab = createMaterialTopTabNavigator();

export default MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="TodayScreen"
      screenOptions={{
        // activeTintColor: "",
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: "powderblue" },
      }}
    >
      <Tab.Screen
        name="TodayScreen"
        component={TodayScreen}
        options={{ tabBarLabel: "Today's Games" }}
      />
      <Tab.Screen
        name="ThirtyGameScreen"
        component={ThirtyGameScreen}
        options={{ tabBarLabel: "Past 30 Games" }}
      />
      <Tab.Screen
        name="AllTimeScreen"
        component={AllTimeScreen}
        options={{ tabBarLabel: "All Time Games" }}
      />
    </Tab.Navigator>
  );
};
