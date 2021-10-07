import React from "react";
import styled from "styled-components";

const AdminContentDiv = styled.div`
  text-align: left;
`;

const AdminContentTitle = styled.h3`
  width: 100%;
  text-align: center;
  font-size: 1.5em;
  margin-top: 0;
  padding: 0;
  text-transform: uppercase;
`;

function AdminContent({ title, children }) {
  return (
    <AdminContentDiv>
      <AdminContentTitle>{title}</AdminContentTitle>
      {children}
    </AdminContentDiv>
  )
}

export default AdminContent;