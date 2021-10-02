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
import OverlayModal from "./components/OverlayModal";
import AdminRouter from "./components/admin/AdminRouter";

function App() {

  const [loaderStatus, setLoaderStatus] = useState(false);
  const [overlayModal, setOverlayModal] = useState({
    active: false,
    title: 'Overlay Title',
    message: 'Overlay Message'
  })

  return (
    <Router>
      <OverlayModal overlayModal={overlayModal} setOverlayModal={setOverlayModal} />
      <Loader active={loaderStatus} />
      <Header />
      <main>
        <Switch>
          <Route path="/admin">
            <AdminRouter />
          </Route>
          <Route path="/:storeId">
            <LocationRouter setLoaderStatus={setLoaderStatus} setOverlayModal={setOverlayModal} />
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