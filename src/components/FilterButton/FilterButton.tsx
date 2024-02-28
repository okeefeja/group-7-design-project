// FilterButton.tsx
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { FilterButtonProps } from '../../types/API';
import { styles } from './FilterButton.styled';

const FilterButton: React.FC<FilterButtonProps> = ({ label, onFilterSelect }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => onFilterSelect(label)}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default FilterButton;

