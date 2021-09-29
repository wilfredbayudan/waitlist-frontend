import React from "react";
import Card from "./Card";
import Location from "../classes/Location";
import styled from "styled-components";

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
  const isOpen = locationData.isWaitlistOpen;
  return (
    <Card title={Location.info(storeId).name} fullWidth>
      Our waitlist is <StatusSpan isOpen={isOpen}>{isOpen ? 'open' : 'closed'}</StatusSpan> and there are
      <NumWaiting>{locationData.numWaiting}</NumWaiting>
      parties waiting
    </Card>
  )
}

export default LocationCard;