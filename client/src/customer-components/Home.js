import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import NavBar from "./NavBar";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import emptySearchImage from "../images/empty-search.svg";
import RestaurantPage from "./RestaurantPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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

export default function Home({ restaurant, setRestaurant, setName }) {
  const [restaurants, setRestaurants] = useState();
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  const { loading, data } = useQuery(GET_RESTAURANTS);
  const [searchRestaurant, { data: searchData, error }] = useLazyQuery(
    GET_RESTAURANT_BY_NAME,
    {
      variables: { name: search },
    },
    {
      errorPolicy: "all",
    },
    {
      onError() {
        console.error("11:39", error);
      },
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
      {console.log("11:55", error)}
      <NavBar
        input={input}
        setInput={setInput}
        searchData={searchData}
        setSearch={setSearch}
        searchRestaurant={searchRestaurant}
      />
      {loading ? <LoadingSpinner /> : null}
      {restaurants && restaurants !== undefined
        ? restaurants.map((restaurant) => {
            function toRestaurantPage() {
              setRestaurant(restaurant);
              setName(restaurant.name);
              <Route
                exact
                path={`/${restaurant.name}`}
                component={RestaurantPage}
              />;
              history.push(`/${restaurant.name}`);
            }
            if (restaurant) {
              return (
                <div className="home-page">
                  <div onClick={toRestaurantPage}>
                    <span className="restaurant-name">{restaurant.name}</span>
                    <br />
                    {restaurant.shortDescription}
                  </div>
                </div>
              );
            } else {
              return (
                <img className="empty-search-image" src={emptySearchImage} />
              );
            }
          })
        : null}
    </div>
  );
}
