import React, { useEffect, useState } from "react";
import Location from "../classes/Location";
import Error from "./Error";
import Loader from "./Loader";
import LocationCard from "./LocationCard";

function LocationStatus({ storeId, setOverlayModal }) {
  const [locationData, setLocationData] = useState(false);
  const [errors, setErrors] = useState(false);

  useEffect(() => {
    Location.getWaitlist(storeId)
      .then(res => setLocationData(res))
      .catch(err => setErrors(err.message));
  }, [storeId])

  if (errors) return <Error message={errors} />
  if (!locationData) return <Loader active />

  return <LocationCard storeId={storeId} locationData={locationData} setOverlayModal={setOverlayModal} />

}

export default LocationStatus;