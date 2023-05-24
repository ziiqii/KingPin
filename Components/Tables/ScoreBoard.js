import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";
import styles from "./ScoreBoard.style";

const ScoreBoard = () => {
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
      <Text></Text>
      <Table borderStyle={styles.border}>
        <Row
          data={framesBot}
          flexArr={[2, 2, 2, 3, 3]}
          style={styles.tableBot.frames}
          textStyle={styles.tableBot.frameText}
        />
        <Row
          data={rollsBot}
          flexArr={[0.99, 0.98, 0.99, 0.98, 0.99, 0.99, 0.98, 0.98, 0.98, 3.01]}
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
