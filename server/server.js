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
const Restaurant = require("./models/restaurant");
const MenuItem = require("./models/menuItems");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

app.use(cors());

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.PASSWORD}@cluster0.qxpds.mongodb.net/foodDelivery?retryWrites=true&w=majority`
);
mongoose.connection.once("open", () => {
  console.log("!connected to database");
});

const MenuItemType = new GraphQLObjectType({
  name: "MenuItem",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLInt },
    menuId: { type: GraphQLID },
  }),
});

const MenuType = new GraphQLObjectType({
  name: "Menu",
  fields: () => ({
    id: { type: GraphQLID },
    menuItems: {
      type: new GraphQLList(MenuItemType),
      resolve(parent, args) {
        return MenuItemType.find({});
      },
    },
  }),
});

const RestaurantType = new GraphQLObjectType({
  name: "Restaurant",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    shortDescription: { type: GraphQLString },
    description: { type: GraphQLString },
    menuId: {
      type: MenuType,
      resolve(parent, args) {
        return Menu.findById(parent.menuId);
      },
    },
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
    menuItem: {
      type: new GraphQLList(MenuItemType),
      resolve(parent, args) {
        return MenuItem.find({});
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
        menuId: { type: GraphQLID },
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
    addMenuItem: {
      type: MenuItemType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLInt },
        menuId: { type: GraphQLID },
      },
      resolve: (parent, args) => {
        let menuItem = new MenuItem({
          id: Date.now(),
          name: args.name,
          description: args.description,
          price: args.price,
          menuId: args.menuId,
        });
        return menuItem.save();
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
