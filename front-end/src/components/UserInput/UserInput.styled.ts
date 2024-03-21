import styled from "styled-components/native";

const ScTextInput = styled.TextInput.attrs(() => ({
  placeholderTextColor: "gray",
}))<{ focus: boolean; textArea: boolean }>`
  padding: 14px 18px;
  border: 2px solid #303030;
  background-color: #111;
  border-radius: 12px;
  font-size: 16px;
  color: white;
  ${(props) => (props.focus ? "border: 2px solid #ff8610;" : null)}
  ${(props) => (props.textArea ? "height: 125px;" : null)}
`;

export { ScTextInput };
