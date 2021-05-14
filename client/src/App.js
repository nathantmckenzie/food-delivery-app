import "./App.css";
import ApolloClient, { gql } from "apollo-boost";
import { useState } from "react";
import { ApolloProvider, graphql } from "react-apollo";
import { useQuery, useMutation } from "@apollo/client";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";
import RestaurantList from "./admin-components/RestaurantList";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Restaurant from "./admin-components/Restaurant";
import Home from "./customer-components/Home";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  },
});

const getDataQuery = gql`
  {
    restaurants {
      name
      shortDescription
      description
      id
    }
  }
`;

function App() {
  const [name, setName] = useState();
  const [restaurant, setRestaurant] = useState();

  console.log("restauranttt", restaurant);

  return (
    <Router>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <div>
            <Switch>
              <Route path="/home">
                <Home restaurant={restaurant} setRestaurant={setRestaurant} />
              </Route>
              <Route path="/restaurants">
                <RestaurantList
                  setName={setName}
                  setRestaurant={setRestaurant}
                />
              </Route>
              <Route path={`/${name}`}>
                <Restaurant
                  restaurant={restaurant}
                  setRestaurant={setRestaurant}
                />
              </Route>
            </Switch>
          </div>
        </ApolloHooksProvider>
      </ApolloProvider>
    </Router>
  );
}

export default App;
