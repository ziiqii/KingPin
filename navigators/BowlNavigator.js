import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import BowlScreen from "../Screens/Bowl/BowlScreen";
import StartBowlScreen from "../Screens/Bowl/StartBowlScreen";

const Stack = createNativeStackNavigator();

export default BowlNavigation = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "StartBowlScreen") {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator>
      <Stack.Screen name="BowlScreen" component={BowlScreen} />
      <Stack.Screen name="StartBowlScreen" component={StartBowlScreen} />
    </Stack.Navigator>
  );
};
