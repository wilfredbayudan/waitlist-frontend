import React from "react";
import styled from "styled-components";

const NoticeDiv = styled.div`
  border-radius: 3px;
  padding: 6px;
  margin-bottom: 8px;
  text-align: left;
  background-color: ${props => props.color};
`;

function Notice({ color, children }) {
  let handledColor = color;
  if (color === "yellow") handledColor = "#fdff95b9";
  if (color === "blue") handledColor = "#dafaf6c2";

  return (
    <NoticeDiv color={handledColor}>
      {children}
    </NoticeDiv>
  )
}

export default Notice;