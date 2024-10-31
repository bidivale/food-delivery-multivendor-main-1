// this is to debug apollo - created by bidisha
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';
import React, { useEffect } from 'react';

// Create a simple test query - replace with one of your actual queries
const TEST_QUERY = gql`
  query TestQuery {
    __schema {
      types {
        name
      }
    }
  }
`;

// Debug component that wraps your app
const ApolloDebugWrapper = ({ children, uri, headers }) => {
  const client = new ApolloClient({
    uri,
    cache: new InMemoryCache(),
    headers,
    // Add debugging options
    connectToDevTools: true,
    defaultOptions: {
      watchQuery: {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'network-only',
      },
    },
  });

  // Test component to verify connection
  const TestComponent = () => {
    const { loading, error, data } = useQuery(TEST_QUERY);

    useEffect(() => {
      console.log('Apollo Query State:', {
        loading,
        error,
        hasData: !!data,
        data,
      });
    }, [loading, error, data]);

    if (loading) return <div>Testing connection...</div>;
    if (error) return <div>Connection Error: {error.message}</div>;
    if (data) console.log('Successfully connected to GraphQL');

    return null;
  };

  return (
    <ApolloProvider client={client}>
      <TestComponent />
      {children}
    </ApolloProvider>
  );
};

export default ApolloDebugWrapper;