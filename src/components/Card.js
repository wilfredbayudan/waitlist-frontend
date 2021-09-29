import React from "react";
import styled from "styled-components";

const Section = styled.section`
  color: #2e2e2e;
  background-color: #ffffff;
  padding: 10px 10px 20px 10px;
  margin: 0 auto 0 auto;
  border-radius: 3px;
  border: 1px solid #e7e7e7;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.4);
  max-width: 500px;
  @media screen and (max-width: 500px) {
    width: ${props => props.fullWidth ? '100%' : 'auto'};
  }
`;

function Card ({ title, fullWidth, children }) {
  return (
    <Section fullWidth={fullWidth}>
      <h2>{title}</h2>
      {children}
    </Section>
  )
}

export default Card;