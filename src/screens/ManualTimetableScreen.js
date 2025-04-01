import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimetableItem from '../components/TimetableItem';
import { exportToCalendar } from '../utils/calendarUtils';

const ManualTimetableScreen = () => {
  const [subject, setSubject] = useState('');
  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    const stored = await AsyncStorage.getItem('timetable');
    if (stored) setEntries(JSON.parse(stored));
  };

  const saveEntries = async (data) => {
    await AsyncStorage.setItem('timetable', JSON.stringify(data));
  };

  const addEntry = () => {
    if (!subject || !day || !startTime || !endTime || !date) {
      return Alert.alert('Missing Info', 'Please fill in all fields');
    }
    const newEntry = {
      id: Date.now().toString(),
      subject,
      day,
      startTime,
      endTime,
      date,
    };
    const updated = [...entries, newEntry];
    setEntries(updated);
    saveEntries(updated);
    setSubject('');
    setDay('');
    setStartTime('');
    setEndTime('');
    setDate('');
  };

  const deleteEntry = (id) => {
    const updated = entries.filter(entry => entry.id !== id);
    setEntries(updated);
    saveEntries(updated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📅 Manual Timetable</Text>

      <TextInput placeholder="Subject" value={subject} onChangeText={setSubject} style={styles.input} />
      <TextInput placeholder="Day (e.g., Monday)" value={day} onChangeText={setDay} style={styles.input} />
      <TextInput placeholder="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} style={styles.input} />
      <TextInput placeholder="Start Time (HH:MM)" value={startTime} onChangeText={setStartTime} style={styles.input} />
      <TextInput placeholder="End Time (HH:MM)" value={endTime} onChangeText={setEndTime} style={styles.input} />
      <Button title="Add Entry" onPress={addEntry} />

      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TimetableItem item={item} onDelete={deleteEntry} onExport={exportToCalendar} />
        )}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#257f66',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
});

export default ManualTimetableScreen;
