import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/client";
import ADD_RESTAURANT from "../queries/queries";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import AddRestaurant from "./AddRestaurant";

const getDataQuery = gql`
  {
    restaurants {
      name
      shortDescription
      description
    }
  }
`;

const DELETE_RESTAURANT = gql`
  mutation deleteRestaurant($id: ID!) {
    deleteBook(id: $id) {
      id
      name
    }
  }
`;

function RestaurantList(props) {
  const [restaurants, setRestaurants] = useState();
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
      <AddRestaurant props={props} />
      Restaurant List:{" "}
      {restaurants && restaurants !== undefined
        ? restaurants.map((restaurant) => {
            const deleteRestaurant = (e) => {
              e.stopPropagation();
              deleteRestaurantMutation({
                variables: {
                  id: restaurant.id,
                },
                refetchQueries: [{ query: getDataQuery }],
              });
            };

            return (
              <li onClick={() => console.log("restaurant.id", restaurant._id)}>
                {restaurant.name}
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
