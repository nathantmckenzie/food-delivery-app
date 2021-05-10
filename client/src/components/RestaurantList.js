import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
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

function RestaurantList(props) {
  const [restaurants, setRestaurants] = useState();
  const data = props.getDataQuery;

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
            return (
              <li>
                {restaurant.name}
                <br />
                {restaurant.shortDescription}
                <br />
                {restaurant.description}
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
