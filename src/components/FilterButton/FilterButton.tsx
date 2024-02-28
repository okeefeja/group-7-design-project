import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { FilterButtonProps } from '../../types/API';
import { styles } from './FilterButton.styled';

const FilterButton: React.FC<FilterButtonProps> = ({ onFilterSelect }) => {
  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
    >
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
      <TouchableOpacity style={styles.button} onPress={() => onFilterSelect('Arms')}>
        <Text style={styles.buttonText}>Arms</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onFilterSelect('Cardio')}>
        <Text style={styles.buttonText}>Cardio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default FilterButton;
