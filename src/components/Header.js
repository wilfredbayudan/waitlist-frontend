import React from "react";
import GenkiLogo from "../assets/images/logo.png";
import styled from "styled-components";

const HeaderLogo = styled.img`
height: 100%;
`;

const HeaderElement = styled.header`
width: 100%;
height: 60px;
background: #ffffff;
box-shadow: 0 3px 10px rgb(0 0 0 / 0.4);
border-bottom: 1px solid #e7e7e7;
position: fixed;
z-index: 99;
`;

function Header() {

  return (
    <HeaderElement>
      <a href="http://192.168.0.4:3000"><HeaderLogo src={GenkiLogo} /></a>
    </HeaderElement>
  )

}

export default Header;