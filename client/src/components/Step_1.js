import React from 'react'
import { useLocation } from "react-router-dom";

const Step = () => {
    const location = useLocation();
    const { totalPrice } = location.state || {};
    return (
    <div>
      <h1>Step 1</h1>
      <p>Total Price: {totalPrice}</p>
    </div>
  )
}

export default Step
