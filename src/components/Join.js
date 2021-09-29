import React from "react";
import Card from "./Card";
import ContactTracingForm from "./ContactTracingForm";

function Join({ storeId, setLoaderStatus, setOverlayModal }) {
  
  return (
    <Card title="Contact Tracing" fullWidth>
      <ContactTracingForm storeId={storeId} setLoaderStatus={setLoaderStatus} setOverlayModal={setOverlayModal} />
    </Card>
  )
}

export default Join;