import React from "react";
import { useHistory } from "react-router-dom";
import Card from "./Card";
import Location from "../classes/Location";
import styled from "styled-components";
import Button from '@mui/material/Button';

const StatusSpan = styled.span`
  color: ${props => props.isOpen ? '#1fa753' : '#920909'};
  font-weight: bold;
`;

const NumWaiting = styled.h4`
  font-size: 10em;
  font-weight: bold;
  background-color: #e0e0e0;
  margin: 5px 0;
  border-radius: 3px;
`;

function LocationCard({ storeId, locationData }) {
  const history = useHistory();

  function handleJoinClick() {
    let nextStep = Location.info(storeId).contactTracing ? 'join' : 'checkin';
    // If PreCheckID Cookie Exists, also push to checkin
    history.push(`${storeId}/${nextStep}`);
  }

  const isOpen = locationData.isWaitlistOpen;
  return (
    <Card title={Location.info(storeId).name}>
      Our waitlist is <StatusSpan isOpen={isOpen}>{isOpen ? 'open' : 'closed'}</StatusSpan> and there are
      <NumWaiting>{locationData.numWaiting}</NumWaiting>
      parties waiting
      <Button variant="contained" disableElevation className="primaryBtn" disabled={!isOpen} onClick={handleJoinClick}>Join Waitlist</Button>
    </Card>
  )
}

export default LocationCard;