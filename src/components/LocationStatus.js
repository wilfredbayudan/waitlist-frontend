import React, { useEffect, useState } from "react";
import Location from "../classes/Location";
import Error from "./Error";
import Loader from "./Loader";
import LocationCard from "./LocationCard";

function LocationStatus({ storeId, setOverlayModal, locationConfig, joinable }) {
  const [locationData, setLocationData] = useState(false);
  const [errors, setErrors] = useState(false);

  useEffect(() => {
    function checkWaitlist() {
      Location.getWaitlist(locationConfig, storeId)
      .then(res => setLocationData(res))
      .catch(err => setErrors(err.message));
    }
    checkWaitlist();
    const interval = setInterval(() => {
      checkWaitlist();
    }, 5000)

    return (() => clearInterval(interval));
  }, [storeId, locationConfig])

  if (errors) return <Error message={errors} />
  if (!locationData) return <Loader active />

  return <LocationCard storeId={storeId} locationData={locationData} setOverlayModal={setOverlayModal} locationConfig={locationConfig} joinable={joinable} />

}

export default LocationStatus;