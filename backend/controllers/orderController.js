// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js"

// // // placing userorder from frontend
// const placeOrder = async (req,res) =>{
// try {
//     const frontend_url = "http://localhost:5173"
//     const newOrder= new orderModel({
//         userId:req.body.userId,
//         items:req.body.items,
//         amount:req.body.amount,
//         address:req.body.address
//     })
//     await newOrder.save();
//     await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

//     const line_items =req.body.items.map((item)=>({
//         price_data:{
//             currency:"inr",
//             product_data:{
//                 name:item.name
//             },
//             unit_amount:item.price*100*80
            
//         },
//         quantity:item.quantity
//     }))
//     line_items.push({
//         price_data:{
//             currency:"inr",
//             product_data:{
//                 name:"Delivery charges"
//             },
//             unit_amount:2*100*80
//         },
//         quantity:1
//     })
// }
// ********************************************
//     // const session =await Stripe.Checkout.SessionsResource.create({
//     //     line_items:line_items,
//     //     mode:'payment',
//     //     success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//     //     cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
//     // })
//     // res.json({success:true,session_url:session.url})
// } catch (error
// ) {
//     console.log(error);
//     res.json({success:false,message:"error"})
// }
// }

  
// //user orders for frontend

// const userOrders = async (req,res) =>{
// try {
//     const orders = await orderModel.find({userId:req.body.userId});
//     res.json({success:true,data:orders})
// } catch (error) {
//     console.log(error);
//     res.json({success:false,message:"error"})
    
// }
// }
// export {placeOrder,userOrders}

// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";

// // Handle placing an order
// const placeOrder = async (req, res) => {
//     try {
//         const { userId, items, amount, address } = req.body;

//         // Create a new order document
//         const newOrder = new orderModel({
//             userId,
//             items,
//             amount,
//             address,
//             payment: true  // Assuming payment is already processed successfully
//         });

//         // Save the order to the database
//         await newOrder.save();

//         // Clear the user's cart after placing the order
//         await userModel.findByIdAndUpdate(userId, { cartData: {} });

//         // Send success response
//         res.status(200).json({ success: true, message: "Order placed successfully", orderId: newOrder._id });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "An error occurred while placing the order" });
//     }
// };

// export { placeOrder }
//***************** *
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing user order from the frontend
const placeOrder = async (req, res) => {
    try {
        const frontend_url = "http://localhost:5173"; // Frontend URL where user will be redirected
        
        // Create a new order in the database
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });

        // Save the order to the database
        await newOrder.save();

        // Update user's cart to an empty object since the order is placed
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Prepare line items (for internal use, not for payment gateway)
        const line_items = req.body.items.map((item) => ({
            product_name: item.name,
            price: item.price,
            quantity: item.quantity
        }));

        // Add delivery charges as a separate line item
        line_items.push({
            product_name: "Delivery charges",
            price: 2, // Example delivery charge
            quantity: 1
        });

        // Create a unique transaction ID (can be used to track this order in the payment form)
        const transactionId = newOrder._id;

        // Redirect the user to the payment form, passing the necessary details as URL parameters
        res.status(200).json({
            success: true,
            message: "Order placed successfully",
            order: newOrder,
            paymentFormUrl: `${frontend_url}/payment-form?transactionId=${transactionId}&amount=${req.body.amount}`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while placing the order",
            error: error.message
        });
    }
};

export  {placeOrder};
