import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";
import Admin from "./Admin";
import Login from "./Login";

function AdminRouter({ setOverlayModal, locationConfig, setLocationConfig }) {
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
        <Admin userInfo={isAdmin} setIsAdmin={setIsAdmin} locationConfig={locationConfig} setLocationConfig={setLocationConfig} />
      </Route>
    </Switch>
  )
}

export default AdminRouter;