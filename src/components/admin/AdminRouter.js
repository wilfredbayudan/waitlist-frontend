import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";

function AdminRouter({ setOverlayModal }) {
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
      <Route path={`${match.url}/`} exact>
        <Home />
      </Route>
      <Route path={`${match.url}/login`}>
        <Login setOverlayModal={setOverlayModal} setIsAdmin={setIsAdmin} />
      </Route>
      <Route>
        404
      </Route>
    </Switch>
  )
}

export default AdminRouter;