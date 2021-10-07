import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";
import Admin from "./Admin";
import Login from "./Login";

function AdminRouter({ setOverlayModal, locationConfig, setLocationConfig, setLoaderStatus }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const history = useHistory();
  const match = useRouteMatch();

  useEffect(() => {
    if (!isAdmin) {
      history.push('/admin/login');
    }
  }, [isAdmin, history])

  return (
    <Switch>
      <Route path={`${match.url}/login`} exact>
        <Login setOverlayModal={setOverlayModal} setIsAdmin={setIsAdmin} />
      </Route>
      <Route path={`${match.url}/`}>
        <Admin userInfo={isAdmin} setIsAdmin={setIsAdmin} locationConfig={locationConfig} setLocationConfig={setLocationConfig} setLoaderStatus={setLoaderStatus} setOverlayModal={setOverlayModal} />
      </Route>
    </Switch>
  )
}

export default AdminRouter;