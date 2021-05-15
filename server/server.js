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
const MenuItemOptions = require("./models/menuItemOptions");
const Menu = require("./models/menu");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

app.use(cors());

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.PASSWORD}@cluster0.qxpds.mongodb.net/foodDelivery?retryWrites=true&w=majority`
);
mongoose.connection.once("open", () => {
  console.log("!connected to database");
});

const MenuItemOptionsType = new GraphQLObjectType({
  name: "MenuItemOptions",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    menuItemId: { type: GraphQLString },
    calories: { type: GraphQLInt },
  }),
});

const MenuItemType = new GraphQLObjectType({
  name: "MenuItem",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLInt },
    menuId: { type: GraphQLID },
    menuItemOptions: {
      type: new GraphQLList(MenuItemOptionsType),
      resolve(parent, args) {
        return MenuItemOptions.find({ menuItemId: "1621011915259" });
      },
    },
  }),
});

const MenuType = new GraphQLObjectType({
  name: "Menu",
  fields: () => ({
    id: { type: GraphQLString },
    menuItems: {
      type: new GraphQLList(MenuItemType),
      resolve(parent, args) {
        return MenuItem.find((menuItem) => menuItem.menuId === parent.id);
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
    menuId: { type: GraphQLID },
    isActive: { type: GraphQLBoolean },
    menuItems: {
      type: new GraphQLList(MenuItemType),
      resolve(parent, args) {
        return MenuItem.find({ menuId: parent.menuId });
      },
    },
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
    restaurant: {
      type: RestaurantType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return Restaurant.findById(args.id);
      },
    },
    restaurantByName: {
      type: RestaurantType,
      args: { name: { type: GraphQLString } },
      resolve(parent, args) {
        return Restaurant.findOne({ name: args.name });
      },
    },
    menuItem: {
      type: new GraphQLList(MenuItemType),
      resolve(parent, args) {
        return MenuItem.find({});
      },
    },
    menuItemOptions: {
      type: new GraphQLList(MenuItemOptionsType),
      resolve(parent, args) {
        return MenuItemOptions.find({});
      },
    },
    menu: {
      type: MenuType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return Menu.findById(args.id);
      },
    },
    menus: {
      type: GraphQLList(MenuType),
      resolve(parent, args) {
        return Menu.find({});
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
        menuId: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        let restaurant = new Restaurant({
          restaurantID: Date.now(),
          name: args.name,
          shortDescription: args.shortDescription,
          description: args.description,
          isActive: true,
          menuId: args.menuId,
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
        menuId: { type: GraphQLString },
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
    addMenuItemOptions: {
      type: MenuItemOptionsType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        price: { type: GraphQLInt },
        menuItemId: { type: GraphQLInt },
        calories: { type: GraphQLInt },
      },
      resolve: (parent, args) => {
        let menuItemOptions = new MenuItemOptions({
          id: Date.now(),
          name: args.name,
          price: args.price,
          menuItemId: args.menuItemId,
          calories: args.calories,
        });
        return menuItemOptions.save();
      },
    },
    deleteMenuItem: {
      type: MenuItemType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => {
        return MenuItem.find({ id: args.id }).deleteOne();
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
