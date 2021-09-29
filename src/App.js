import React from "react";
import { 
  BrowserRouter as Router, 
  Route, 
  Switch 
} from "react-router-dom";
import "./style/App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route path="/:storeId">
            Store Path
          </Route>
          <Route path="/" exact>
            Overview Path
          </Route>
        </Switch>
      </main>
      <Footer />
    </Router>
  )
}

export default App;