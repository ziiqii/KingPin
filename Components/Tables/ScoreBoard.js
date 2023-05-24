import { Text, View } from "react-native";
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
  const framesTop = ["1", "2", "3", "4", "5", "6"]; // index = frame - 1
  const rollsTop = ["X", "/", "", "", "", "", "", "", "", "", "", ""]; // round down (index / 2) = frame - 1
  const scoresTop = ["20", "300", "", "", "", ""]; // index = frame - 1

  const framesBot = ["7", "8", "9", "10", "TOT"]; // index = frame - 1
  const rollsBot = ["X", "/", "", "", "", "", "", "", "", "", "", ""]; // round down (index / 2) = frame - 1
  const scoresBot = ["20", "300", "", "", "", ""]; // index = frame - 1

  return (
    <View style={styles.container}>
      <Table borderStyle={styles.border}>
        <Row data={framesTop} style={styles.frames} textStyle={styles.frameTextTop} />
        <Row data={rollsTop} style={styles.rolls} textStyle={styles.rollTextTop} />
        <Row data={scoresTop} style={styles.scores} textStyle={styles.scoreTextTop} />
      </Table>
        <Text></Text>
      <Table borderStyle={styles.border}>
        <Row data={framesBot} style={styles.frames} textStyle={styles.frameTextTop} />
        <Row data={rollsBot} style={styles.rolls} textStyle={styles.rollTextTop} />
        <Row data={scoresBot} style={styles.scores} textStyle={styles.scoreTextTop} />
      </Table>
    </View>
  );
};

export default ScoreBoard;
