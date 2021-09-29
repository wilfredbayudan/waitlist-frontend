import React from "react";
import { Switch, Route, useParams, useRouteMatch } from "react-router-dom";
import Location from "../classes/Location";
import Card from "./Card";
import LocationStatus from "./LocationStatus";
import Join from "./Join";
import Checkin from "./Checkin";

function LocationRouter({ setLoaderStatus, setOverlayModal }) {
  const match = useRouteMatch();
  const storeIdParam = useParams().storeId;

  // Validate Location
  if (Location.validate(storeIdParam)) {
    return (
      <Switch>
        <Route path={`${match.url}/join`}>
          <Join storeId={storeIdParam} setLoaderStatus={setLoaderStatus} setOverlayModal={setOverlayModal} />
        </Route>
        <Route path={`${match.url}/checkin/:preCheckId?`}>
          <Checkin storeId={storeIdParam} setLoaderStatus={setLoaderStatus} setOverlayModal={setOverlayModal} />
        </Route>
        <Route path={`${match.url}`} exact>
          <LocationStatus storeId={storeIdParam} setLoaderStatus={setLoaderStatus} setOverlayModal={setOverlayModal} />
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