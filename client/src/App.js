import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";
import RestaurantList from "./components/RestaurantList";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <div>
          <RestaurantList />
        </div>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default App;
