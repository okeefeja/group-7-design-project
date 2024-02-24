import styled from "styled-components/native";

const ScBarContainer = styled.View`
  display: flex;
  height: 40px;
  flex-direction: row;
`;

const ScBarItem = styled.View<{ size: number; color: string }>`
  flex: ${(props) => props.size} 1;
  background-color: ${(props) => props.color};
`;

export { ScBarContainer, ScBarItem };
