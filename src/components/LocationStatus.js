import React, { useEffect, useState } from "react";
import Location from "../classes/Location";
import Error from "./Error";
import Loader from "./Loader";
import LocationCard from "./LocationCard";

function LocationStatus({ storeId, setOverlayModal, locationConfig }) {
  const [locationData, setLocationData] = useState(false);
  const [errors, setErrors] = useState(false);

  useEffect(() => {
    Location.getWaitlist(locationConfig, storeId)
      .then(res => setLocationData(res))
      .catch(err => setErrors(err.message));
  }, [storeId, locationConfig])

  if (errors) return <Error message={errors} />
  if (!locationData) return <Loader active />

  return <LocationCard storeId={storeId} locationData={locationData} setOverlayModal={setOverlayModal} locationConfig={locationConfig} />

}

export default LocationStatus;