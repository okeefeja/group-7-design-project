import styled from "styled-components/native";

const ScCardContainer = styled.TouchableOpacity`
  padding: 9px;
  width: 50%;
  background-color: #ff6c01;
  border-radius: 12px;
  font-family: "Roboto";
  margin-top: 12px;
  margin-left: 25%
`;

const ScTitleText = styled.Text`
  margin-top: 8px;
  width: 225px;
  font-size: 32px;
  font-weight: 500;
`;

const ScTextInput = styled.TextInput`
  height: 40px; 
  margin: 12px; 
  border-width: 1px; 
  padding: 10px; 
  border-color: #cccccc; 
  border-radius: 5px; 
`;

export { ScCardContainer, ScTitleText, ScTextInput };
