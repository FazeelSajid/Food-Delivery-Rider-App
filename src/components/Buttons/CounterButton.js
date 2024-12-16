import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CounterButton = () => {
  const [count, setCount] = useState(1);

  const increment = () => {
    if (count < 4) setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={increment} style={styles.arrowButton}>
        <Text style={styles.arrow}>▲</Text>
      </TouchableOpacity>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>{count}</Text>
      </View>
      <TouchableOpacity onPress={decrement} style={styles.arrowButton}>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 120,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: '#BCAFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    paddingVertical: 10,
  },
  arrowButton: {
    padding: 10,
  },
  arrow: {
    fontSize: 18,
    color: 'white',
  },
  countContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: 20,
    color: '#4ADE80', // Green color
    fontWeight: 'bold',
  },
});

export default CounterButton;
