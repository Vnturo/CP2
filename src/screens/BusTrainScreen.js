import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';

const API_KEY = '4645be5f2d5b4333af04661db9823aa4';

// Updated static bus stops near Goldsmiths (Marquis of Granby stops)
const STATIC_STOPS = [
  {
    id: '490008660N',
    name: 'New Cross Station (Stop G)',
  },
  {
    id: '490008660S',
    name: 'New Cross Station (Stop H)',
  },
  {
    id: '490G00007276',
    name: 'Marquis of Granby (Stop Y)',
  },
  {
    id: '490G00009689',
    name: 'Marquis of Granby (Stop X)',
  },
];

const BusTrainScreen = () => {
  const [arrivals, setArrivals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStop, setSelectedStop] = useState(null);

  const fetchArrivals = async (stopId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.tfl.gov.uk/StopPoint/${stopId}/Arrivals?app_key=${API_KEY}`
      );
      const data = await response.json();
  
      // Check if the data is actually an array
      if (Array.isArray(data)) {
        const sorted = data.sort((a, b) => a.timeToStation - b.timeToStation);
        setArrivals(sorted);
      } else {
        console.error('Unexpected data format:', data);
        setArrivals([]); // Clear arrivals to prevent crashes
      }
  
      setSelectedStop(stopId);
    } catch (error) {
      console.error('Error fetching arrivals:', error);
      setArrivals([]); // Also fallback if fetch fails
    }
    setLoading(false);
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nearby Bus Stops</Text>
      {STATIC_STOPS.map((stop) => (
        <TouchableOpacity
          key={stop.id}
          onPress={() => fetchArrivals(stop.id)}
          style={[
            styles.stopButton,
            selectedStop === stop.id && styles.activeStop,
          ]}
        >
          <Text style={styles.stopText}>{stop.name}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.title}>Live Arrivals</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#257f66" />
      ) : arrivals.length > 0 ? (
        <FlatList
          data={arrivals}
          keyExtractor={(item) => item.id}
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
        />
      ) : (
        <Text style={styles.noArrivals}>Select a stop to view arrivals</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  stopButton: {
    backgroundColor: '#257f66',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  activeStop: {
    backgroundColor: '#1c5e4d',
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
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  line: {
    fontSize: 16,
    color: '#333',
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noArrivals: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});

export default BusTrainScreen;
