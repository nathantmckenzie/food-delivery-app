import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";

export default function RestaurantPage({ restaurant, setRestaurant }) {
  return (
    <div className="res">
      <NavBar />
      <div className="restaurant-page">
        <div className="restaurant-page-left-side">
          {console.log("1:51", restaurant)}
          <div className="restaurant-page-restaurant-title">
            {restaurant.name}
            <div className="test-scroll">.</div>
          </div>
          <div className="menu">Menu</div>
        </div>
        <div className="restaurant-page-right-side">hi</div>
      </div>
    </div>
  );
}
