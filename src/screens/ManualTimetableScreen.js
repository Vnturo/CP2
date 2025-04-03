import React, { useState, useEffect } from 'react';
//import react-native components for UI and storage
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
//import asyncstorage for saving timetable entries locally
import AsyncStorage from '@react-native-async-storage/async-storage';
//import custom timetable item component
import TimetableItem from '../components/TimetableItem';
//import utility for exporting to calendar
import { exportToCalendar } from '../utils/calendarUtils';

//define the main screen component
const ManualTimetableScreen = () => {
  //state hooks for each input field and entry list
  const [subject, setSubject] = useState('');
  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');
  const [entries, setEntries] = useState([]);

  //load timetable entries when the component mounts
  useEffect(() => {
    loadEntries();
  }, []);

  //function to load saved entries from asyncstorage
  const loadEntries = async () => {
    const stored = await AsyncStorage.getItem('timetable');
    if (stored) setEntries(JSON.parse(stored));
  };

  //function to save entries to asyncstorage
  const saveEntries = async (data) => {
    await AsyncStorage.setItem('timetable', JSON.stringify(data));
  };

  //function to add a new timetable entry
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

  //function to delete an entry by id
  const deleteEntry = (id) => {
    const updated = entries.filter(entry => entry.id !== id);
    setEntries(updated);
    saveEntries(updated);
  };

  //render the manual timetable screen
  return (
    <View style={styles.container}>
      <Text style={styles.header}>📅 Manual Timetable</Text>

      {/*form inputs for user to fill in timetable entry*/}
      <TextInput placeholder="Subject" value={subject} onChangeText={setSubject} style={styles.input} />
      <TextInput placeholder="Day (e.g., Monday)" value={day} onChangeText={setDay} style={styles.input} />
      <TextInput placeholder="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} style={styles.input} />
      <TextInput placeholder="Start Time (HH:MM)" value={startTime} onChangeText={setStartTime} style={styles.input} />
      <TextInput placeholder="End Time (HH:MM)" value={endTime} onChangeText={setEndTime} style={styles.input} />
      <Button title="Add Entry" onPress={addEntry} />

      {/*display list of timetable entries*/}
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

//define styling for the screen
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

//export the component
export default ManualTimetableScreen;
