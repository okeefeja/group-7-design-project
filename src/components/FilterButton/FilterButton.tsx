import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FilterButtonProps } from '../../types/API';
import { styles } from './FilterButton.styled';

const FilterButton: React.FC<FilterButtonProps> = ({ onFilterSelect }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => onFilterSelect('Back')}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onFilterSelect('Shoulders')}>
        <Text style={styles.buttonText}>Shoulders</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onFilterSelect('Legs')}>
        <Text style={styles.buttonText}>Legs</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onFilterSelect('Chest')}>
        <Text style={styles.buttonText}>Chest</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.button} onPress={() => onFilterSelect('Chest')}>
        <Text style={styles.buttonText}>Arms</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default FilterButton;
