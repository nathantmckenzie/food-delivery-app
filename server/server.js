const express = require("express");
const app = express();
const expressGraphQL = require("express-graphql").graphqlHTTP;
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean,
} = require("graphql");
const cors = require("cors");

app.use(cors());

const restaurants = [
  {
    id: 1,
    name: "Chuck E. Cheese",
    shortDescription: "This place is the bee's knees",
    description:
      "This place truly is the bee's knees - best tater tots in the midwest",
    menuID: 1,
    isActive: true,
  },
  {
    id: 2,
    name: "Burger King",
    shortDescription: "We salt our patties",
    description: "You want it, we got it",
    menuID: 2,
    isActive: true,
  },
  {
    id: 3,
    name: "PF Changs",
    shortDescription: "10 days Salmonella Free",
    description: "Read the short description",
    menuID: 3,
    isActive: true,
  },
];

const RestaurantType = new GraphQLObjectType({
  name: "Restaurant",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    shortDescription: { type: GraphQLString },
    description: { type: GraphQLString },
    menuID: { type: GraphQLID },
    isActive: { type: GraphQLBoolean },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    restaurants: {
      type: new GraphQLList(RestaurantType),
      resolve: () => restaurants,
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addRestaurant: {
      type: RestaurantType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        shortDescription: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        const restaurant = {
          id: restaurants.length + 1,
          name: args.name,
          shortDescription: args.shortDescription,
          description: args.description,
        };
        restaurants.push(restaurant);
        return restaurant;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use("/graphql", expressGraphQL({ schema: schema, graphiql: true }));
app.listen(8000, () => console.log("Server Is Running"));
