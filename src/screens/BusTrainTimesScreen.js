import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";

const API_KEY = "4645be5f2d5b4333af04661db9823aa4"; 
const STOP_ID = "490008660N"; // 🔹 Example bus stop ID (replace with your stop)
const LINE_ID = "victoria"; // 🔹 Example tube line (replace with your train line)

const BusTrainTimesScreen = () => {
  const [busTimes, setBusTimes] = useState([]);
  const [trainTimes, setTrainTimes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch TFL API Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Bus Arrivals
        const busResponse = await fetch(
          `https://api.tfl.gov.uk/StopPoint/${STOP_ID}/Arrivals?app_key=${API_KEY}`
        );
        const busData = await busResponse.json();

        // Fetch Train Arrivals
        const trainResponse = await fetch(
          `https://api.tfl.gov.uk/Line/${LINE_ID}/Arrivals?app_key=${API_KEY}`
        );
        const trainData = await trainResponse.json();

        setBusTimes(busData.sort((a, b) => a.timeToStation - b.timeToStation)); // Sort by arrival time
        setTrainTimes(trainData.sort((a, b) => a.timeToStation - b.timeToStation)); // Sort by arrival time
        setLoading(false);
      } catch (error) {
        console.error("Error fetching TFL data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚍 Bus & 🚆 Train Arrivals</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#257f66" />
      ) : (
        <>
          <Text style={styles.sectionTitle}>🚌 Bus Arrivals</Text>
          <FlatList
            data={busTimes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.transportTitle}>{item.lineName} - {item.destinationName}</Text>
                <Text style={styles.time}>Arrives in {Math.round(item.timeToStation / 60)} min</Text>
              </View>
            )}
          />

          <Text style={styles.sectionTitle}>🚆 Train Arrivals</Text>
          <FlatList
            data={trainTimes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.transportTitle}>{item.platformName}</Text>
                <Text style={styles.time}>Arrives in {Math.round(item.timeToStation / 60)} min</Text>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#257f66",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  transportTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  time: {
    fontSize: 14,
    color: "#666",
  },
});

export default BusTrainTimesScreen;
