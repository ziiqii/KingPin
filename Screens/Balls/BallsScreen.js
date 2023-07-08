import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
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
import Icon from "react-native-vector-icons/FontAwesome";
import _ from "lodash";
import filter from "lodash.filter";

const BallsScreen = () => {
  const auth = getAuth();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [balls, setBalls] = useState([]);
  const [filteredBalls, setFilteredBalls] = useState([]);
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
      setFilteredBalls(ballList);
      setLoading(false);
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribeBallListener();
  }, []);

  // For searchbar
  const [searchQuery, setSearchQuery] = useState("");

  const handlSearch = (query) => {
    setSearchQuery(query);
    const filteredData = filter(filteredBalls, (user) => {
      return contains(user, query);
    });
    setBalls(filteredData);
  };

  const contains = ({ name }, query) => {
    const lowerCaseName = name.toLowerCase();
    const lowerCaseQuery = query.toLowerCase();
    return lowerCaseName.includes(lowerCaseQuery);
  };

  // The following is for the tableView
  const [columns, setColumns] = useState([
    "Name",
    "Weight",
    "Differential",
    "Radius of Gyration",
  ]);
  const [direction, setDirection] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);

  // to help match up the headers of the table with the field names in the firestore
  const mapColumnName = (column) => {
    switch (column) {
      case "Name":
        return "name";
      case "Weight":
        return "weight";
      case "Differential":
        return "differential";
      case "Radius of Gyration":
        return "radiusOfGyration";
    }
  };

  // sorting function for table (ascending or descending)
  const sortTable = (column) => {
    const newDirection = direction === "desc" ? "asc" : "desc";
    const mappedColumn = mapColumnName(column);
    const sortedData = _.orderBy(balls, [mappedColumn], [newDirection]);
    setSelectedColumn(column);
    setDirection(newDirection);
    setBalls(sortedData);
  };

  const tableHeader = () => (
    <View style={styles.tableHeader}>
      {columns.map((column, index) => (
        <TouchableOpacity
          key={index}
          style={styles.columnHeader}
          onPress={() => sortTable(column)}
        >
          <Text style={styles.columnHeaderTxt}>
            {column + " "}
            {selectedColumn === column && (
              <Icon name={direction === "desc" ? "sort-desc" : "sort-asc"} />
            )}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.columnRowTxt}>{item.name}</Text>
      <Text style={styles.columnRowTxt}>{item.weight}</Text>
      <Text style={styles.columnRowTxt}>{item.differential}</Text>
      <Text style={styles.columnRowTxt}>{item.radiusOfGyration}</Text>

      <DeleteBall id={item.id} />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          backgroundColor: "#ffffff",
        }}
      >
        <View style={{ flex: 1 }}>
          <SearchBar
            placeholder="Looking for your ball?"
            platform="android"
            autoCapitalize="none"
            autoCorrect={false}
            value={searchQuery}
            onChangeText={(query) => handlSearch(query)}
          />
        </View>

        {/* <Button title="Add a new ball" onPress={toggleModal} /> */}
        <TouchableOpacity onPress={toggleModal}>
          <Icon name="plus-circle" color="#89CFF0" size={40} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={balls}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={tableHeader}
        stickyHeaderIndices={[0]}
      />
      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={toggleModal}
        backdropColor="white"
        backdropOpacity={1}
        coverScreen={false}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <CreateBall toggleModal={toggleModal} />
          <TouchableOpacity
            onPress={toggleModal}
            style={{
              borderRadius: 3,
              backgroundColor: "#673AB7",
              padding: 10,
              margin: 10,
            }}
          >
            <Text style={{ fontSize: 20, color: "white" }}>
              Return to view balls
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default BallsScreen;

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#8547c2",
    height: 50,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: 40,
    alignItems: "center",
    backgroundColor: "#8547c2",
  },
  columnHeader: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  columnHeaderTxt: {
    color: "white",
    fontWeight: "bold",
  },
  columnRowTxt: {
    width: "20%",
    textAlign: "center",
    color: "white",
  },
});
