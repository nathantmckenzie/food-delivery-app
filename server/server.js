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
const Restaurant = require("./models/restaurants");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

app.use(cors());

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.PASSWORD}@cluster0.qxpds.mongodb.net/foodDelivery?retryWrites=true&w=majority`
);
mongoose.connection.once("open", () => {
  console.log("!connected to database");
});

const RestaurantType = new GraphQLObjectType({
  name: "Restaurant",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    shortDescription: { type: GraphQLString },
    description: { type: GraphQLString },
    menuID: { type: GraphQLID },
    isActive: { type: GraphQLBoolean },
    restaurantID: { type: GraphQLID },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    restaurants: {
      type: new GraphQLList(RestaurantType),
      resolve(parent, args) {
        return Restaurant.find({});
      },
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
        isActive: { type: GraphQLBoolean },
        restaurantID: { type: GraphQLInt },
      },
      resolve: (parent, args) => {
        let restaurant = new Restaurant({
          restaurantID: Date.now(),
          name: args.name,
          shortDescription: args.shortDescription,
          description: args.description,
          isActive: true,
        });
        return restaurant.save();
      },
    },
    deleteRestaurant: {
      type: RestaurantType,
      args: {
        name: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        return Restaurant.find({ name: args.name }).deleteOne();
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
