import styled from "styled-components/native";

const SIZES: number[] = [4, 8, 16, 32, 64];

const ScSpacer = styled.View<{
  size: number;
  orientation: "vertical" | "horizontal";
}>`
  height: ${(props) =>
    props.orientation === "vertical" ? SIZES[props.size] : 0}px;
  width: ${(props) =>
    props.orientation === "horizontal" ? SIZES[props.size] : 0}px;
`;

export { ScSpacer };
