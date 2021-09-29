import React from "react";
import { Switch, Route, useParams, useRouteMatch } from "react-router-dom";
import Location from "../classes/Location";
import Card from "./Card";
import LocationStatus from "./LocationStatus";

function LocationRouter({ setLoaderStatus }) {
  const match = useRouteMatch();
  const storeIdParam = useParams().storeId;

  // Validate Location
  if (Location.validate(storeIdParam)) {
    return (
      <Switch>
        <Route path={`${match.url}/join`}>
          Join Path for {storeIdParam}
        </Route>
        <Route path={`${match.url}/checkin`}>
          Check In Path {storeIdParam}
        </Route>
        <Route path={`${match.url}`} exact>
          <LocationStatus storeId={storeIdParam} setLoaderStatus={setLoaderStatus} />
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