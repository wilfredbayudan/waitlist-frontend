import React from "react";
import styled from "styled-components"

const FooterElement = styled.footer`
  flex-shrink: 0;
  align-items: center;
  background-color: #1a1a1a;
  color: #7f7f7f;
  height: 40px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-content: center;
`;

function Footer() {
  return (
    <FooterElement>© 2021 Flat Table</FooterElement>
  )
}

export default Footer;