import { ApolloProvider } from "@apollo/client";
import createApolloClient from "../../apollo-client";
import ContactListProvider from "./contact-list-provider";
const client = createApolloClient();
const AppProvider = ({ children }: any) => {
  return (
    <ApolloProvider client={client}>
      <ContactListProvider>{children}</ContactListProvider>
    </ApolloProvider>
  );
};

export default AppProvider;
