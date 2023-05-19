import { View, Text } from "react-native";
import { auth } from "../../firebase";

const WelcomeScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Welcome UserXXX</Text>
      <Text>Email: {auth.currentUser?.email}</Text>
    </View>
  );
};

export default WelcomeScreen;
