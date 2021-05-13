import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { graphql } from "react-apollo";
import NavBar from "./NavBar";
import { useHistory } from "react-router-dom";

const GET_RESTAURANTS = gql`
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

const GET_RESTAURANT_BY_NAME = gql`
  query restaurantByName($name: String!) {
    restaurantByName(name: $name) {
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
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  const { loading, data } = useQuery(GET_RESTAURANTS);
  //   const { something, data: searchData } = useQuery(GET_RESTAURANT_BY_NAME, {
  //     variables: { name: search ? search : "" },
  //   });
  const [searchRestaurant, { data: searchData }] = useLazyQuery(
    GET_RESTAURANT_BY_NAME,
    {
      variables: { name: search },
    }
  );

  let history = useHistory();

  useEffect(() => {
    if (data) {
      setRestaurants(data.restaurants);
      console.log("DATAAA", data);
    }
  }, [data]);

  useEffect(() => {
    if (searchData) {
      console.log("Search data", searchData);
      setRestaurants([searchData.restaurantByName]);
    }
  }, [searchData]);

  return (
    <div>
      <NavBar
        input={input}
        setInput={setInput}
        searchData={searchData}
        setSearch={setSearch}
        searchRestaurant={searchRestaurant}
      />
      {restaurants && restaurants !== undefined
        ? restaurants.map((restaurant) => {
            function toRestaurantPage() {
              setRestaurant(restaurant);
              history.push(`/${restaurant.name}`);
            }

            return (
              <div className="home-page">
                <div onClick={toRestaurantPage}>
                  <span className="restaurant-name">{restaurant.name}</span>
                  <br />
                  {restaurant.shortDescription}
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}
