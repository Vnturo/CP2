import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, Linking } from 'react-native';

const EmailScreen = ({ navigation }) => {
  // Function to open the email app
  const openEmailApp = () => {
    const email = 'mailto:'; // This will open the email client
    Linking.openURL(email).catch((err) => console.error("Error opening email app", err));
  };

  // Automatically open the email app when screen loads
  useEffect(() => {
    openEmailApp();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>If the email app didn't open, tap below:</Text>
      
      {/* Button with spacing */}
      <View style={styles.buttonContainer}>
        <Button title="Open Email App" onPress={openEmailApp} />
      </View>

      {/* Button with spacing */}
      <View style={styles.buttonContainer}>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#257f66',
    padding: 20, // Add some padding to the screen
  },
  text: {
    fontSize: 18,
    color: '#FFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '80%', // Ensures buttons are uniform width
    marginBottom: 20, // Adds space below each button
  },
});

export default EmailScreen;
