import styled from "styled-components/native";

const ScCardContainer = styled.TouchableOpacity<{ clicked: boolean }>`
  padding: 16px;
  width: 100%;
  border-radius: 12px;
  font-family: "Roboto";
  background-color: ${(props) => (props.clicked ? "#49CB00" : "#111111")};
`;

const ScTitleText = styled.Text<{ clicked: boolean }>`
  margin-top: 8px;
  font-weight: 700;
  font-size: 28px;
  color: ${(props) => (props.clicked ? "#266A00" : "white")};
`;

const ScMuscleText = styled.Text<{ clicked: boolean }>`
  font-weight: 700;
  font-size: 13px;
  color: ${(props) => (props.clicked ? "#2E8100" : "#ff8610")};
`;

const ScDescriptionText = styled.Text<{ clicked: boolean }>`
  margin-top: 8px;
  font-weight: 400;
  font-size: 14px;
  color: ${(props) => (props.clicked ? "#2E8100" : "gray")};
`;

export { ScCardContainer, ScTitleText, ScMuscleText, ScDescriptionText };
