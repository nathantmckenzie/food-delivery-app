import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/client";
import ADD_RESTAURANT from "../queries/queries";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import AddRestaurant from "./AddRestaurant";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Restaurant from "./Restaurant";

const getDataQuery = gql`
  {
    restaurants {
      name
      shortDescription
      description
      id
    }
  }
`;

const DELETE_RESTAURANT = gql`
  mutation deleteRestaurant($name: String!) {
    deleteRestaurant(name: $name) {
      id
      name
    }
  }
`;

function RestaurantList(props) {
  const [restaurants, setRestaurants] = useState();
  const [id, setId] = useState();

  let history = useHistory();
  const data = props.getDataQuery;
  const [deleteRestaurantMutation, { error }] = useMutation(DELETE_RESTAURANT);

  useEffect(() => {
    setRestaurants(data.restaurants);
  }, [data]);

  useEffect(() => {
    console.log(restaurants);
  }, [restaurants]);

  return (
    <div>
      <AddRestaurant props={props} restaurants={restaurants} />
      Restaurant List:{" "}
      {restaurants && restaurants !== undefined
        ? restaurants.map((restaurant) => {
            const deleteRestaurant = (e) => {
              e.stopPropagation();
              deleteRestaurantMutation({
                variables: {
                  name: restaurant.name,
                },
                refetchQueries: [{ query: getDataQuery }],
              });
            };

            function toRestaurantPage() {
              props.setRestaurant(restaurant);
              history.push(`/${restaurant.name}`);
            }

            return (
              <li onClick={toRestaurantPage}>
                <span onClick={() => props.setName(restaurant.name)}>
                  {restaurant.name}
                </span>
                <br />
                {restaurant.shortDescription}
                <br />
                {restaurant.description}
                <span onClick={deleteRestaurant}>X</span>
              </li>
            );
          })
        : null}
    </div>
  );
}

export default compose(
  graphql(getDataQuery, { name: "getDataQuery" }),
  graphql(ADD_RESTAURANT, { name: "addRestaurantMutation" })
)(RestaurantList);
