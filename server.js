
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("✅ MongoDB connected successfully!");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        setTimeout(connectDB, 5000); // Retry after 5 seconds
    }
};
connectDB();

const CouponSchema = new mongoose.Schema({
    code: String,
    assigned: Boolean,
});

const Coupon = mongoose.model("Coupon", CouponSchema);

app.get('/api/coupons', async (req, res) => {
    try {
        const coupon = await Coupon.findOneAndUpdate({ assigned: false }, { assigned: true }, { new: true });
        if (!coupon) return res.status(404).json({ message: "No coupons available" });

        res.json({ message: "Coupon claimed successfully!", coupon });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

app.listen(5000, () => console.log('🚀 Server running on port 5000'));
