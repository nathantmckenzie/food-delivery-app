import React, { useState } from "react";
import { gql } from "apollo-boost";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Restaurant from "./Restaurant";

const getDataQuery = gql`
  {
    restaurants {
      name
      shortDescription
      description
      id
      menuId
      isActive
    }
  }
`;

export default function AddRestaurant(props, restaurants) {
  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");

  let randomstring = Math.random().toString(36).slice(-8);

  return (
    <div className="add-restaurant-form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.props.addRestaurantMutation({
            variables: {
              name,
              shortDescription,
              description,
              menuId: randomstring,
              isActive: true,
            },
            refetchQueries: [{ query: getDataQuery }],
          });
          {
            <Route
              exact
              path={`/restaurants/${name}`}
              component={Restaurant}
            />;
          }
        }}
      >
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Restaurant Name"
        />
        <textarea
          id="shortDescription"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          placeholder="Short Description"
        />
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button>Add</button>
      </form>
    </div>
  );
}
