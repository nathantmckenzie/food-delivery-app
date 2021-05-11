import React from "react";

export default function Restaurant({ restaurant }) {
  return (
    <div>
      {restaurant.name}
      <br />
      {restaurant.shortDescription}
      <br /> {restaurant.description}
    </div>
  );
}
