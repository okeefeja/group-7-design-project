import styled from "styled-components/native";

const ScCardContainer = styled.TouchableOpacity`
  padding: 24px;
  width: 100%;
  background-color: #ff8610;
  border-radius: 12px;
  font-family: "Roboto";
`;

const ScTitleText = styled.Text`
  margin-top: 8px;
  width: 225px;
  font-size: 32px;
  font-weight: 700;
`;

const ScMuscleText = styled.Text`
  font-weight: 700;
  font-size: 13px;
  color: #854605;
`;

const ScDescriptionText = styled.Text`
  margin-top: 8px;
  font-weight: 400;
  font-size: 14px;
  color: #854605;
`;

export { ScCardContainer, ScTitleText, ScMuscleText, ScDescriptionText };
