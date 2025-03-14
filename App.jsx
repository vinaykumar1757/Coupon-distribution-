
import React, { useState } from "react";
import axios from "axios";

function App() {
    const [message, setMessage] = useState("");
    const [coupon, setCoupon] = useState(null);

    const getCoupon = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/coupons", { withCredentials: true });
            setCoupon(response.data.coupon.code);
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || "Error claiming coupon");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Get Your Coupon</h1>
            <button onClick={getCoupon}>Claim Coupon</button>
            {message && <h2>{message}</h2>}
            {coupon && <h2>Your Coupon: {coupon}</h2>}
        </div>
    );
}

export default App;
