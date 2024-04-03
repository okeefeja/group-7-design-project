import styled from "styled-components/native";

export const ScIngredientCardFullContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 12px;
  border: 2px solid #303030;
  background-color: #111;
  width: 100%;
`;

export const ScGramInput = styled.TextInput.attrs(() => ({
  placeholderTextColor: "gray",
}))<{ focus: boolean }>`
  padding: 8px;
  border: 2px solid #303030;
  border-radius: 8px;
  background-color: black;
  color: white;
  font-size: 16px;
  ${(props) => (props.focus ? "border: 2px solid #ff8610;" : null)}
`;
