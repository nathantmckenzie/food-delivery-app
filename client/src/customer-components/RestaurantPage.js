import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import MenuItemModal from "./MenuItemModal";

export default function RestaurantPage({ restaurant, setRestaurant }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="res">
      <NavBar />
      <div className="restaurant-page">
        <div className="restaurant-page-left-side">
          <div className="restaurant-page-restaurant-title">
            {restaurant.name}
            <div className="test-scroll">.</div>
          </div>
          <div className="menu">
            Menu{" "}
            <div className="menu-list">
              {restaurant.menuItems.map((menuItem) => {
                return (
                  <div
                    className="menu-item-container"
                    onClick={() => setShowModal(!showModal)}
                  >
                    {menuItem.name}
                    <br />
                    {menuItem.description}
                    <br />
                    <div className="menu-price">CA${menuItem.price}</div>
                    {showModal ? (
                      <MenuItemModal
                        name={menuItem.name}
                        price={menuItem.price}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="restaurant-page-right-side">hi</div>
      </div>
    </div>
  );
}
