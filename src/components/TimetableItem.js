
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const TimetableItem = ({ item, onDelete, onExport }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{item.subject}</Text>
    <Text>{item.day} — {item.startTime} to {item.endTime}</Text>
    <View style={styles.buttons}>
      <Button title="Export" onPress={() => onExport(item)} />
      <Button title="Delete" color="red" onPress={() => onDelete(item.id)} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default TimetableItem;
