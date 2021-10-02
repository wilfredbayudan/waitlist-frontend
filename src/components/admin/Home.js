import React from "react";
import styled from "styled-components";

const AdminContainer = styled.div`
  height: 2000px;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: row;
`;

const Sidebar = styled.div`
  color: #2e2e2e;
  background-color: #ffffff;
  padding: 10px 10px 20px 10px;
  border-radius: 3px;
  border: 1px solid #e7e7e7;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.4);
  width: 300px;
`;

const AdminContent = styled.div`
  color: #2e2e2e;
  background-color: #ffffff;
  padding: 10px 10px 20px 10px;
  border-radius: 3px;
  border: 1px solid #e7e7e7;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.4);
  flex: 1;
  margin-left: 20px;
`;

function Home() {
  return (
    <AdminContainer>
      <Sidebar>
        Sidebar
      </Sidebar>
      <AdminContent>
        Admin Content
      </AdminContent>
    </AdminContainer>
  )
}

export default Home;