import React from 'react';
import { TouchableOpacity, Image, StyleSheet, View, Dimensions } from 'react-native';

const GridItem = ({ image, onPress }) => {
  return (
    <TouchableOpacity style={styles.gridItem} onPress={onPress}>
      <Image source={image} style={styles.image} />
    </TouchableOpacity>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  gridItem: {
    width: width / 3.4, // Each item takes up 1/3 of screen width (with padding)
    aspectRatio: 1, // Ensures the item is square
    margin: 5, // Space between items
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Makes image fully cover the icon
    borderRadius: 10, // Optional: round corners
  },
});

export default GridItem;
