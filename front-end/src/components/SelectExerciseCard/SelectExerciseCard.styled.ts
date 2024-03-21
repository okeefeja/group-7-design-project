import styled from "styled-components/native";

const ScCardContainer = styled.TouchableOpacity<{ selected: boolean }>`
  padding: 18px;
  border-radius: 12px;
  border: 2px solid #303030;
  background-color: #111;
  flex: 1 1 auto;

  ${(props) => (props.selected ? "border: 2px solid #ff8610;" : null)}
`;

export { ScCardContainer };
