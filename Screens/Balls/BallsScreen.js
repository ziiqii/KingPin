import React, { useState, useEffect } from "react";
import { Button, Text, View, FlatList } from "react-native";
import { SearchBar } from "@rneui/themed";
import Modal from "react-native-modal";
import { doc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import CreateBall from "../../Components/BallCollection/CreateBall";
import DeleteBall from "../../Components/BallCollection/DeleteBall";
import { getAuth } from "firebase/auth";

const BallsScreen = () => {
  const auth = getAuth();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [balls, setBalls] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const userRef = doc(db, "users", auth.currentUser?.email);
    const ballQuery = collection(userRef, "balls");
    onSnapshot(ballQuery, (snapshot) => {
      let ballList = [];
      snapshot.docs.map((doc) => ballList.push({ ...doc.data(), id: doc.id }));
      setBalls(ballList);
      setLoading(false);
    });
  }, []);

  const renderItem = ({ item }) => (
    <View>
      <Text style={{ fontSize: 30, textAlign: "center" }}>{item.name}</Text>
      <DeleteBall id={item.id} />
      <Text></Text>
    </View>
  );

  return (
    <View>
      <SearchBar placeholder="Figma balls?" platform="android" />
      <Button title="Add a new ball" onPress={toggleModal} />
      <FlatList
        data={balls}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={toggleModal}
        backdropColor="white"
        backdropOpacity={1}
        coverScreen={false}
      >
        <View>
          <Text>Welcome to the modal</Text>
          <CreateBall toggleModal={toggleModal} />
          <Button title="Hide Modal" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
};

export default BallsScreen;
