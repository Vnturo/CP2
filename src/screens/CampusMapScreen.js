import React from 'react';
//import basic view and styling components
import { View, StyleSheet } from 'react-native';
//import webview for displaying external content
import { WebView } from 'react-native-webview';

//define campus map screen component
const CampusMapScreen = () => {
  return (
    <View style={styles.container}>
      <WebView 
        //load the goldsmiths campus map URL
        source={{ uri: 'https://www.gold.ac.uk/campus-map/' }} 
        //ensure it fills the view
        style={{ flex: 1 }} 
      />
    </View>
  );
};

//define styling for container
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//export the component for use in the app
export default CampusMapScreen;
