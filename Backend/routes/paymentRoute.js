// routes/paymentRoute.js
import express from "express";
const router = express.Router();

router.get("/success", (req, res) => res.send("Payment Success! Save order info here."));
router.get("/failure", (req, res) => res.send("Payment Failed!"));

export default router;
