import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AllTimeScreen = () => {
  const [userStats, setUserStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const auth = getAuth();
      const userRef = doc(db, "users", auth.currentUser?.email);

      try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists) {
          const userData = userDoc.data();
          setUserStats(userData);
        } else {
          console.log("No such doc");
        }
      } catch (error) {
        console.error("Could not get document", error);
      }
    };

    fetchData();
  }, []); // Run the effect only once on component mount

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "black" }}>All Time Games</Text>
      {/* conditional rendering to prevent runtime error */}
      {userStats ? (
        <Text style={{ color: "black" }}>
          Total games played: {userStats["games"]}
        </Text>
      ) : (
        <Text style={{ color: "red" }}>
          Error: userStats is undefined or null.
        </Text>
      )}
    </View>
  );
};

export default AllTimeScreen;
