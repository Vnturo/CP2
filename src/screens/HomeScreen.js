import React, { useEffect, useRef } from 'react';
//import components and utilities from react-native
import { View, StyleSheet, FlatList, Text, Animated, Dimensions } from 'react-native';
//import custom grid item component
import GridItem from '../components/GridItem';
//import linear gradient for background styling
import { LinearGradient } from 'expo-linear-gradient';

//get device screen width
const { width } = Dimensions.get('window');

//define the home screen component
const HomeScreen = ({ navigation }) => {
  //create animated value for fade-in effect
  const fadeAnim = useRef(new Animated.Value(0)).current;

  //run animation when component mounts
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  //define menu items with associated images and screen navigation targets
  const menuItems = [
    { image: require('../../assets/learngold.png'), screen: 'WebView', url: 'https://learn.gold.ac.uk' },
    { image: require('../../assets/Library.png'), screen: 'WebView', url: 'https://www.gold.ac.uk/library/' },
    { image: require('../../assets/CampusMap.png'), screen: 'CampusMap' },
    { image: require('../../assets/RoomFinder.png'), screen: 'RoomFinder' },
    { image: require('../../assets/Timetable.png'), screen: 'TimeTable' },
    { image: require('../../assets/Careers.png'), screen: 'WebView', url: 'https://www.gold.ac.uk/careers/' },
    { image: require('../../assets/Email.png'), screen: 'EmailScreen' },
    { image: require('../../assets/Food.png'), screen: 'FoodScreen' },
    { image: require('../../assets/Travel.png'), screen: 'BusTrainScreen' },
  ];

  return (
    //wrap the screen in a gradient background
    <LinearGradient colors={['#0d5b43', '#257f66']} style={styles.gradient}>
      <View style={styles.container}>
        {/*fade-in header text*/}
        <Animated.Text style={[styles.header, { opacity: fadeAnim }]}>
          Welcome to Goldsmiths App 🌟
        </Animated.Text>

        {/*display menu items in a 3-column grid*/}
        <FlatList
          data={menuItems}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <GridItem 
              image={item.image} 
              onPress={() => navigation.navigate(item.screen, item.url ? { url: item.url } : {})}
            />
          )}
          contentContainerStyle={styles.grid}
        />
      </View>
    </LinearGradient>
  );
};

//define styles for the screen layout
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  grid: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//export the component
export default HomeScreen;
