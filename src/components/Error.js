import React from "react";
import Card from "./Card";

function Error({ message }) {
  return (
    <Card title="Oops!">
      {message}
    </Card>
  )
}

export default Error;