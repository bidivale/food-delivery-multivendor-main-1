import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from "@apollo/client";
import ConfigurableValues from "../config/constants";

const setupApollo = () => {
  const { SERVER_URL } = ConfigurableValues();
  const cache = new InMemoryCache();

  // Use environment variable for the API key
  const SUPABASE_API_KEY = process.env.REACT_APP_SUPABASE_API_KEY;

  // HTTP connection to the API
  const httpLink = createHttpLink({
    uri: SERVER_URL,
    headers: {
      "apikey": SUPABASE_API_KEY,
      "content-type": "application/json",
    },
  });

  // Middleware to include the authorization token
  const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem("token");
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
        apikey: SUPABASE_API_KEY,
      },
    }));
    return forward(operation);
  });

  // Combine links
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    connectToDevTools: true,
  });

  return client;
};

export default setupApollo;
