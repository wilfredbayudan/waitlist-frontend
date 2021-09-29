import React from "react";
import Card from "./Card";
import Location from "../classes/Location";
import styled from "styled-components";
import Button from '@mui/material/Button';

const NumWaiting = styled.h4`
  font-size: 10em;
  font-weight: bold;
  background-color: #e0e0e0;
  margin: 5px 0;
  border-radius: 3px;
`;

function CheckinSuccess ({ storeId, checkInData }) {

  const waitWhileLink = `https://app.waitwhile.com/l/${Location.info(storeId).shortName}/${checkInData.publicId}`;

  return (
    <Card title="You're on the waitlist!">
      {checkInData.firstName}, you're currently
      <NumWaiting>#{checkInData.position}</NumWaiting>
      in line at <b>{Location.info(storeId).name}</b>. We'll send you a text when it's your turn. Please have your vaccination/test documentation ready. In the meantime, why not <a href="https://genkisushiusa.com/waitmenuv3" alt="our menu" target="_blank" rel="noreferrer">check out the menu?</a>
      <a href={waitWhileLink} alt="Virtual Ticket"><Button variant="contained" disableElevation className="primaryBtn" type="button">View Virtual Ticket</Button></a>
    </Card>
  )
}

export default CheckinSuccess;