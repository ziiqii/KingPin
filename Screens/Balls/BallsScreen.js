import React, { useState, useEffect } from "react";
import { Button, Text, View, FlatList } from "react-native";
import { SearchBar } from "@rneui/themed";
import Modal from "react-native-modal";
import {
  doc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
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
    const userRef = doc(db, "users", auth.currentUser?.email); // Reference to this user's document
    const ballRef = collection(userRef, "balls"); // Reference to this user's ball collection
    const ballQuery = query(ballRef, orderBy("name", "asc")); // Sorted by name
    const unsubscribeBallListener = onSnapshot(ballQuery, (snapshot) => {
      let ballList = [];
      snapshot.docs.map((doc) => ballList.push({ ...doc.data(), id: doc.id }));
      setBalls(ballList);
      setLoading(false);
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribeBallListener();
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: "row" }}>
      <DeleteBall id={item.id} />
      <Text style={{ fontSize: 20, textAlign: "center", color: "white" }}>
        {item.name}
      </Text>
      <Text style={{ fontSize: 20, textAlign: "center", color: "white" }}>
        {item.weight}
      </Text>
      <Text style={{ fontSize: 20, textAlign: "center", color: "white" }}>
        {item.differential}
      </Text>
      <Text style={{ fontSize: 20, textAlign: "center", color: "white" }}>
        {item.radiusOfGyration}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <SearchBar placeholder="Looking for your ball?" platform="android" />
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
          <CreateBall toggleModal={toggleModal} />
          <Button title="Hide Modal" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
};

export default BallsScreen;
