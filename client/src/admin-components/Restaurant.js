import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/client";

const ADD_MENU_ITEM = gql`
  mutation addMenuItem($name: String!, $menuId: String!, $price: Int!) {
    addMenuItem(name: $name, menuId: $menuId, price: $price) {
      id
      name
      menuId
      price
    }
  }
`;

const GET_RESTAURANT = gql`
  query restaurant($id: String!) {
    restaurant(id: $id) {
      name
      description
      menuId
      menuItems {
        name
        price
        description
        menuId
        id
      }
    }
  }
`;

const DELETE_MENU_ITEM = gql`
  mutation deleteMenuItem($id: String!) {
    deleteMenuItem(id: $id) {
      id
      name
    }
  }
`;

const GET_MENU_ITEMS = gql`
  query menuItem($menuId: String!) {
    menuItem(menuId: $menuId) {
      name
      price
      menuId
    }
  }
`;

export default function Restaurant({ restaurant, setRestaurant }) {
  const [menuItemName, setMenuItemName] = useState();
  const [menuItemDescription, setMenuItemDescription] = useState();
  const [menuItemPrice, setMenuItemPrice] = useState();
  const [currentRestaurant, setCurrentRestaurant] = useState();

  const { loading, data } = useQuery(GET_RESTAURANT, {
    variables: { id: "609aed1258b2d4bb555b2c4c" },
  });
  const { ok, data: menuItemData } = useQuery(GET_MENU_ITEMS, {
    variables: { menuId: "1" },
  });
  const [addMenuItemMutation, { error }] = useMutation(ADD_MENU_ITEM);
  const [deleteMenuItemMutation] = useMutation(DELETE_MENU_ITEM);

  useEffect(() => {
    if (data) {
      setRestaurant(data.restaurant);
      console.log("DATAAA", data.restaurant);
    }
  }, [data]);

  useEffect(() => {
    console.log("MENU ITEM DATA", menuItemData);
  }, [menuItemData]);

  useEffect(() => {
    setCurrentRestaurant(data);
  }, [data]);

  useEffect(() => {
    setCurrentRestaurant(restaurant);
  }, []);

  useEffect(() => {
    console.log("C", currentRestaurant);
  }, [currentRestaurant]);

  return (
    <div>
      {restaurant.name}
      <br />
      {restaurant.shortDescription}
      <br />
      {restaurant.description}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addMenuItemMutation({
            variables: {
              name: menuItemName,
              menuId: restaurant.menuId,
              price: menuItemPrice,
            },
            refetchQueries: [
              {
                query: GET_RESTAURANT,
                variables: { id: "609aed1258b2d4bb555b2c4c" },
              },
            ],
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
          type="number"
          onChange={(e) => setMenuItemPrice(Number(e.target.value))}
          placeholder="Price"
        ></input>
        <br />
        <button>Add Menu Item</button>
      </form>
      {restaurant.menuItems.map((menuItem) => {
        return (
          <li>
            {menuItem.name} ${menuItem.price}
            <br />
            {menuItem.description}
            <br />
            <span
              onClick={() => {
                deleteMenuItemMutation({
                  variables: {
                    id: menuItem.id,
                  },
                  refetchQueries: [
                    {
                      query: GET_RESTAURANT,
                      variables: { id: "609aed1258b2d4bb555b2c4c" },
                    },
                  ],
                });
              }}
            >
              X
            </span>
          </li>
        );
      })}
    </div>
  );
}
