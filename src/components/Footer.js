import React from "react";
import styled from "styled-components"

const FooterElement = styled.footer`
  flex-shrink: 0;
  align-items: center;
  background-color: #1a1a1a;
  color: #d3d3d3;
  height: 40px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-content: center;
`;

function Footer() {
  return (
    <FooterElement>© 2021 Genki Sushi USA, Inc</FooterElement>
  )
}

export default Footer;