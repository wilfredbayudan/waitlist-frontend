import React, { useEffect, useState } from "react";
import AdminContent from "./AdminContent";
import timeAgo from "../../classes/TimeAgo";
import styled from "styled-components";
import CheckinFilter from "./CheckinFilter";

const CheckinTable = styled.table`
  border: 1px solid #f5f5f5;
  border-radius: 3px;
  width: 100%;
  padding: 3px;
`;

const CheckinRow = styled.tr`
  background-color: ${prop => prop.index % 2 === 0 ? "#f6f6f6" : "#ffffff"};
`;

function Checkins({ setLoaderStatus, setOverlayModal, locationConfig }) {

  const [checkins, setCheckins] = useState([]);
  const [contacts, setContacts] = useState({});
  const [locationFilter, setLocationFilter] = useState('All');

  useEffect(() => {
    setLoaderStatus(true);
    fetch('http://localhost:5000/checkins')
      .then(res => res.json())
      .then(json => {
        setCheckins(json);
      })
      .catch(err => {
        console.log(err);
      })

  }, [setLoaderStatus]);

  function createContactsObject(contactsArray) {
    let contactsObject = {};
    contactsArray.forEach(contact => {
      contactsObject[contact.id] = {
        firstName: contact.firstName,
        lastName: contact.lastName,
        addressStreet: contact.addressStreet,
        addressCity: contact.addressCity,
        addressZip: contact.addressZip,
        addressState: contact.addressState,
        addressCountry: contact.addressCountry,
        phone: contact.phone,
      }
    })
    return contactsObject;
  }

  useEffect(() => {
    if (checkins.length > 0) {
      fetch('http://localhost:5000/contacts')
        .then(res => res.json())
        .then(json => {
          setContacts(createContactsObject(json));
          setLoaderStatus(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [checkins, setLoaderStatus]);

  function renderCheckins() {

    function checkinMap(checkin, index) {
      if (checkin.preCheckId in contacts) {
        return (
          <CheckinRow key={checkin.id} index={index}>
            <td>{checkin.storeId}</td>
            <td>{contacts[checkin.preCheckId].firstName}</td>
            <td>{contacts[checkin.preCheckId].lastName}</td>
            <td>{checkin.partySize}</td>
            <td>{contacts[checkin.preCheckId].phone}</td>
            <td>{contacts[checkin.preCheckId].addressStreet} {contacts[checkin.preCheckId].addressCity}, {contacts[checkin.preCheckId].addressState} {contacts[checkin.preCheckId].addressZip}, {contacts[checkin.preCheckId].addressCountry}</td>
            <td>{timeAgo(checkin.checkinDate)}</td>
          </CheckinRow>
        )
      }
    }

    function filterByLocation(array, storeFilter) {
      if (storeFilter === "All") {
        return array;
      } else {
        return array.filter(checkin => parseInt(checkin.storeId) === parseInt(storeFilter));
      }
    }

    if (Object.keys(contacts).length > 0) {
      const filteredCheckins = filterByLocation(checkins, locationFilter);
      if (filteredCheckins.length > 0) {
        return filteredCheckins.sort((a, b) => b.checkinDate - a.checkinDate).map((checkin, index) => checkinMap(checkin, index))
      } else {
        return <tr><td colSpan="7" style={{ textAlign: "center" }}>No checkins found for location <b>{locationFilter}</b></td></tr>
      }    
    }
    return null;
  }

  return (
    <AdminContent title="View Check-Ins">
      <CheckinFilter locationConfig={locationConfig} locationFilter={locationFilter} setLocationFilter={setLocationFilter} />
      <CheckinTable cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Location</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Party Size</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Visited</th>
          </tr>
        </thead>
        <tbody>
          {renderCheckins()}
        </tbody>
      </CheckinTable>
    </AdminContent>
  )
}

export default Checkins;