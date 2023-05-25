import React, { useState, useEffect } from "react";
import { Button, Text, View, FlatList } from "react-native";
import { SearchBar } from "@rneui/themed";
import Modal from "react-native-modal";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import CreateBall from "../../Components/BallCollection/CreateBall";
import DeleteBall from "../../Components/BallCollection/DeleteBall";



const BallsScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [balls, setBalls] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const ballQuery = collection(db, "ballCollection");
    onSnapshot(ballQuery, (snapshot) => {
      let ballList = [];
      snapshot.docs.map((doc) => ballList.push({ ...doc.data(), id: doc.id }));
      setBalls(ballList);
      setLoading(false);
    });
  }, []);

  const renderItem = ({ item }) => (
    <View>
      <Text style={{fontSize: 20}}>{item.balls}: {item.id}</Text>
      <DeleteBall id={item.id} />
    </View>
  );

  return (
    <View>
      <Text>Figma Balls</Text>
      <SearchBar placeholder="What's your ball?" platform="android" />
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
