import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native';

const FoodScreen = () => {
  const menu = {
    Monday: {
      mains: [
        { name: 'Grilled Chicken with Rice', price: '£5.50', image: require('../../assets/food/chicken_rice.jpg') },
        { name: 'Vegetable Stir Fry', price: '£4.80', image: require('../../assets/food/veggie_stir_fry.jpg') },
        { name: 'BBQ Pulled Pork Burger', price: '£6.20', image: require('../../assets/food/pulled_pork.jpg') }, 
        { name: 'Mushroom Risotto (Vegan)', price: '£5.90', image: require('../../assets/food/mushroom_risotto.jpg') },
      ],
    },
    Tuesday: {
      mains: [
        { name: 'Pasta Carbonara', price: '£5.80', image: require('../../assets/food/carbonara.jpg') },
        { name: 'Lentil & Chickpea Curry (Vegan)', price: '£5.30', image: require('../../assets/food/lentil_curry.jpg') },
        { name: 'Beef Tacos', price: '£6.50', image: require('../../assets/food/beef_tacos.jpg') },
        { name: 'Baked Salmon with Veggies', price: '£7.00', image: require('../../assets/food/salmon.jpg') },
      ],
    },
    Wednesday: {
      mains: [
        { name: 'BBQ Ribs & Fries', price: '£6.50', image: require('../../assets/food/ribs_fries.jpg') },
        { name: 'Stuffed Bell Peppers (Vegan)', price: '£5.50', image: require('../../assets/food/stuffed_peppers.jpg') },
        { name: 'Teriyaki Chicken & Rice', price: '£6.00', image: require('../../assets/food/teriyaki_chicken.jpg') },
        { name: 'Veggie Pad Thai', price: '£5.90', image: require('../../assets/food/pad_thai.jpg') },
      ],
    },
    Thursday: {
      mains: [
        { name: 'Beef Lasagna', price: '£6.00', image: require('../../assets/food/lasagna.jpg') },
        { name: 'Falafel Wrap (Vegan)', price: '£5.20', image: require('../../assets/food/falafel_wrap.jpg') },
        { name: 'Honey Glazed Chicken with Rice', price: '£6.30', image: require('../../assets/food/honey_chicken.jpg') },
        { name: 'Prawn Linguine', price: '£6.80', image: require('../../assets/food/prawn_linguine.jpg') },
      ],
    },
    Friday: {
      mains: [
        { name: 'Grilled Chicken with Rice', price: '£5.50', image: require('../../assets/food/chicken_rice.jpg') },
        { name: 'Spaghetti Bolognese', price: '£6.20', image: require('../../assets/food/spaghetti_bolognese.jpg') },
        { name: 'Vegetable Stir Fry', price: '£4.80', image: require('../../assets/food/veggie_stir_fry.jpg') },
        { name: 'Fish & Chips', price: '£6.50', image: require('../../assets/food/fish_chips.jpg') },
      ],
    },
  };

  // 🥤 Drinks (Same Every Day)
  const drinks = [
    { name: 'Bottled Water', price: '£1.00', image: require('../../assets/food/water.jpg') },
    { name: 'Soft Drink (Coke, Sprite, Fanta)', price: '£1.50', image: require('../../assets/food/soft_drink.jpg') },
    { name: 'Orange Juice', price: '£2.00', image: require('../../assets/food/orange_juice.jpg') },
    { name: 'Latte / Cappuccino', price: '£2.50', image: require('../../assets/food/latte.jpg') },
    { name: 'Iced Coffee', price: '£2.80', image: require('../../assets/food/iced_coffee.jpg') },
  ];

  // 🍪 Snacks (Same Every Day)
  const snacks = [
    { name: 'Chicken Bites', price: '£2.50', image: require('../../assets/food/chicken_bites.jpg') },
    { name: 'Chocolate Bar', price: '£1.00', image: require('../../assets/food/chocolate_bar.jpg') },
    { name: 'Fruit Salad', price: '£2.00', image: require('../../assets/food/fruit_salad.jpg') },
    { name: 'Packet of Crisps', price: '£1.20', image: require('../../assets/food/crisps.jpg') },
    { name: 'Cheese & Crackers', price: '£2.30', image: require('../../assets/food/cheese_crackers.jpg') },
  ];

  const today = new Date().toLocaleString('en-US', { weekday: 'long' });
  const todaysMenu = menu[today] || menu.Monday;

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.foodName}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Today's Menu: {today}</Text>

      {/* Main Meals Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🍽️ Main Meals</Text>
        <FlatList
          data={todaysMenu.mains}
          keyExtractor={(item) => item.name}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Snacks Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🍪 Snacks</Text>
        <FlatList
          data={snacks}
          keyExtractor={(item) => item.name}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Drinks Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🥤 Drinks</Text>
        <FlatList
          data={drinks}
          keyExtractor={(item) => item.name}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#257f66',
    padding: 10,
  },
  heading: {
    padding: 30,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginRight: 10,
    width: 150,
  },
  image: {
    width: 130,
    height: 100,
    borderRadius: 10,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 5,
  },
  price: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default FoodScreen;
