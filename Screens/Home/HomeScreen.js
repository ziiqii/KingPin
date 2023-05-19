import { View, Text, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth } from "../../firebase";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Text>Email: {auth.currentUser?.email}</Text>
      <Button
        title="Settings"
        onPress={() => navigation.replace("SettingsScreen")}
      ></Button>
    </View>
  );
};

export default HomeScreen;
