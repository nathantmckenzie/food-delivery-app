import React, { useState } from "react";

export default function Restaurant({ restaurant }) {
  const [menuItemName, setMenuItemName] = useState();
  const [menuItemDescription, setMenuItemDescription] = useState();
  const [menuItemPrice, setMenuItemPrice] = useState();

  return (
    <div>
      {restaurant.name}
      <br />
      {restaurant.shortDescription}
      <br /> {restaurant.description}
      <form>
        <input
          value={menuItemName}
          onChange={(e) => setMenuItemName(e.target.value)}
          placeholder="Name"
        ></input>
        <br />
        <textarea
          value={menuItemDescription}
          onChange={(e) => setMenuItemDescription(e.target.value)}
          placeholder="Description"
        ></textarea>
        <br />
        <input
          value={menuItemPrice}
          onChange={(e) => setMenuItemPrice(e.target.value)}
          placeholder="Price"
        ></input>
        <br />
        <button>Add Menu Item</button>
      </form>
      {console.log("RESTAURANT", restaurant)}
    </div>
  );
}
