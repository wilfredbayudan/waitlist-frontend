import React from "react";
import LocationStatus from "./LocationStatus";
import styled from "styled-components";

const OverviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

function Overview({ setOverlayModal, locationConfig, setLoaderStatus }) {

  const renderLocations = locationConfig.map(location => {
    if (location.enabled) {
      return (
        <LocationStatus 
          key={location.id} 
          storeId={location.id} 
          setOverlayModal={setOverlayModal} 
          locationConfig={locationConfig} 
          setLoaderStatus={setLoaderStatus}
          joinable={false}
        />
      )
    } else {
      return null;
    }
  })

  return (
    <OverviewContainer>
      {renderLocations}
    </OverviewContainer>
  );
}

export default Overview;