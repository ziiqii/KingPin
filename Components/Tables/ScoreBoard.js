import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Table, Row } from "react-native-reanimated-table";
import styles from "./ScoreBoard.style";

import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import { doc, onSnapshot, query } from "firebase/firestore";

import parseScore from "../../Functions/parseGame";

const ScoreBoard = (props) => {
  const framesTop = [1, 2, 3, 4, 5, 6];
  const framesBot = [7, 8, 9, 10, "TOT"];
  const [rollsTop, setRollsTop] = useState([]);
  const [scoresTop, setScoresTop] = useState([]);
  const [rollsBot, setRollsBot] = useState([]);
  const [scoresBot, setScoresBot] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const userDoc = doc(db, "users", auth.currentUser?.email);
    const gameDoc = doc(userDoc, "games", props.Id);
    const gameQuery = query(gameDoc);

    const unsubscribeGameListener = onSnapshot(gameQuery, (doc) => {
      // parsedGame is an array of the 4 arrays to be displayed
      let parsedGame = parseScore(doc.data());
      setRollsTop(parsedGame[0]);
      setScoresTop(parsedGame[1]);
      setRollsBot(parsedGame[2]);
      setScoresBot(parsedGame[3]);
    });
    // Cleanup listener
    return () => unsubscribeGameListener();
  }, []);

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
    </View>
  );
};

export default ScoreBoard;
