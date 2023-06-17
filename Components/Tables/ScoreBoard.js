import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-reanimated-table";
import styles from "./ScoreBoard.style";

import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import {
  doc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";

const ScoreBoard = (props) => {
  useEffect(() => {
    const auth = getAuth();
    const userDoc = doc(db, "users", auth.currentUser?.email);
    const gameDoc = doc(userDoc, "games", props.Id);
    const gameQuery = query(gameDoc);

    const unsubscribeGameListener = onSnapshot(gameQuery, (doc) => {
      console.log("Current data: ", doc.data());
      // Function to parse a game (10 frames) into 6 arrays to be displayed below
      // parsedGame is an array of the 6 arrays
      // parsedGame = function(doc.data())
      // -> call parsedGame[0], parsedGame[1] etc
    });
    // Cleanup listener
    return () => unsubscribeGameListener();
  }, []);

  const framesTop = ["1", "2", "3", "4", "5", "6"];
  const rollsTop = ["2", "5", "8", "1", "5", "/", "X", "", "8", "/", "2", "5"];
  const scoresTop = ["7", "16", "36", "56", "68", "75"];

  const framesBot = ["7", "8", "9", "10", "TOT"];
  const rollsBot = ["7", "/", "6", "3", "8", "/", "7", "/", "4", "?"];
  const scoresBot = ["91", "100", "117", "131", "131"];

  return (
    <View style={styles.container}>
      <Table borderStyle={styles.border}>
        <Row
          data={framesTop}
          style={styles.tableTop.frames}
          textStyle={styles.tableTop.frameText}
        />
        <Row
          data={rollsTop}
          style={styles.tableTop.rolls}
          textStyle={styles.tableTop.rollText}
        />
        <Row
          data={scoresTop}
          style={styles.tableTop.scores}
          textStyle={styles.tableTop.scoreText}
        />
      </Table>

      <Table borderStyle={styles.border}>
        <Row
          data={framesBot}
          flexArr={[2, 2, 2, 3, 3]}
          style={styles.tableBot.frames}
          textStyle={styles.tableBot.frameText}
        />
        <Row
          data={rollsBot}
          flexArr={[0.99, 0.99, 0.99, 0.98, 0.99, 0.98, 0.98, 0.98, 0.98, 3.01]}
          style={styles.tableBot.rolls}
          textStyle={styles.tableBot.rollText}
        />
        <Row
          data={scoresBot}
          flexArr={[2, 2, 2, 3, 3]}
          style={styles.tableBot.scores}
          textStyle={styles.tableBot.scoreText}
        />
      </Table>
      <View>
        <Text>{props.Id}</Text>
      </View>
    </View>
  );
};

export default ScoreBoard;
