import express from "express"
import authMiddleware from "../middleware/auth.js"
import { placeOrder} from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/place",placeOrder)
// orderRouter.post("/userorders",userOrders)
// orderRouter.post("/verify", verifyPayment)


export default orderRouter;