import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Contacts from "./Contacts";
import Checkins from "./Checkins";
import Locations from "./Locations";

const AdminContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #ffffff;
  color: #2e2e2e;
  display: flex;
  flex-direction: row;
  border-radius: 3px;
`;

const AdminContent = styled.div`
  padding: 10px 10px 20px 10px;
  border-radius: 3px;
  border: 1px solid #e7e7e7;
  flex: 1;
  margin-left: 20px;
`;

function Admin({ userInfo, setIsAdmin, locationConfig, setLocationConfig, setLoaderStatus, setOverlayModal }) {
  const match = useRouteMatch();
  
  if (userInfo) {
    return (
      <AdminContainer>
        <Sidebar userInfo={userInfo} setIsAdmin={setIsAdmin} />
        <AdminContent>
          <Switch>
            <Route path={`${match.url}/contacts`} exact>
              <Contacts setLoaderStatus={setLoaderStatus} setOverlayModal={setOverlayModal} />
            </Route>
            <Route path={`${match.url}/checkins`} exact>
              <Checkins setLoaderStatus={setLoaderStatus} setOverlayModal={setOverlayModal} locationConfig={locationConfig} />
            </Route>
            <Route path={`${match.url}/locations`} exact>
              <Locations setLoaderStatus={setLoaderStatus} setOverlayModal={setOverlayModal} locationConfig={locationConfig} setLocationConfig={setLocationConfig} />
            </Route>
            <Route path={`${match.url}`} exact>
              Default Route
            </Route>
          </Switch>
        </AdminContent>
      </AdminContainer>
    )
  } else {
    return null;
  }
}

export default Admin;