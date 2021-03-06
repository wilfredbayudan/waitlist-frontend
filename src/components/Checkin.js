import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Location from "../classes/Location";
import CheckinForm from "./CheckinForm";
// import CheckinSuccess from "./CheckinSuccess";

function Checkin({ storeId, setLoaderStatus, setOverlayModal, setCheckedIn, locationConfig }) {
  const history = useHistory();
  const preCheckParams = useParams().preCheckId;

  useEffect(() => {
    setLoaderStatus(true)
    Location.isOpen(locationConfig, storeId)
      .then(isOpen => {
        setLoaderStatus(false)
        if (!isOpen) {
          setOverlayModal({
            active: true,
            title: 'Oops!',
            message: `Sorry, the waitlist has been closed.`
          });
          history.push(`/${storeId}`)
        }
      })
      .catch(err => {
        setOverlayModal({
          active: true,
          title: 'Oops!',
          message: `Something went wrong (${err.message})`
        });
        history.push(`/${storeId}`)
      })
  }, [storeId, setLoaderStatus, setOverlayModal, history, locationConfig])

  // if (checkedIn) return <CheckinSuccess storeId={storeId} checkInData={checkedIn} />

  return <CheckinForm storeId={storeId} preCheckParams={preCheckParams} contactTracing={Location.info(locationConfig, storeId).contactTracing} setLoaderStatus={setLoaderStatus} setOverlayModal={setOverlayModal} setCheckedIn={setCheckedIn} locationConfig={locationConfig} />
}

export default Checkin;