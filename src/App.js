import React, { useState, useEffect } from "react";
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
import OverlayModal from "./components/OverlayModal";
import AdminRouter from "./components/admin/AdminRouter";

function App() {

  const [loaderStatus, setLoaderStatus] = useState(false);
  const [overlayModal, setOverlayModal] = useState({
    active: false,
    title: 'Overlay Title',
    message: 'Overlay Message'
  })
  const [locationConfig, setLocationConfig] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/locations')
      .then(res => res.json())
      .then(json => setLocationConfig(json))
      .catch(err => console.log(err))
  }, [])

  const mainRoutes = (
    <Switch>
    <Route path="/admin" locationConfig={locationConfig}>
      <AdminRouter />
    </Route>
    <Route path="/:storeId">
      <LocationRouter setLoaderStatus={setLoaderStatus} setOverlayModal={setOverlayModal} locationConfig={locationConfig} />
    </Route>
    <Route path="/" exact>
      <Overview />
    </Route>
  </Switch>
  )

  return (
    <Router>
      <OverlayModal overlayModal={overlayModal} setOverlayModal={setOverlayModal} />
      <Loader active={loaderStatus} />
      <Header />
      <main>
        { locationConfig ? mainRoutes : <Loader active={true} />}
      </main>
      <Footer />
    </Router>
  )
}

export default App;