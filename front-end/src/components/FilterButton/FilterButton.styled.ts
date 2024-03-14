import styled from "styled-components/native";

const ScButton = styled.TouchableOpacity<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.active ? "black" : "#ff8610")};
  border-radius: 20px;
  padding: 0px 24px;
  margin-right: 8px;
  height: 30px;
  border: ${(props) => (props.active ? "3px solid #ff8610" : "2px solid black")};
  `;

const ScButtonText = styled.Text<{ active: boolean }>`
  color: ${(props) => (props.active ? "#ff8610" : "black")};
  font-size: 16px;
`;

export { ScButton, ScButtonText };
