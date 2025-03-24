import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const API_KEY = '4645be5f2d5b4333af04661db9823aa4';

const BUS_STOPS = [
  { id: '490007276Y', name: 'Marquis of Granby (Stop Y)' },
  { id: '490007276X', name: 'Marquis of Granby (Stop X)' },
];

const TRAIN_STATIONS = [
  { id: 'HUBNXG', name: 'New Cross Gate'}
];

const BusTrainScreen = () => {
  const [busArrivals, setBusArrivals] = useState([]);
  const [trainArrivals, setTrainArrivals] = useState([]);
  const [loadingBus, setLoadingBus] = useState(false);
  const [loadingTrain, setLoadingTrain] = useState(false);
  const [selectedStop, setSelectedStop] = useState('');
  const [selectedStation, setSelectedStation] = useState('');

  const fetchBusArrivals = async (stopId) => {
    setSelectedStop(stopId);
    setLoadingBus(true);
    try {
      const response = await fetch(
        `https://api.tfl.gov.uk/StopPoint/${stopId}/Arrivals?app_key=${API_KEY}`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        const sorted = data.sort((a, b) => a.timeToStation - b.timeToStation);
        setBusArrivals(sorted);
      } else {
        setBusArrivals([]);
      }
    } catch (error) {
      console.error('Error fetching bus arrivals:', error);
      setBusArrivals([]);
    }
    setLoadingBus(false);
  };

  const fetchTrainArrivals = async (stationId) => {
    setSelectedStation(stationId);
    setLoadingTrain(true);
    try {
      const response = await fetch(
        `https://api.tfl.gov.uk/StopPoint/${stationId}/Arrivals?app_key=${API_KEY}`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        const sorted = data.sort((a, b) => a.timeToStation - b.timeToStation);
        setTrainArrivals(sorted);
      } else {
        setTrainArrivals([]);
      }
    } catch (error) {
      console.error('Error fetching train arrivals:', error);
      setTrainArrivals([]);
    }
    setLoadingTrain(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🚌 Bus Stops</Text>
      {BUS_STOPS.map((stop) => (
        <TouchableOpacity
          key={stop.id}
          onPress={() => fetchBusArrivals(stop.id)}
          style={styles.stopButton}
        >
          <Text style={styles.stopText}>{stop.name}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.subtitle}>
        {selectedStop ? `Live Bus Arrivals (${selectedStop})` : 'Select a stop'}
      </Text>
      {loadingBus ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <FlatList
          data={busArrivals}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.arrivalItem}>
              <Text style={styles.line}>
                {item.lineName} to {item.destinationName}
              </Text>
              <Text style={styles.time}>
                {Math.round(item.timeToStation / 60)} min
              </Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.noArrivals}>No upcoming buses.</Text>}
        />
      )}

      <Text style={styles.title}>🚉 Train Station</Text>
      {TRAIN_STATIONS.map((station) => (
        <TouchableOpacity
          key={station.id}
          onPress={() => fetchTrainArrivals(station.id)}
          style={styles.trainButton}
        >
          <Text style={styles.stopText}>{station.name}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.subtitle}>
        {selectedStation ? `Live Train Arrivals (${selectedStation})` : 'Select a station'}
      </Text>
      {loadingTrain ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <FlatList
          data={trainArrivals}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.arrivalItem}>
              <Text style={styles.line}>
                {item.platformName}: {item.destinationName}
              </Text>
              <Text style={styles.time}>
                {Math.round(item.timeToStation / 60)} min
              </Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.noArrivals}>No upcoming trains.</Text>}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#257f66',
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
    textAlign: 'center',
  },
  stopButton: {
    backgroundColor: '#b02a30', // red
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  trainButton: {
    backgroundColor: '#444',
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  stopText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  arrivalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  line: {
    fontSize: 16,
    color: '#fff',
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  noArrivals: {
    textAlign: 'center',
    color: '#ccc',
    marginVertical: 20,
  },
});

export default BusTrainScreen;
