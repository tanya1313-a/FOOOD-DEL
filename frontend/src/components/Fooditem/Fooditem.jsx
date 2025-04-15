import React, { useContext } from "react";
import "./Fooditem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const Fooditem = ({ _id, name, price, description, image, onCheckout }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={url + "/images/" + image}
          alt=""
        />

        {!cartItems[_id] ? (
          // (!cartItems || !cartItems[_id])
          <img
            className="add"
            onClick={() => addToCart(_id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(_id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p> {cartItems[_id]}</p>
            <img
              onClick={() => addToCart(_id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info"></div>
      <div className="food-item-name-rating">
        <p>{name}</p>
        {<img src={assets.rating} alt="" />}
      </div>
      <p className="food-item-desc">{description}</p>
      <p>${price}</p>
      <button
        onClick={() => onCheckout({ name: name, amount: price })}
        className="food-item-price"
      >
        {" "}
        Buy Now &#x20B9;{price}
      </button>
    </div>
  );
};

export default Fooditem;
