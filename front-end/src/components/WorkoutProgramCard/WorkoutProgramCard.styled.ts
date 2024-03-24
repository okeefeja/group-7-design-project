import styled from "styled-components/native";

const ScCardContainer = styled.TouchableOpacity<{ size: "small" | "large" }>`
  padding: ${(props) => (props.size === "small" ? "16px" : "24px")};
  width: 100%;
  background-color: #111;
  border-radius: 12px;
  border: 2px solid #303030;
`;

const ScTitleText = styled.Text<{ size: "small" | "large" }>`
  margin-top: ${(props) => (props.size === "small" ? "2px" : "8px")};
  width: ${(props) => (props.size === "small" ? "100%" : "225px")};
  font-size: ${(props) => (props.size === "small" ? "26px" : "32px")};
  font-weight: 700;
  color: white;
`;

const ScMuscleText = styled.Text<{ size: "small" | "large" }>`
  font-weight: 700;
  font-size: ${(props) => (props.size === "small" ? "13px" : "15px")};
  color: #ff8610;
`;

const ScOwnerText = styled.Text<{ size: "small" | "large" }>`
  font-weight: 700;
  font-size: ${(props) => (props.size === "small" ? "13px" : "16px")};
  color: gray;
`;

const ScDescriptionText = styled.Text<{ size: "small" | "large" }>`
  margin-top: ${(props) => (props.size === "small" ? "4px" : "8px")};
  font-weight: 400;
  font-size: 14px;
  color: gray;
`;

export {
  ScCardContainer,
  ScTitleText,
  ScMuscleText,
  ScOwnerText,
  ScDescriptionText,
};
