import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import BowlScreen from "../Screens/Bowl/BowlScreen";
import Roll1 from "../Screens/Bowl/Roll1";
import Roll2 from "../Screens/Bowl/Roll2";

const Stack = createNativeStackNavigator();

export default BowlNavigation = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    const tabHiddenRoutes = ["Roll1", "Roll2"];
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator>
      <Stack.Screen name="BowlScreen" component={BowlScreen} />
      <Stack.Screen name="Roll1" component={Roll1} />
      <Stack.Screen name="Roll2" component={Roll2} />
    </Stack.Navigator>
  );
};
