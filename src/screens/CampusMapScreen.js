import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const CampusMapScreen = () => {
  return (
    <View style={styles.container}>
      <WebView 
        source={{ uri: 'https://www.gold.ac.uk/campus-map/' }} 
        style={{ flex: 1 }} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CampusMapScreen;