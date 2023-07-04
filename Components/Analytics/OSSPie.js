import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

/*
1. This pie chart takes in integer values to be displayed.
*/

const OSSPie = (props) => {
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

  const data = [
    {
      name: `Open (${props.open})`,
      count: props.open,
      color: "#737373",
      legendFontColor: "white",
      legendFontSize: 15,
    },
    {
      name: `Spare (${props.spare})`,
      count: props.spare,
      color: "#d5fddb",
      legendFontColor: "white",
      legendFontSize: 15,
    },
    {
      name: `Strike (${props.strike})`,
      count: props.strike,
      color: "white",
      legendFontColor: "white",
      legendFontSize: 15,
    },
  ];

  return (
    <PieChart
      data={data}
      width={screenWidth}
      height={250}
      chartConfig={chartConfig}
      accessor={"count"}
      backgroundColor={"#36393f"} // can set "transparent"
      paddingLeft={"15"}
      center={[10, -10]}
      absolute={false}
      hasLegend={true}
      avoidFalseZero={true}
    />
  );
};

export default OSSPie;
