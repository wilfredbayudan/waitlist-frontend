import React from "react";
import AdminContent from "./AdminContent";
import styled from "styled-components";
import Checkbox from '@mui/material/Checkbox';

const LocationTable = styled.table`
  border: 1px solid #f5f5f5;
  border-radius: 3px;
  width: 100%;
  padding: 3px;
`;

const LocationRow = styled.tr`
  background-color: ${prop => prop.index % 2 === 0 ? "#f6f6f6" : "#ffffff"};
`;

function Locations({ setLoaderStatus, setOverlayModal, locationConfig, setLocationConfig }) {

  function handleConfigUpdate(event, storeId) {

    const indexOfStore = locationConfig.findIndex(location => location.id === storeId);

    // Update Config DB
    setLoaderStatus(true);

    fetch(`${process.env.REACT_APP_JSON_API}/locations/${storeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        [event.target.name]: event.target.checked
      })
    })
      .then(res => res.json())
      .then(updatedConfig => {
        // Update state with updated config
        setLocationConfig([
          ...locationConfig.slice(0, indexOfStore),
          updatedConfig,
          ...locationConfig.slice(indexOfStore+1)
        ])

        setOverlayModal({
          active: true,
          title: "Success!",
          message: `Settings for Location ${storeId} has been updated.`
        })

        setLoaderStatus(false);
      })
      .catch(err => {
        setOverlayModal({
          active: true,
          title: "Oops!",
          message: err.message
        })
      });


  }

  const renderLocations = locationConfig.map((location, index) => {
    return (
      <LocationRow key={location.id} index={index}>
        <td>{location.id}</td>
        <td><a href={`${process.env.REACT_APP_BASE_URL}/${location.id}`} target="_blank" rel="noreferrer">{location.name}</a></td>
        <td>{location.shortName}</td>
        <td>{location.waitwhileId}</td>
        <td><Checkbox name="contactTracing" checked={location.contactTracing} onChange={(e) => handleConfigUpdate(e, location.id)} /></td>
        <td><Checkbox name="enabled" checked={location.enabled} onChange={(e) => handleConfigUpdate(e, location.id)} /></td>
      </LocationRow>
    )
  })

  return (
    <AdminContent title="Manage Locations">
      <LocationTable cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Short Name</th>
            <th>WaitWhile ID</th>
            <th>Contact Tracing</th>
            <th>Enabled</th>          
          </tr>
        </thead>
        <tbody>
          {renderLocations}
        </tbody>
      </LocationTable>
    </AdminContent>
  )
}

export default Locations;