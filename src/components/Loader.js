import React from "react";
import styled from "styled-components";
import "../style/Loader.css";

const LoaderContainer = styled.div`
  position: fixed;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 15px;
  border-radius: 4px;
  z-index: 99;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: ${props => props.active ? 'block' : 'none'};
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid #ff9c32;
  width: 80px;
  height: 80px;
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;
`;

function Loader({ active }) {
  return (
    <LoaderContainer active={active}>
      <Spinner />
    </LoaderContainer>
  );
}

export default Loader;
