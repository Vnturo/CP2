import React from 'react';
//import core components from react-native
import { View, StyleSheet, ActivityIndicator } from 'react-native';
//import WebView from react-native-webview to load external webpages
import { WebView } from 'react-native-webview';

//main component to render the webview screen
const WebViewScreen = ({ route }) => {
  //get url from navigation route params, fallback to goldsmiths homepage
  const { url } = route.params || { url: 'https://www.gold.ac.uk' };

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: url }} //set the webpage URL
        style={styles.webView} //apply styling
        startInLoadingState={true} //show loading indicator until page is ready
        renderLoading={() => (
          <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
        )} //custom loading spinner
      />
    </View>
  );
};

//styles for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35, //adds top padding to prevent overlap with status bar
  },
  webView: {
    flex: 1, //fills remaining screen space
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }], //centers the loader
  },
});

//export the component
export default WebViewScreen;
