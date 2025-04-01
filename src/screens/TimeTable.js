import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import axios from 'axios';
import { CLIENT_ID, TENANT_ID, CLIENT_SECRET } from '@env';

const TimeTable = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchToken = async () => {
    const response = await axios.post(
      `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`,
      new URLSearchParams({
        client_id: CLIENT_ID,
        scope: 'https://graph.microsoft.com/.default',
        client_secret: CLIENT_SECRET,
        grant_type: 'client_credentials',
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    return response.data.access_token;
  };

  const fetchTimetable = async () => {
    try {
      const token = await fetchToken();

      const response = await axios.get(
        'https://graph.microsoft.com/v1.0/users/victorvrosa@live.com/calendar/events',

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTimetable(response.data.value);
    } catch (error) {
      console.error('Error fetching timetable:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetable();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#257f66" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Timetable</Text>
      <FlatList
        data={timetable}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.event}>
            <Text style={styles.eventText}>{item.subject}</Text>
            <Text style={styles.time}>{item.start.dateTime} → {item.end.dateTime}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#257f66',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  event: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
  },
  eventText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 14,
    color: '#555',
  },
});

export default TimeTable;
