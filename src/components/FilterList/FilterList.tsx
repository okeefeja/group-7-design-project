// FilterList.tsx
import React from "react";
import { ScrollView } from "react-native";
import { styles } from "./FilterList.styled";
import FilterButton from "../FilterButton/FilterButton";
import { BodyPartList } from "../../types/API";

interface FilterListProps {
  filters: BodyPartList | null;
  onFilterSelect: (filter: string) => void;
}

const FilterList: React.FC<FilterListProps> = ({ filters, onFilterSelect }) => {
  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
    >
      {filters &&
        filters.map((filter, index) => {
          function handleFilterSelect() {
            onFilterSelect(filter.name);
          }
          return (
            <FilterButton
              key={index}
              label={filter.name}
              onFilterSelect={handleFilterSelect}
            />
          );
        })}
    </ScrollView>
  );
};

export default FilterList;
