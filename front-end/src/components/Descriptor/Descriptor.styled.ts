import styled from "styled-components/native";

const ScDecriptorContainer = styled.View`
  padding: 16px 16px 24px 16px;
  margin-bottom: 10px;
  border-radius: 12px;
  background-color: #111;
`;

const ScTitleText = styled.Text`
  width: 300px;
  font-size: 52px;
  font-weight: 700;
  color: #ff8610;
`;

const ScDescriptionText = styled.Text`
  margin-top: 8px;
  font-weight: 400;
  font-size: 14px;
  color: white;
`;

export { ScDecriptorContainer, ScTitleText, ScDescriptionText };
