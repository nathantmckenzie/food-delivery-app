import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/client";
import { graphql } from "react-apollo";
import NavBar from "./NavBar";
import { useHistory } from "react-router-dom";

const GET_RESTAURANT = gql`
  {
    restaurants {
      name
      shortDescription
      description
      id
      isActive
      menuId
      menuItems {
        id
        name
        description
        price
      }
    }
  }
`;

export default function Home({ restaurant, setRestaurant }) {
  const [restaurants, setRestaurants] = useState();
  const { loading, data } = useQuery(GET_RESTAURANT);

  let history = useHistory();

  useEffect(() => {
    if (data) {
      setRestaurants(data.restaurants);
      console.log("DATAAA", data);
    }
  }, [data]);

  return (
    <div>
      <NavBar />
      {restaurants && restaurants !== undefined
        ? restaurants.map((restaurant) => {
            function toRestaurantPage() {
              setRestaurant(restaurant);
              history.push(`/${restaurant.name}`);
            }

            return (
              <div className="home-page">
                <li onClick={toRestaurantPage}>
                  <span className="restaurant-name">{restaurant.name}</span>
                  <br />
                  {restaurant.shortDescription}
                  <br />
                  {restaurant.description}
                </li>
              </div>
            );
          })
        : null}
    </div>
  );
}
