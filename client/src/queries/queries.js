import { gql } from "apollo-boost";

const ADD_RESTAURANT = gql`
  mutation addRestaurant(
    $name: String!
    $shortDescription: String!
    $description: String!
  ) {
    addRestaurant(
      name: $name
      shortDescription: $shortDescription
      description: $description
    ) {
      name
      id
    }
  }
`;

export default ADD_RESTAURANT;
