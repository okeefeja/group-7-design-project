import styled from "styled-components/native";

const ScTextButtonLabel = styled.Text<{ bold: boolean }>`
  color: white;
  font-size: 16px;
  font-weight: ${(props) => (props.bold ? "600" : "400")};
`;

export { ScTextButtonLabel };
