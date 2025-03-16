import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {
    const [ menu,setMenu] =useState("menu");
    const{getTotalCartAmount,token,setToken}=useContext(StoreContext);
    const navigate =useNavigate();
const logout =()=>{
  localStorage.removeItem("token")
  setToken("");
  navigate("/")

}
  return (
    <div className='navbar'> 
    <Link to = '/'><img src={assets.logo} alt="" className='logo'/></Link>
      <ul className="navbar-menu">
        <li onClick={()=>setMenu("home")} className={ menu==="home"?"active":""}> home</li>
        <li onClick={()=>setMenu("menu")}className={ menu==="menu"?"active":"" }>menu</li>
        <li onClick={()=>setMenu("mobile-app")}className={ menu==="mobile-app"?"active":"" }>mobile-app</li>
        <li onClick={()=>setMenu("contact us")}className={ menu==="contact us"?"active":"" }>contact us</li>
      </ul>
<div className="navbar-right">
   <img src={assets.search_icon} alt=""/> 
    <div className="navbar-search-icon">
   <Link to='/Cart'> <img src={assets.basket_icon} alt=""/></Link>
    <div className={getTotalCartAmount()===0?"":"dot"}></div>
    </div>
    {!token?<button onClick={()=>setShowLogin(true)}> sign in </button>:<div className='navbar-profile'>
     <img src={assets.profile} alt="" />
     <ul className='nav-profile-dropdown'>
      <li><img src={assets.bag}alt="" /><p>Orders</p></li>
      <hr/>
      <li onClick={logout}><img src={assets.logout}alt="" /><p>Logout</p></li>
     </ul>
      </div>}
    {/* // <button onClick={()=>setShowLogin(true)}> sign in </button> */}
</div>
    </div>
  )
}

export default Navbar
