import styled from "styled-components/native";

const ScButton = styled.TouchableOpacity<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.active ? "black" : "#ff8610")};
  border-radius: 20px;
  padding: 12px 24px;
  margin-right: 8px;
  border: ${(props) => (props.active ? "2px solid white" : "2px solid black")};
`;

const ScButtonText = styled.Text<{ active: boolean }>`
  color: ${(props) => (props.active ? "white" : "black")};
  font-size: 16px;
`;

export { ScButton, ScButtonText };
