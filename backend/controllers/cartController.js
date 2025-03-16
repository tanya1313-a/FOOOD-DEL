// // import userModel from '.../models/userModel.js'
import mongoose from 'mongoose'
import userModel from '../models/userModel.js';  // Relative path from controllers to models


//add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId );
        let cartdata = userData.cartdata || {};


        if (!cartdata[req.body.itemId]) {
            cartdata[req.body.itemId] = 1;
        }
        else {
            cartdata[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartdata });
        res.json({ success: true, message: "added to cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// const addToCart = async (req, res) => {
//     try {
//         // Fetch user data based on the userId
//         let userData = await userModel.findOne({ _id: req.body.userId });

//         // Check if userData exists
//         if (!userData) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         // Ensure cartData is initialized as an empty object if undefined or null
//         let cartdata = userData.cartdata || {};  // Default to an empty object if cartData is undefined or null

//         // Log the current cart data to check if it's being fetched properly
//         console.log('Current Cart Data:', cartdata);

//         // Check if the item already exists in the cart and update the count
//         if (!cartdata[req.body.itemId]) {
//             cartdata[req.body.itemId] = 1;  // Add the item with a quantity of 1
//         } else {
//             cartdata[req.body.itemId] += 1;  // Increment the quantity if item already exists
//         }

//         // Log the updated cart data to ensure it's being modified
//         console.log('Updated Cart Data:', cartdata);

//         // Update the user's cart data in the database
//         userData.cartdata = cartdata;  // Directly modify the cartData field
//         await userData.save();  // Save the updated user data to the database

//         // Log the updated user to confirm the cart data is being saved
//         console.log('Updated User:', userData);

//         // Send success response
//         res.json({ success: true, message: "Item added to cart" });

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ success: false, message: "Error adding item to cart" });
//     }
// };


//remove from cart
const removeFromCart = async (req, res) => {
    try{
    let userData = await userModel.findById(req.body.userId );
    let cartdata = await userData.cartdata || {};
    {
        if(cartdata[req.body.itemId]>0){
            cartdata[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartdata});
        res.json({ success: true, message: "Item removed from cart" });

    }}
    catch(error) {
                console.log(error);
                res.status(500).json({ success: false, message: "Error removing item from cart" });
            }
}
// const removeFromCart = async (req, res) => {
//     try {
//         // Fetch user data based on userId
//         let userData = await userModel.findById(req.body.userId );

//         if (!userData) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         // Ensure cartdata is initialized
//         let cartdata = await userData.cartdata || {};

//         // Check if the item exists in the cart
//         if (!cartdata[req.body.itemId]) {
//             return res.status(400).json({ success: false, message: "Item not found in cart" });
//         }

//         // Remove the item from the cart
//         delete cartdata[req.body.itemId];

//         // Save the updated cartdata
//         userData.cartdata = cartdata;
//         await userData.save();  // Save changes to the database

//         res.json({ success: true, message: "Item removed from cart" });

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ success: false, message: "Error removing item from cart" });
//     }
// }


//fetch  user cart data
// const getCart = async (req, res) => {

// }
const getCart = async (req, res) => {
    try {
        // Fetch user data based on userId
        let userData = await userModel.findOne({ _id: req.body.userId });

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Retrieve the cartdata
        let cartdata = userData.cartdata || {};

        res.json({ success: true, cart: cartdata });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching cart data" });
    }
}

export { addToCart, removeFromCart, getCart }