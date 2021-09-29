import React from "react";
import { Link, useHistory } from "react-router-dom";
import Notice from "./Notice";
import Button from '@mui/material/Button';

function WelcomeBack({ userData, storeId }) {
  const history = useHistory();
  if (userData) {
    const firstName = userData.name.split(" ")[0];
    return (
      <Notice color="blue">
        Nice to see you, <b>{firstName}</b>! <Link to={`/${storeId}/join`}>Not you?</Link>
      </Notice>
    )
  } else {
    return (
      <Button className="secondaryBtn" variant="contained" disableElevation fullWidth onClick={() => history.push(`/${storeId}/join`)}>Need to create a PreCheck ID?</Button>
    )
  }
}

export default WelcomeBack;