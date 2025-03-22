import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList, Text, Animated, Dimensions } from 'react-native';
import GridItem from '../components/GridItem';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const menuItems = [
    { image: require('../../assets/learngold.png'), screen: 'WebView', url: 'https://learn.gold.ac.uk' },
    { image: require('../../assets/Library.png'), screen: 'WebView', url: 'https://www.gold.ac.uk/library/' },
    { image: require('../../assets/CampusMap.png'), screen: 'CampusMap' },
    { image: require('../../assets/RoomFinder.png'), screen: 'RoomFinder' },
    { image: require('../../assets/StudentEssentials.png'), screen: 'WebView', url: 'https://student.gold.ac.uk' },
    { image: require('../../assets/Timetable.png'), screen: 'WebView', url: 'https://www.gold.ac.uk/students/timetable/' },
    { image: require('../../assets/Careers.png'), screen: 'WebView', url: 'https://www.gold.ac.uk/careers/' },
    { image: require('../../assets/Email.png'), screen: 'EmailScreen' },
    { image: require('../../assets/Food.png'), screen: 'FoodScreen' },
    { image: require('../../assets/Travel.png'), screen: 'WebView', url: 'https://transport.gold.ac.uk' },
    { image: require('../../assets/Wellbeing.png'), screen: 'WebView', url: 'https://www.gold.ac.uk/students/wellbeing/wellbeing-service/' },
  ];

  return (
    <LinearGradient colors={['#0d5b43', '#257f66']} style={styles.gradient}>
      <View style={styles.container}>
        <Animated.Text style={[styles.header, { opacity: fadeAnim }]}>
          Welcome to Goldsmiths App 🌟
        </Animated.Text>
        
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

export default HomeScreen;
