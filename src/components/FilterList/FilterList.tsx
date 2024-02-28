// FilterList.tsx
import React from 'react';
import { ScrollView } from 'react-native';
import { styles } from './FilterList.styled';
import FilterButton from '../FilterButton/FilterButton';

interface FilterListProps {
  filters: string[];
  onFilterSelect: (filter: string) => void;
}

const FilterList: React.FC<FilterListProps> = ({ filters, onFilterSelect }) => {
  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
    >
      {filters.map((filter, index) => (
        <FilterButton
          key={index}
          label={filter}
          onFilterSelect={onFilterSelect}
        />
      ))}
    </ScrollView>
  );
};

export default FilterList;
