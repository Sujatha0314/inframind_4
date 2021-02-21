import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import DiseaseStatusCard from "../components/DiseaseStatusCard";
import Screen from "../components/Screen";

class StatusPage extends React.Component {
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
    return (
      <Screen style={styles.container}>
        <View style={styles.manualHeadingContainer}>
          <Text style={styles.manualHeadingText}>Health Status</Text>
        </View>
        <ScrollView>
          <DiseaseStatusCard
            title="Diabetes"
            description="increased level in blood sugar level (more than 200 mg/dl)"
            status={this.state.glucose > 200 ? true : false}
          />
          <DiseaseStatusCard
            title="Prediabetes"
            description="blood sugar level 140 and 199 mg/dl"
            status={
              this.state.glucose > 140 && this.state.glucose < 200
                ? true
                : false
            }
          />
          <DiseaseStatusCard
            title="Coronary heart disease"
            description="The  major  blood  vessels  that supply  the  heart  with  blood become clogged with deposits of cholesterol."
            status={false}
          />
          <DiseaseStatusCard
            title="bronchiectasis"
            description="A person will have a persistent cough and frequent infections"
            status={false}
          />
          <DiseaseStatusCard
            title="hypoxemia"
            description="Normal  oxygen  saturation  is  usually  between 96%and 98%.  Any  level  below  this  is considered dangerous and leads to hypoxemia."
            status={false}
          />
          <DiseaseStatusCard
            title="Asthma"
            description="Is characterized by an oxygen saturation level of 92% to 95%, a pulse of 100 to 125 beats per minute, a respiratory rate of 20 to 30 breaths per minute"
            status={false}
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
export default StatusPage;
