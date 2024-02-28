import React, { useEffect, useState } from "react";
import { ScBaseContainer } from "../../components/BaseContainer/BaseContainer.styled";
import BigLogo from "../../components/BigLogo/BigLogo";
import LoginBar from "../../components/LoginBar/LoginBar";

interface LoginScreenProps {
  navigation: any;
}

export default function LoginScreen({
  navigation,
}: LoginScreenProps) {

  return (
    <ScBaseContainer>
      <BigLogo></BigLogo>
      <LoginBar title = {"Username"}></LoginBar>
      <LoginBar title = {"Password"}></LoginBar>    
    </ScBaseContainer>
  
  );
}
