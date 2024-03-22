import styled from "styled-components/native";

const ScCardContainer = styled.TouchableOpacity`
  padding: 24px;
  width: 100%;
  background-color: #111;
  border-radius: 12px;
`;

const ScTitleText = styled.Text`
  margin-top: 8px;
  width: 225px;
  font-size: 32px;
  font-weight: 700;
  color: white;
`;

const ScMuscleText = styled.Text`
  font-weight: 700;
  font-size: 13px;
  color: #ff8610;
`;

const ScOwnerText = styled.Text`
  font-weight: 700;
  font-size: 16px;
  color: gray;
`;

const ScDescriptionText = styled.Text`
  margin-top: 8px;
  font-weight: 400;
  font-size: 14px;
  color: gray;
`;

export {
  ScCardContainer,
  ScTitleText,
  ScMuscleText,
  ScOwnerText,
  ScDescriptionText,
};
