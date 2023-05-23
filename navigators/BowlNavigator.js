import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import BowlScreen from "../Screens/Bowl/BowlScreen";
import StartBowlScreen from "../Screens/Bowl/StartBowlScreen";

const Stack = createNativeStackNavigator();

export default BowlNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BowlScreen" component={BowlScreen} />
      <Stack.Screen name="StartBowlScreen" component={StartBowlScreen} />
    </Stack.Navigator>
  );
};
