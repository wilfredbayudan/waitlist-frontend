import React from "react";
import styled from "styled-components";
import { useHistory, NavLink, useRouteMatch } from "react-router-dom";
import Notice from "../Notice";

const SidebarContainer = styled.div`
  width: 250px;
  text-align: left;
`;

const navButtons = `
  width: 100%;
  height: 30px;
  font-size: 2em;
  display: block;
  color: #959595;
  text-transform: uppercase;
  margin-top: 20px;
  &:hover {
    color: orange;
  }
`;

const activeNav = {
  color: "orange",
  fontWeight: "bold"
}

const StyledLink = styled(NavLink)`
  ${navButtons}
`;

const LogoutButton = styled.button`
  ${navButtons}
  border: 0;
  text-align: left;
  background: none;
  padding: 0;
  cursor: pointer;
`;

function Sidebar({ userInfo, setIsAdmin }) {
  const match = useRouteMatch();
  const history = useHistory();

  function onLogoutClick() {
    setIsAdmin(false);
    history.push('/admin');
  }

  return (
    <SidebarContainer>
      <Notice color="blue">
      Logged in as <b>{userInfo.username}</b>
      </Notice>
      <StyledLink to={`${match.url}/contacts`} activeStyle={activeNav}>Contacts</StyledLink>
      <StyledLink to={`${match.url}/checkins`} activeStyle={activeNav}>Check-Ins</StyledLink>
      <StyledLink to={`${match.url}/locations`} activeStyle={activeNav}>Locations</StyledLink>
      <LogoutButton onClick={onLogoutClick}>Logout</LogoutButton>
    </SidebarContainer>
  )
}

export default Sidebar;