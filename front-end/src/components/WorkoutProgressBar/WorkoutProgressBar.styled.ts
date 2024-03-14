import styled from "styled-components/native";

const ScContainer = styled.View`
  display: flex;
  align-items: center;
  margin-bottom: 18px;
`;

const ScBarContainer = styled.View`
  display: flex;
  height: 40px;
  flex-direction: row;
`;

const ScBarItem = styled.View<{
  size: number;
  color: string;
  side: "left" | "right";
  max: number;
}>`
  flex: ${(props) => props.size} 1;
  background-color: ${(props) => props.color};
  border-radius: ${(props) =>
    props.side === "left" ? "12px 0 0 12px" : "0 12px 12px 0"};

  ${(props) =>
    props.side === "left" && props.size === props.max
      ? "border-radius: 12px"
      : props.side === "right" && props.size === props.max
      ? "border-radius: 12px"
      : null}
`;

const ScPercentageLabel = styled.Text`
  font-size: 16px;
  color: white;
  margin-bottom: 8px;
`;

export { ScContainer, ScBarContainer, ScBarItem, ScPercentageLabel };
