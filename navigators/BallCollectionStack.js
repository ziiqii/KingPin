import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BallsScreen from "../Screens/Balls/BallsScreen";
import ArsenalScreen from "../Screens/Balls/ArsenalScreen";

const Tab = createBottomTabNavigator();

export default HomeTab = () => {
  return (
    <Tab.Navigator>
      <Stack.Screen name="BallsScreen" component={BallsScreen} />
      <Stack.Screen name="ArsenalScreen" component={ArsenalScreen} />
    </Tab.Navigator>
  );
};
