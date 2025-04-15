import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import Fooditem from "../Fooditem/Fooditem";
import axios from "axios";
const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  const checkOutHandler = async ({ name, amount }) => {
   try {
     const {
       data: { order },
     } = await axios.post("http://localhost:4000/api/payment/checkout", {
       name,
       amount,
     });
     var options = {
       key: "rzp_test_eEjLpvhY7wYV8w", // Enter the Key ID generated from the Dashboard
       amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
       currency: order.currency,
       name: "Avinash kumar",
       description: "Test Transaction",
       image:
         "https://images.unsplash.com/photo-1682687221006-b7fd60cf9dd0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
       order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
       callback_url: "http://localhost:4000/api/payment/payment-verification",
       prefill: {
         name: "Gaurav Kumar",
         email: "gaurav.kumar@example.com",
         contact: "+916239378916",
       },
       notes: {
         address: "Razorpay Corporate Office",
       },
       theme: {
         color: "#3399cc",
       },
     };
     var rzp1 = new window.Razorpay(options);
     rzp1.open();
   } catch (error) {
      console.log("got an error", error);
   }
   
  };

  return (
    <div className="food-display" id="food-display">
      <h2> Top dishes near you </h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          {
            console.log(category, item.category);
          }
          if (category === "All" || category === item.category)
            return (
              <Fooditem
                key={index}
                _id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                onCheckout={checkOutHandler}
              />
            );
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
