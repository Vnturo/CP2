import React from 'react';
//import required components from react-native and react-native-webview
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

//define the room finder screen component
const RoomFinderScreen = () => {
  //inject javascript to remove unnecessary elements & improve UI
  const injectedCSS = `
    document.body.style.overflow = 'hidden'; 
    document.documentElement.style.overflow = 'hidden';
    document.body.style.margin = '0';
    document.body.style.padding = '0';

    //hide headers, footers, sidebars, and unnecessary elements
    let header = document.querySelector('header');
    if (header) header.style.display = 'none';

    let footer = document.querySelector('footer');
    if (footer) footer.style.display = 'none';

    let sideNav = document.querySelector('.side-nav'); 
    if (sideNav) sideNav.style.display = 'none';

    let banner = document.querySelector('.banner'); 
    if (banner) banner.style.display = 'none';

    true; //ensures the script runs properly
  `;

  //render the embedded webview with loader and injected custom js
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://www.gold.ac.uk/campus-map/rhb-room-finder/' }}
        style={styles.webview}
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator size="large" color="#257f66" style={styles.loader} />
        )}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        injectedJavaScript={injectedCSS}
      />
    </View>
  );
};

//define the component's styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

//export the component
export default RoomFinderScreen;
