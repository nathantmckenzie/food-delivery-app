import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/client";

const ADD_MENU_ITEM = gql`
  mutation addMenuItem($name: String!, $menuId: String!) {
    addMenuItem(name: $name, menuId: $menuId) {
      id
      name
      menuId
    }
  }
`;

const GET_RESTAURANT = gql`
  {
    restaurant(id: "6099ade055e5e235d4012513") {
      name
      description
      menuItems {
        name
        price
        description
        id
      }
    }
  }
`;

const DELETE_MENU_ITEM = gql`
  mutation deleteMenuItem($id: ID!) {
    deleteMenuItem(id: $id) {
      id
      name
    }
  }
`;

export default function Restaurant({ restaurant, getDataQuery }) {
  const [menuItemName, setMenuItemName] = useState();
  const [menuItemDescription, setMenuItemDescription] = useState();
  const [menuItemPrice, setMenuItemPrice] = useState();

  console.log("GEtDAYAQUERy", getDataQuery);
  // const data = props.GET_RESTAURANT;
  const [addMenuItemMutation, { error }] = useMutation(ADD_MENU_ITEM);
  const [deleteMenuItemMutation] = useMutation(DELETE_MENU_ITEM);

  // useEffect(() => {
  //   console.log("DATA", data);
  // }, [data]);

  return (
    <div>
      {restaurant.name}
      <br />
      {restaurant.shortDescription}
      <br /> {restaurant.description}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addMenuItemMutation({
            variables: {
              name: menuItemName,
              menuId: restaurant.menuId,
            },
            refetchQueries: [{ query: GET_RESTAURANT }],
          });
          console.log("error", error);
        }}
      >
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
      {restaurant.menuItems.map((menuItem) => {
        return (
          <li>
            {menuItem.name} ${menuItem.price}
            <br />
            {menuItem.description}
            <br />
            <span
              onClick={() =>
                deleteMenuItemMutation({
                  variables: {
                    id: menuItem.id,
                  },
                })
              }
            >
              X
            </span>
          </li>
        );
      })}
    </div>
  );
}
