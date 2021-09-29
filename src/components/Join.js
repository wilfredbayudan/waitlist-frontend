import React from "react";
import { useHistory } from "react-router-dom";
import Card from "./Card";
import ContactTracingForm from "./ContactTracingForm";
import HandleCookie from "../classes/HandleCookie";
import API from "../data/API";

function Join({ storeId, setLoaderStatus, setOverlayModal }) {
  const history = useHistory();

  function submitFormData(dataObj) {
    let sendData = new FormData();
    Object.keys(dataObj).forEach(inputName => {
      let value = dataObj[inputName];
      if (inputName === "phone") {
        value = dataObj.phone.replace(/\D/g,'');
      }
      sendData.append(inputName, value);
    })

    fetch(API.newCustomer, { method: 'POST', body: sendData })
      .then(res => res.json())
      .then(json => {
        const data = json.message.data;
        HandleCookie.set('preCheckId', data.preCheckId, 365);
        history.push(`/${storeId}/checkin/${data.preCheckId}`);
      })
      .catch(err => {

      })
  }
  
  return (
    <Card title="Contact Tracing" fullWidth>
      <ContactTracingForm storeId={storeId} setLoaderStatus={setLoaderStatus} setOverlayModal={setOverlayModal} submitdataObj={submitFormData} />
    </Card>
  )
}

export default Join;