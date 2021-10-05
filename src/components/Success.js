import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Card from "./Card";
import Location from "../classes/Location";
import styled from "styled-components";
import Button from '@mui/material/Button';
import API from "../data/API";
import Loader from "./Loader";

const NumWaiting = styled.h4`
  font-size: 10em;
  font-weight: bold;
  background-color: #e0e0e0;
  margin: 5px 0;
  border-radius: 3px;
`;

function Success ({ storeId, checkedIn, setCheckedIn, setOverlayModal, setLoaderStatus, locationConfig }) {

  const history = useHistory();
  const customerIdParams = useParams().customerId;
  
  const [complete, setComplete] = useState();

  useEffect(() => {
    function checkCustomerStatus() {
      if (!checkedIn && !customerIdParams) return history.push(`/${storeId}`);
      if (!checkedIn) {
        // Fetch Customer Information
        fetch(`${API.customerStatus}?customerId=${customerIdParams}`)
          .then(res => res.json())
          .then(json => {
            console.log(json);
            if (json.statusCode === 400) {
              setOverlayModal({
                active: true,
                title: 'Oops',
                message: json.message
              })
              history.push(`/${storeId}`);
            } else {
              if (json.results.length > 0 && json.results[0].locationId === Location.info(locationConfig, storeId).waitwhileId) {
                setCheckedIn(json.results[0]);
              } else {
                setComplete(true);
                setCheckedIn({});
              }
            }
          })
          .catch(err => setLoaderStatus(false))
      }
    }
    checkCustomerStatus();

    console.log(checkedIn);

  }, [checkedIn, history, setOverlayModal, setLoaderStatus, customerIdParams, storeId, setCheckedIn, setComplete, locationConfig])

  if (!checkedIn) return <Loader active />

  if (complete) {
    return (
      <Card title="Thanks!">
        Looks like you're no longer on the waitlist. Hope to see you again soon!
      </Card>
    )
  } else {
    const waitWhileLink = `https://app.waitwhile.com/l/${Location.info(locationConfig, storeId).shortName}/${checkedIn.publicId}`;

    return (
      <Card title="You're on the waitlist!">
      {checkedIn.name.split(" ")[0]}, you're currently
      <NumWaiting>#{checkedIn.position}</NumWaiting>
      in line at <b>{Location.info(locationConfig, storeId).name}</b>. We'll send you a text when it's your turn. Please have your vaccination/test documentation ready. In the meantime, why not <a href="https://genkisushiusa.com/waitmenuv3" alt="our menu" target="_blank" rel="noreferrer">check out the menu?</a>
      <a href={waitWhileLink} alt="Virtual Ticket"><Button variant="contained" disableElevation className="primaryBtn" type="button">View Virtual Ticket</Button></a>
      </Card>
    )
  }
}

export default Success;