import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTab from "./HomeTab";

import RollScreen1 from "../Screens/Bowl/RollScreen1";
import RollScreen2 from "../Screens/Bowl/RollScreen2";
import GameOverScreen from "../Screens/Bowl/GameOverScreen";

import BallsScreen from "../Screens/Balls/BallsScreen";
import ArsenalScreen from "../Screens/Balls/ArsenalScreen";

const Stack = createNativeStackNavigator();

export default ScreenStack = ({}) => {
  return (
    <Stack.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        contentStyle: {
          backgroundColor: "#36393f",
        },
      }}
    >
      <Stack.Screen name="HomeTab" component={HomeTab} />

      <Stack.Screen name="RollScreen1" component={RollScreen1} />
      <Stack.Screen name="RollScreen2" component={RollScreen2} />
      <Stack.Screen name="GameOverScreen" component={GameOverScreen} />

      <Stack.Screen name="BallsScreen" component={BallsScreen} />
      <Stack.Screen name="ArsenalScreen" component={ArsenalScreen} />
    </Stack.Navigator>
  );
};
