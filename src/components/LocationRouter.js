import React, { useState } from "react";
import { Switch, Route, useParams, useRouteMatch } from "react-router-dom";
import Location from "../classes/Location";
import Card from "./Card";
import LocationStatus from "./LocationStatus";
import Join from "./Join";
import Checkin from "./Checkin";
import Success from "./Success";

function LocationRouter({ setLoaderStatus, setOverlayModal, locationConfig }) {
  const match = useRouteMatch();
  const storeIdParam = useParams().storeId;
  const [checkedIn, setCheckedIn] = useState(false);

  // Validate Location
  if (Location.validate(locationConfig, storeIdParam)) {
    return (
      // Switch
      <Switch>
        <Route path={`${match.url}/join`}>
          <Join storeId={storeIdParam} setLoaderStatus={setLoaderStatus} setOverlayModal={setOverlayModal} />
        </Route>
        <Route path={`${match.url}/checkin/:preCheckId?`}>
          <Checkin storeId={storeIdParam} setLoaderStatus={setLoaderStatus} setOverlayModal={setOverlayModal} setCheckedIn={setCheckedIn} locationConfig={locationConfig} />
        </Route>
        <Route path={`${match.url}/success/:customerId?`}>
          <Success storeId={storeIdParam} setLoaderStatus={setLoaderStatus} setOverlayModal={setOverlayModal} checkedIn={checkedIn} setCheckedIn={setCheckedIn} locationConfig={locationConfig} />
        </Route>
        <Route path={`${match.url}`} exact>
          <LocationStatus storeId={storeIdParam} setLoaderStatus={setLoaderStatus} setOverlayModal={setOverlayModal} locationConfig={locationConfig} />
        </Route>
      </Switch>
    )
  } else {
    return (
      <Card title="Oops!">Invalid Store ID</Card>
    )
  }
}

export default LocationRouter;