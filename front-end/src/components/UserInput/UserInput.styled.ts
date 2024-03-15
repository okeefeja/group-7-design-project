import styled from "styled-components/native";

const ScTextInput = styled.TextInput.attrs(() => ({
  placeholderTextColor: "gray",
}))<{ focus: boolean }>`
  padding: 12px 16px;
  border: 2px solid white;
  border-radius: 12px;
  color: white;
  ${(props) => (props.focus ? "border: 2px solid #ff8610" : null)}
`;

export { ScTextInput };
