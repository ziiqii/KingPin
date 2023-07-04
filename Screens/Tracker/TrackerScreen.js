import React from "react";
import { Text, View, Dimensions } from "react-native";
import { PieChart, LineChart } from "react-native-chart-kit";
import OSSPie from "../../Components/Analytics/OSSPie";

const TrackerScreen = () => {
  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const data2 = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Rainy Days"], // optional
  };
  return (
    <View>
      <Text>All Time Statistics:</Text>
      <Text>Total Games: Highest Score: Average Score:</Text>
      <Text></Text>
      <Text>Statistics for Today:</Text>
      <Text>Total Games: Highest Score: Average Score:</Text>
      <Text></Text>
      <OSSPie open={50} spare={40} strike={20} />
    </View>
  );
};

export default TrackerScreen;
