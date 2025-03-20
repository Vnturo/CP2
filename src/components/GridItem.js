import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Image, StyleSheet, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const GridItem = ({ image, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 80,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.gridItem, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity 
        style={styles.touchable}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Image source={image} style={styles.image} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    width: width * 0.28, 
    aspectRatio: 1, 
    margin: '2%', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchable: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6, 
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', 
  },
});

export default GridItem;
