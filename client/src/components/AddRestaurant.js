import React, { useState } from "react";
import { gql } from "apollo-boost";

const getDataQuery = gql`
  {
    restaurants {
      name
      shortDescription
      description
    }
  }
`;

export default function AddRestaurant(props) {
  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");

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
            },
            refetchQueries: [{ query: getDataQuery }],
          });
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
