import express from "express"
import { checkout, verifyPayment } from "../controllers/paymentController.js"


const paymentRouter = express.Router()

paymentRouter.post('/checkout', checkout)
paymentRouter.post('/payment-verification', verifyPayment)

export default paymentRouter