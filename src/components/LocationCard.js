import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "./Card";
import Location from "../classes/Location";
import styled from "styled-components";
import HandleCookie from "../classes/HandleCookie";
import Notice from "./Notice";
import LoadingButton from '@mui/lab/LoadingButton';

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

function LocationCard({ storeId, locationData, setOverlayModal, locationConfig, joinable=true }) {
  const history = useHistory();
  const [isWaiting, setIsWaiting] = useState(false);
  const isOpen = locationData.isWaitlistOpen;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const locationCookie = HandleCookie.get('locationId');
    const customerIdCookie = HandleCookie.get('customerId')
    if (locationCookie === Location.info(locationConfig, storeId).waitwhileId && customerIdCookie !== "") {
      setLoading(true);
      // Check if current user is already on the waitlist
      fetch(`${process.env.REACT_APP_WAITLIST_API}/customer-status?customerId=${customerIdCookie}`)
        .then(res => res.json())
        .then(json => {
          const results = json.results;
          setLoading(false);
          if (results.length === 0) {
            setIsWaiting(false);
            return;
          }
          if (results[0].locationId === Location.info(locationConfig, storeId).waitwhileId) {
            setIsWaiting(results[0]);
          }
        })
        .catch(err => {
          setLoading(false);
          setOverlayModal({
            active: true,
            title: 'Oops',
            message: err.message
          })
        });
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 800)
    }
  }, [storeId, setOverlayModal, locationConfig]);

  function handleJoinClick() {
    let nextStep = Location.info(locationConfig, storeId).contactTracing ? 'join' : 'checkin';
    // If PreCheckID Cookie Exists, also push to checkin
    if (HandleCookie.get('preCheckId')) {
      nextStep = `checkin/${HandleCookie.get('preCheckId')}`;
    }
    history.push(`/${storeId}/${nextStep}`);
  }

  const renderJoinButton = (
    joinable ? 
    <LoadingButton variant="contained" disableElevation className="primaryBtn" loading={loading} disabled={!isOpen} onClick={handleJoinClick}>Join Waitlist</LoadingButton>
    : null
  )

  const renderAlreadyWaiting = () => {
    const ticketUrl = `https://app.waitwhile.com/l/${Location.info(locationConfig, storeId).shortName}/${isWaiting.publicId}`;
    if (joinable) {
      return (
        <>
        <Notice color="#f1f1f1">
          Hey {isWaiting.firstName}, you are currently <b>#{isWaiting.position}</b> in line.
        </Notice>
        <a href={ticketUrl} alt="Virtual Ticket"><LoadingButton variant="contained" disableElevation className="primaryBtn">View Virtual Ticket</LoadingButton></a>
        </>
      )
    } else {
      return null;
    }
  }

  return (
    <Card title={Location.info(locationConfig, storeId).name}>
      Waitlist is <StatusSpan isOpen={isOpen}>{isOpen ? 'open' : 'closed'}</StatusSpan> and there are
      <NumWaiting>{locationData.numWaiting}</NumWaiting>
      parties waiting
      { isWaiting ? renderAlreadyWaiting() : renderJoinButton }
    </Card>
  )
}

export default LocationCard;