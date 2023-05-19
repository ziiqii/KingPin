import { View, Text, Button } from "react-native";
import { auth } from "../../firebase";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Welcome UserXXX</Text>
      <Text>Email: {auth.currentUser?.email}</Text>
    </View>
  );
};

export default WelcomeScreen;