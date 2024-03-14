// FilterButton.tsx
import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { FilterButtonProps } from "../../types/API";
import { ScButton, ScButtonText } from "./FilterButton.styled";

const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  onFilterSelect,
}) => {
  const [active, setActive] = useState(false);

  function onPress() {
    onFilterSelect(label);
    setActive(!active);
  }
  return (
    <ScButton active={active} onPress={onPress}>
      <ScButtonText active={active}>{label}</ScButtonText>
    </ScButton>
  );
};

export default FilterButton;
