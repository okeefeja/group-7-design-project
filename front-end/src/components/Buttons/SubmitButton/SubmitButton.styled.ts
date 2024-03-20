import styled from "styled-components/native";
import { ScBaseButton } from "../BaseButton";

const ScSubmitButton = styled(ScBaseButton)`
  background-color: #ff8610;
  border: 2px solid #ff8610;
`;

const ScButtonLabel = styled.Text`
  font-size: 16px;
  font-weight: 700;
`;

export { ScSubmitButton, ScButtonLabel };
