import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";

function AdminRouter() {
  const [isAdmin, setIsAdmin] = useState(true);
  const history = useHistory();
  const match = useRouteMatch();

  useEffect(() => {
    if (!isAdmin) {
      history.push('/admin/login');
    }
  }, [isAdmin])

  return (
    <Switch>
      <Route path={`${match.url}/`} exact>
        <Home />
      </Route>
      <Route path={`${match.url}/login`} component={Login} />
      <Route>
        404
      </Route>
    </Switch>
  )
}

export default AdminRouter;