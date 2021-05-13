import { gql } from "apollo-boost";

const ADD_RESTAURANT = gql`
  mutation addRestaurant(
    $name: String!
    $shortDescription: String!
    $description: String!
    $isActive: Boolean!
    $menuId: String!
  ) {
    addRestaurant(
      name: $name
      shortDescription: $shortDescription
      description: $description
      menuId: $menuId
      isActive: $isActive
    ) {
      name
      id
    }
  }
`;

export default ADD_RESTAURANT;
