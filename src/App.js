import React, { useState } from "react";
import { 
  BrowserRouter as Router, 
  Route, 
  Switch 
} from "react-router-dom";
import "./style/App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Overview from "./components/Overview";
import LocationRouter from "./components/LocationRouter";

function App() {

  const [loaderStatus, setLoaderStatus] = useState(false);

  return (
    <Router>
      <Loader active={loaderStatus} />
      <Header />
      <main>
        <Switch>
          <Route path="/:storeId">
            <LocationRouter setLoaderStatus={setLoaderStatus} />
          </Route>
          <Route path="/" exact>
            <Overview />
          </Route>
        </Switch>
      </main>
      <Footer />
    </Router>
  )
}

export default App;