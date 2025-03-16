import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [showPayment, setShowPayment] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowPayment(true);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const userId = decodedToken.id;

    const orderItems = food_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({
        ...item,
        quantity: cartItems[item._id],
      }));

    const orderData = {
      userId: userId,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
      address: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        street: data.street,
        city: data.city,
        state: data.state,
        zipcode: data.zipcode,
        country: data.country,
        phone: data.phone
      },
      payment: {
        cardNumber: paymentData.cardNumber.slice(-4),
        cardName: paymentData.cardName,
        paymentStatus: 'completed'
      }
    };

    try {
      const response = await fetch(`${url}/api/order/place`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      const responseData = await response.json();
      
      if (response.ok) {
        setOrderSuccess(true);
        setShowPayment(false);
        // Clear form data
        setData({
          firstName: "",
          lastName: "",
          email: "",
          street: "",
          city: "",
          state: "",
          zipcode: "",
          country: "",
          phone: ""
        });
        // Clear payment data
        setPaymentData({
          cardNumber: '',
          cardName: '',
          expiryDate: '',
          cvv: ''
        });
        alert('Order placed successfully!');
      } else {
        alert('Failed to place order: ' + responseData.message);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order. Please try again.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='place-order'>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' required />
            <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' required />
          </div>
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' required />
          <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' required />
          <div className="multi-fields">
            <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required />
            <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' required />
          </div>
          <div className="multi-fields">
            <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zipcode' required />
            <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' required />
          </div>
          <input name='phone' onChange={onChangeHandler} value={data.phone} type='tel' placeholder='Phone' required />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>Rs {getTotalCartAmount()}</p>
              </div>
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>{2}</p>
              </div>
              <div className="cart-total-details">
                <b>Total</b>
                <b>Rs {getTotalCartAmount() + 2}</b>
              </div>
            </div>
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>

      {showPayment && (
        <div className="payment-modal">
          <div className="payment-modal-content">
            <button
              onClick={() => setShowPayment(false)}
              className="close-button"
            >
              ×
            </button>
            
            <h2>Payment Details</h2>
            <p>Total Amount: ₹{getTotalCartAmount() + 2}</p>
            
            <form onSubmit={handlePayment}>
              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentData.cardNumber}
                  onChange={handlePaymentChange}
                  placeholder="1234 5678 9012 3456"
                  required
                  maxLength="16"
                />
              </div>
              
              <div className="form-group">
                <label>Card Holder Name</label>
                <input
                  type="text"
                  name="cardName"
                  value={paymentData.cardName}
                  onChange={handlePaymentChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={handlePaymentChange}
                    placeholder="MM/YY"
                    required
                    maxLength="5"
                  />
                </div>
                
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="password"
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={handlePaymentChange}
                    placeholder="123"
                    required
                    maxLength="3"
                  />
                </div>
              </div>
              
              <button type="submit" className="pay-now-button">
                Pay Now
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaceOrder;