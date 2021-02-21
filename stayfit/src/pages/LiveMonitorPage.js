import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import DiseaseCard from "../components/DiseaseCard";
import Screen from "../components/Screen";

class LiveMonitorPage extends React.Component {
  state = {
    bodyTemperature: 0,
    bloodPressure: 0,
    respiration: 0,
    glucose: 0,
    heartRate: 0,
    oxygenSaturation: 0,
    cholestrol: 0,
  };

  getVitals = () => {
    fetch("https://random-data-med.herokuapp.com/api/diabetes")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        let data = res.data;
        this.setState({
          bodyTemperature: parseFloat(data.bodyTemperature),
          bloodPressure: data.bloodPressure,
          respiration: data.respiration,
          glucose: data.glucose,
          heartRate: data.heartRate,
          oxygenSaturation: data.oxygenSaturation,
          cholestrol: data.cholesterol,
        });
      });
  };

  componentDidMount() {
    this.getVitals();
    this.interval = setInterval(() => {
      this.getVitals();
    }, 30000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    const {
      bodyTemperature,
      bloodPressure,
      respiration,
      heartRate,
      oxygenSaturation,
      cholestrol,
      glucose,
    } = this.state;
    return (
      <Screen style={styles.container}>
        <View style={styles.manualHeadingContainer}>
          <Text style={styles.manualHeadingText}>Live Monitor</Text>
        </View>
        <ScrollView>
          <DiseaseCard
            title="Body Temperature"
            value={bodyTemperature}
            status={
              bodyTemperature < 35.5 || bodyTemperature > 37.5 ? true : false
            }
            description="the normal body temperature value is between 35.5 to 37.5"
          />
          <DiseaseCard
            title="Blood Pressure"
            value={bloodPressure}
            status={bloodPressure < 80 || bloodPressure > 120 ? true : false}
            description="the normal blood pressure value is between 80 to 120"
          />
          <DiseaseCard
            title="Respiration Rate"
            value={respiration}
            status={respiration < 12 || respiration > 16 ? true : false}
            description="the normal respiration rate value is between 12 to 16"
          />
          <DiseaseCard
            title="Glucose"
            value={glucose}
            status={glucose < 72 || glucose > 140 ? true : false}
            description="the normal glucose level is between 72 to 140"
          />
          <DiseaseCard
            title="Heart Rate"
            value={heartRate}
            status={heartRate < 60 || heartRate > 100 ? true : false}
            description="the normal heart beat rate value is between 60 to 100"
          />
          <DiseaseCard
            title="Blood Oxygen Saturation"
            value={oxygenSaturation}
            status={oxygenSaturation < 95 ? true : false}
            description="the normal blood oxygen saturation value is between 95 to 100"
          />
          <DiseaseCard
            title="Cholesterol"
            value={cholestrol}
            status={cholestrol < 125 || cholestrol > 200 ? true : false}
            description="the normal cholesterol value is between 125 to 200"
          />
        </ScrollView>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  manualHeadingText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  manualHeadingContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
});
export default LiveMonitorPage;
