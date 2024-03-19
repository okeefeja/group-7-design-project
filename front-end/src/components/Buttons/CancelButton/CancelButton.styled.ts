import styled from "styled-components/native";
import { ScBaseButton } from "../BaseButton";

const ScCancelButton = styled(ScBaseButton)`
  border: 2px solid #303030;
  background-color: #111;
`;

const ScButtonLabel = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: white;
`;

export { ScCancelButton, ScButtonLabel };
